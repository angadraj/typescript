import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import Author from '../models/Author';
import logger from '../lib/logger';

const createAuthor = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let name = req.body.name;
        let author = new Author({
            _id: new mongoose.Types.ObjectId(), 
            name
        });
        await author.save();

        return res.status(201).json({
            message: "Author added",
            data: {}
        })

    } catch (e) {
        logger.error(e);
        return res.status(403).json({
            error: e
        })
    }

};
const readAuthor = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let author_id = req.params.authorId;
        let author = await Author.findById(author_id);
        if (!author) {
            return res.status(404).json({ message: "Author not found!" })
        }
        return res.status(200).json({
            message: "Author found!",
            data: { author }
        })

    } catch (e) {
        logger.error(e);
        return res.status(403).json({
            error: e
        })
    }
};
const readAllAuthor = async (req: Request, res: Response, next: NextFunction) => {
    try {
        logger.info(`User Id ${req.userId}`);
        let all_authors = await Author.find();
        return res.status(200).json({
            message: "All authors found!",
            data: { all_authors }
        })
    } catch (e) {
        logger.error(e);
        return res.status(403).json({
            error: e
        })
    }
};

const updateAuthor = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let author_id = req.params.authorId;
        let new_name = req.body.name;
        let upated_res = await Author.updateOne(
            { _id: author_id },
            { $set: { name: new_name } }
        )
        if (upated_res.matchedCount == 0) {
            return res.status(404).json({
                message: "Author not found!"
            })
        }
        return res.status(200).json({ message: "Author updated!" });

    } catch (e) {
        logger.error(e);
        return res.status(403).json({
            error: e
        })
    }
};

const deleteAuthor = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let author_id = req.params.id;
        let deleted_res = await Author.findByIdAndDelete(author_id);
        console.log(deleted_res);
        return res.status(200).json({
            message: "Author Deleted!"
        })

    } catch (e) {
        logger.error(e);
        return res.status(403).json({
            error: e
        })
    }
};

export default {
    createAuthor,
    readAuthor,
    readAllAuthor,
    updateAuthor,
    deleteAuthor
}