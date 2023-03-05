import { Request, Response, NextFunction } from 'express';
import logger from '../lib/logger';
import User from '../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const register = async function (req: Request, res: Response, next: NextFunction) {
    try {
        let email = req.body.email;
        let password = req.body.password;

        let existing_user = await User.findOne({ email })
        if (existing_user) {
            return res.status(400).json({ message: "User already registered. Login to continue" })
        }

        let hash = await bcrypt.hash(password, 10);

        let new_user = await User.create({
            email,
            password: hash
        })

        let token = jwt.sign({
            userId: new_user.id
        }, process.env.JWT_TOKEN as string);

        return res.status(201).json({
            message: "User registered",
            token
        })

    } catch (e) {
        logger.error(e);
        return res.status(403).json({
            error: e
        })
    }
}

const login = async function (req: Request, res: Response, next: NextFunction) {
    try {
        let email = req.body.email;
        let password = req.body.password;

        let existing_user = await User.findOne({ email });

        if (!existing_user) {
            return res.status(400).json({
                message: "Please register!"
            })
        }

        let password_match = await bcrypt.compare(password, existing_user.password);
        if (!password_match) {
            return res.status(400).json({ message: "Incorrect Password" })
        }

        let token = jwt.sign({
            userId: existing_user.id
        }, process.env.JWT_TOKEN as string);

        return res.status(200).json({
            message: "Logged in!",
            token,
            email: existing_user.email
        })

    } catch (e) {
        logger.error(e);
        return res.status(403).json({ error: e })
    }
}

export default {
    register,
    login
}