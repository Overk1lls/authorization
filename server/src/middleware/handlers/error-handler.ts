import { ErrorRequestHandler } from "express";
import { APIError, ErrorCode } from "../../errors/api-error";

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    if (err instanceof APIError) {
        const errMessage = { error: err.message ? err.message : err.code };

        switch (err.code) {
            case ErrorCode.SERVER: {
                res.status(500).json({ error: ErrorCode.SERVER });
                break;
            }

            case ErrorCode.NOT_FOUND: {
                res.status(404).json(errMessage);
                break;
            }

            default: {
                res.status(400).json(errMessage);
                break;
            }
        }
    } else if (err instanceof TypeError) {
        res.status(400).json({ error: ErrorCode.BAD_REQUEST });
    } else res.status(500).json({ error: ErrorCode.SERVER });

    if (Math.floor(res.statusCode / 100) === 5) console.error(err);
};