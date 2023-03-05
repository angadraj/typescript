"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Auth_controller_1 = __importDefault(require("../controller/Auth.controller"));
const AuthRouter = express_1.default.Router();
AuthRouter.route('/register')
    .post(Auth_controller_1.default.register);
AuthRouter.route('/login')
    .post(Auth_controller_1.default.login);
exports.default = AuthRouter;
