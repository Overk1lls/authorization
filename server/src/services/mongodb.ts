import { connect, disconnect } from 'mongoose';
import { APIError, ErrorCode } from './api-error.service';

export interface IDbDriver {
    connect: () => Promise<unknown>;
    disconnect: () => Promise<void>;
}

export class MongoDb implements IDbDriver {
    private _uri: string;

    constructor(uri: string | undefined) {
        if (!uri) throw new APIError(ErrorCode.SERVER, 'Mongo URI is undefined');
        this._uri = uri;
    }

    public connect = async () => connect(this._uri);

    public disconnect = async () => disconnect();
}
