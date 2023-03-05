import express, { Request, Response } from 'express';
import Controller from '../controller/Author.controller';
import verifyToken from '../middleware/verifyToken';

const AuthorRouter = express.Router();

AuthorRouter.use(verifyToken);

AuthorRouter.route('/new')
.post(Controller.createAuthor)

AuthorRouter.route('/all')
.get(Controller.readAllAuthor)

AuthorRouter.route('/:authorId')
.get(Controller.readAuthor)
.patch(Controller.updateAuthor)
.delete(Controller.deleteAuthor)



export default AuthorRouter;