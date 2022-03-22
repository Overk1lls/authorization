import express from 'express';
import cors from 'cors';
import { router as authRoute } from './routes/authorization';
import { router as loginRoute } from './routes/login';
import { router as resetPwdRoute } from './routes/reset-password';

export const createApp = () => {
    const app = express();

    app.use(cors());
    app.use(express.json());
    app.use((req, res, next) => {
        const curDate = new Date();
        console.log(`${curDate.getHours()}:${curDate.getMinutes()}:` +
            `${curDate.getSeconds()} ${req.method} ${req.path}`
        );
        next();
    });
    app.use('/api/auth', authRoute);
    app.use('/api/login', loginRoute);
    app.use('/api/reset-password', resetPwdRoute);

    return app;
};
