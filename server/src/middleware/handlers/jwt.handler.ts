import { RequestHandler } from 'express';
import { APIError, ErrorCode } from '../../errors/api.error';
import { verify } from 'jsonwebtoken';
import { JWT_SECRET } from '../../lib/config';

export const PAYLOAD = 'payload';

export const jwtHandler: RequestHandler = (req, res, next) => {
    const { authorization } = req.headers;

    try {
        if (!authorization) throw new APIError(ErrorCode.UNAUTHORIZED);

        const jwt = authorization.split(' ')[1];

        verify(jwt, JWT_SECRET, (err, payload) => {
            if (err) throw new APIError(ErrorCode.FORBIDDEN);

            res.locals[PAYLOAD] = payload;
            next();
        });
    } catch (error) {
        next(error);
    }
};
