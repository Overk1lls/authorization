export enum ErrorCode {
    SERVER = 'Something went wrong...',
    BAD_REQUEST = 'Invalid request',
    NOT_FOUND = 'NOT_FOUND',
    UNAUTHORIZED = 'UNAUTHORIZED',
    FORBIDDEN = 'FORBIDDEN'
}

export class APIError extends Error {
    code: ErrorCode;

    constructor(code: ErrorCode, message?: string) {
        super(message ? message : code);
        this.code = code;
    }
}