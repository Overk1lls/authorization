import express from 'express';
import cors from 'cors';
import authRoute from './routes/authorization';
import loginRoute from './routes/login';
import resetPwdRoute from './routes/reset-password';
import activateEmailRoute from './routes/activate-email';
import { errorHandler } from './handlers/error.handler';

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
    app.use('/api/activate-email', activateEmailRoute);
    app.use(errorHandler);

    return app;
};
