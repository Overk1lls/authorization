import { ErrorRequestHandler } from 'express';
import { APIError, ErrorCode } from '../../services/api-error.service';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    const errMessage = { error: err.message ? err.message : err.code };

    const response = (code: number) => res.status(code).json(errMessage);

    if (err instanceof APIError) {

        switch (err.code) {
            case ErrorCode.SERVER: {
                response(500);
                break;
            }

            case ErrorCode.NOT_FOUND: {
                response(404);
                break;
            }

            case ErrorCode.FORBIDDEN: {
                response(403);
                break;
            }

            case ErrorCode.UNAUTHORIZED: {
                response(401);
                break;
            }

            default: {
                response(400);
                break;
            }
        }
    } else if (err instanceof TypeError) {
        res.status(400).json({ error: ErrorCode.BAD_REQUEST });
    } else response(500);

    if (Math.floor(res.statusCode / 100) === 5) console.error(err);
};
