import express from 'express';
import AuthController from '../controller/Auth.controller';

const AuthRouter = express.Router();


AuthRouter.route('/register')
.post(AuthController.register)

AuthRouter.route('/login')
.post(AuthController.login)

export default AuthRouter;
