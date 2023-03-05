"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const logger_1 = __importDefault(require("../lib/logger"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
const verifyToken = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!req['headers']['authorization']) {
                return res.status(400).json({
                    message: "Auth Headers missing!"
                });
            }
            let token = req.headers['authorization'].split(' ')[1] || req.headers['authorization'];
            if (!token) {
                return res.status(403).json({
                    message: "Token not provided"
                });
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
            let { userId } = yield jsonwebtoken_1.default.verify(token, process.env.JWT_TOKEN);
            req.userId = userId;
            next();
        }
        catch (e) {
            logger_1.default.error(e);
            return res.status(403).json({
                message: "Some error occured in verfiy token"
            });
        }
    });
};
exports.default = verifyToken;
