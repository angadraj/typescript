import mongoose from "mongoose";
import dotenv from 'dotenv';
import logger from "../lib/logger";
dotenv.config();

async function connectDB() {
    return mongoose.connect(process.env.MONOGODB_URL as string)
        .then(() => {
            // logger.info("DB Connected");
            logger.info("Db connected");
        }).catch ((e) => {
            // logger.error(e)
            logger.error(e);
        })
}

export default connectDB;