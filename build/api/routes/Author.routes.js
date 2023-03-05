"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Author_controller_1 = __importDefault(require("../controller/Author.controller"));
const verifyToken_1 = __importDefault(require("../middleware/verifyToken"));
const AuthorRouter = express_1.default.Router();
AuthorRouter.use(verifyToken_1.default);
AuthorRouter.route('/new')
    .post(Author_controller_1.default.createAuthor);
AuthorRouter.route('/all')
    .get(Author_controller_1.default.readAllAuthor);
AuthorRouter.route('/:authorId')
    .get(Author_controller_1.default.readAuthor)
    .patch(Author_controller_1.default.updateAuthor)
    .delete(Author_controller_1.default.deleteAuthor);
exports.default = AuthorRouter;
