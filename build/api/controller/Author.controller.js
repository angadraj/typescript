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
const mongoose_1 = __importDefault(require("mongoose"));
const Author_1 = __importDefault(require("../models/Author"));
const logger_1 = __importDefault(require("../lib/logger"));
const createAuthor = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let name = req.body.name;
        let author = new Author_1.default({
            _id: new mongoose_1.default.Types.ObjectId(),
            name
        });
        yield author.save();
        return res.status(201).json({
            message: "Author added",
            data: {}
        });
    }
    catch (e) {
        logger_1.default.error(e);
        return res.status(403).json({
            error: e
        });
    }
});
const readAuthor = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let author_id = req.params.authorId;
        let author = yield Author_1.default.findById(author_id);
        if (!author) {
            return res.status(404).json({ message: "Author not found!" });
        }
        return res.status(200).json({
            message: "Author found!",
            data: { author }
        });
    }
    catch (e) {
        logger_1.default.error(e);
        return res.status(403).json({
            error: e
        });
    }
});
const readAllAuthor = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        logger_1.default.info(`User Id ${req.userId}`);
        let all_authors = yield Author_1.default.find();
        return res.status(200).json({
            message: "All authors found!",
            data: { all_authors }
        });
    }
    catch (e) {
        logger_1.default.error(e);
        return res.status(403).json({
            error: e
        });
    }
});
const updateAuthor = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let author_id = req.params.authorId;
        let new_name = req.body.name;
        let upated_res = yield Author_1.default.updateOne({ _id: author_id }, { $set: { name: new_name } });
        if (upated_res.matchedCount == 0) {
            return res.status(404).json({
                message: "Author not found!"
            });
        }
        return res.status(200).json({ message: "Author updated!" });
    }
    catch (e) {
        logger_1.default.error(e);
        return res.status(403).json({
            error: e
        });
    }
});
const deleteAuthor = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let author_id = req.params.id;
        let deleted_res = yield Author_1.default.findByIdAndDelete(author_id);
        console.log(deleted_res);
        return res.status(200).json({
            message: "Author Deleted!"
        });
    }
    catch (e) {
        logger_1.default.error(e);
        return res.status(403).json({
            error: e
        });
    }
});
exports.default = {
    createAuthor,
    readAuthor,
    readAllAuthor,
    updateAuthor,
    deleteAuthor
};
