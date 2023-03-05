import dotenv from 'dotenv'
import logger from '../lib/logger';
import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

dotenv.config();

const verifyToken = async function (req: Request, res: Response, next: NextFunction) {
    try {
        if (!req['headers']['authorization']) {
            return res.status(400).json({
                message: "Auth Headers missing!"
            })
        }

        let token = req.headers['authorization'].split(' ')[1] || req.headers['authorization'];
        if (!token) {
            return res.status(403).json({
                message: "Token not provided"
            })
        }

        // jwt.verify(token, process.env.JWT_TOKEN as string, (err, decoded) => {
        //     if (err) {
        //         return res.status(401).json({
        //             message: "unauthorized"
        //         })
        //     }

        //     // let userId: string = decoded?.userId;
        //     // req.body.UserInfo = decoded;
        //     // console.log("decoded line 33", userId);
        //     // req.context = { ...req.context, tokenData: decoded };
        //     req.userId = decoded?.userId;
        //     next();
        // })

        let { userId } = await jwt.verify(token, process.env.JWT_TOKEN as string) as JwtPayload;
        req.userId = userId;
        next();


    } catch (e) {   
        logger.error(e);
        return res.status(403).json({
            message: "Some error occured in verfiy token"
        })
    }
}

export default verifyToken;