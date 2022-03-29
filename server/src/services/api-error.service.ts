export enum ErrorCode {
    SERVER = 'Something went wrong...',
    BAD_REQUEST = 'INVALID_REQUEST',
    NOT_FOUND = 'NOT_FOUND',
    UNAUTHORIZED = 'UNAUTHORIZED',
    FORBIDDEN = 'FORBIDDEN',
    USER_IS_NOT_FOUND = 'USER_IS_NOT_FOUND'
}

export interface IError {
    code: ErrorCode;
}

export class APIError extends Error implements IError {
    readonly code: ErrorCode;

    constructor(code: ErrorCode, message?: string) {
        super(message ? message : code);
        this.code = code;
    }
}
