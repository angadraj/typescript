import express, { Request, Response } from 'express';
import router from './api/routes';
import dotenv from 'dotenv';
import connectDB from './api/models';
import logger from './api/lib/logger';

dotenv.config()

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const PORT = process.env.PORT;
logger.info(`Active Port is ${PORT}`);

app.use('/api/v1', router);

app.listen(PORT, async () => {
    logger.info(`App listening at ${PORT}`)
    await connectDB();
})