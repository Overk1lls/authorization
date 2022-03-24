import { model, Schema } from 'mongoose';
import { IUserToken } from '../interfaces/token';

const schema = new Schema<IUserToken>({
    userEmail: { type: String, required: true, unique: true },
    jwt: { type: String, required: true, unique: true }
});

export const Tokens = model('token', schema);
