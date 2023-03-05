import express, { Request, Response } from 'express';
import router from './api/routes';
import dotenv from 'dotenv';
import connectDB from './api/models';
import logger from './api/lib/logger';

dotenv.config()

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))



app.use('/api/v1', router);

app.listen(3001, async () => {
    // Logging.info(`App listening at ${process.env.PORT}`)
    logger.info(`App listening at ${process.env.PORT}`)
    await connectDB();
})