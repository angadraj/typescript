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
const logger_1 = __importDefault(require("../lib/logger"));
const User_1 = __importDefault(require("../models/User"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const register = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let email = req.body.email;
            let password = req.body.password;
            let existing_user = yield User_1.default.findOne({ email });
            if (existing_user) {
                return res.status(400).json({ message: "User already registered. Login to continue" });
            }
            let hash = yield bcrypt_1.default.hash(password, 10);
            let new_user = yield User_1.default.create({
                email,
                password: hash
            });
            let token = jsonwebtoken_1.default.sign({
                userId: new_user.id
            }, process.env.JWT_TOKEN);
            return res.status(201).json({
                message: "User registered",
                token
            });
        }
        catch (e) {
            logger_1.default.error(e);
            return res.status(403).json({
                error: e
            });
        }
    });
};
const login = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let email = req.body.email;
            let password = req.body.password;
            let existing_user = yield User_1.default.findOne({ email });
            if (!existing_user) {
                return res.status(400).json({
                    message: "Please register!"
                });
            }
            let password_match = yield bcrypt_1.default.compare(password, existing_user.password);
            if (!password_match) {
                return res.status(400).json({ message: "Incorrect Password" });
            }
            let token = jsonwebtoken_1.default.sign({
                userId: existing_user.id
            }, process.env.JWT_TOKEN);
            return res.status(200).json({
                message: "Logged in!",
                token,
                email: existing_user.email
            });
        }
        catch (e) {
            logger_1.default.error(e);
            return res.status(403).json({ error: e });
        }
    });
};
exports.default = {
    register,
    login
};
