import { connect, disconnect } from "mongoose";

export interface IDbDriver {
    connect: () => Promise<unknown>;
    disconnect: () => Promise<void>;
}

export class MongoDb implements IDbDriver {
    private _uri: string;

    constructor(uri: string | undefined) {
        if (!uri) throw new Error('MongoDB URI is undefined');
        this._uri = uri;
    }

    public connect = async () => connect(this._uri);

    public disconnect = async () => disconnect();
}