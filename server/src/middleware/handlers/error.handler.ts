import { ErrorRequestHandler } from 'express';
import { APIError, ErrorCode } from '../../errors/api.error';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    if (err instanceof APIError) {
        const errMessage = { error: err.message ? err.message : err.code };

        switch (err.code) {
            case ErrorCode.SERVER: {
                res.status(500).json(errMessage);
                break;
            }

            case ErrorCode.NOT_FOUND: {
                res.status(404).json(errMessage);
                break;
            }

            case ErrorCode.FORBIDDEN: {
                res.status(403);
                break;
            }

            case ErrorCode.UNAUTHORIZED: {
                res.status(401);
                break;
            }

            default: {
                res.status(400);
                break;
            }
        }
    } else if (err instanceof TypeError) {
        res.status(400).json({ error: ErrorCode.BAD_REQUEST });
    } else res.status(500).json({ error: ErrorCode.SERVER });

    if (Math.floor(res.statusCode / 100) === 5) console.error(err);
};
