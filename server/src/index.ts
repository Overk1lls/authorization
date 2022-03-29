import { config } from 'dotenv';
import { getNodeEnv } from './lib/utils';
import { createApp } from './middleware/app';
import { MongoDb } from './services/mongodb';

config();

export const {
    EMAIL,
    EMAIL_PWD,
    PORT,
    MONGO_URI
} = process.env;

export const JWT_SECRET = process.env.JWT_SECRET || '123abc';
export const FRONT_URL = getNodeEnv() === 'development' ?
    process.env.LOCAL_URL :
    process.env.HOST_URL;

const app = createApp();

const start = async () => {
    const mongodb = new MongoDb(MONGO_URI);
    await mongodb.connect();

    app.listen(PORT || 4000, () => console.log(`App is running on port ${PORT}`));
};

start().catch((err: Error) => {
    console.error(err);
    process.exit(1);
});
