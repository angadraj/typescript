import express, { Request, Response } from 'express'
import AuthorRouter from './Author.routes';
import AuthRouter from './Auth.routes';
import logger from '../lib/logger';

const router = express.Router();

router.use('/auth', AuthRouter);
router.use('/author', AuthorRouter)

router.get('/health', (req: Request, res: Response) => {
    return res.status(200).json({
        message: "All good!"
    })
})

export default router;