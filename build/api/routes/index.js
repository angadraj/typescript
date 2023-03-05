"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Author_routes_1 = __importDefault(require("./Author.routes"));
const Auth_routes_1 = __importDefault(require("./Auth.routes"));
const router = express_1.default.Router();
router.use('/auth', Auth_routes_1.default);
router.use('/author', Author_routes_1.default);
router.get('/health', (req, res) => {
    return res.status(200).json({
        message: "All good!"
    });
});
exports.default = router;
