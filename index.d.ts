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

namespace NodeJS {
    interface ProcessEnv {
        MONOGODB_URL: string;
        NODE_ENV: string;
        PORT: string;
        JWT_TOKEN: string
    }
  }

declare module "express-serve-static-core" {
    interface Request {
        context: Context,
        userId: string
    }
}