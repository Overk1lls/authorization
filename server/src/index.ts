import { config } from 'dotenv';
import { createApp } from './middleware/app';
import { MongoDb } from './services/mongodb';

config();

export const {
    LOCAL_URL,
    EMAIL,
    EMAIL_PWD,
    PORT,
    MONGO_URI
} = process.env;

const app = createApp();

const start = async () => {
    const mongodb = new MongoDb(MONGO_URI);
    await mongodb.connect();

    app.listen(PORT, () => console.log(`App is running on port ${PORT}`));
};

start().catch((err: Error) => {
    console.error(err);
    process.exit(1);
});
