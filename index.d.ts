import { express } from "express-serve-static-core";
import JwtPayload from 'jsonwebtoken';

interface TokenData {
    userId: string,
    iat: string
}

interface Context {
    tokenData: TokenData
}

interface JwtPayload {
    userId: string
}

declare module "express-serve-static-core" {
    interface Request {
        context: Context,
        userId: string
    }
}