import { IUserModel } from '../interfaces/user';
import { Schema, model } from 'mongoose';

const schema = new Schema<IUserModel>({
    token: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    surname: { type: String, required: true },
    phone: { type: String, required: true },
    date: { type: Date, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    resetCode: { type: String, unique: true },
    activationCode: { type: String, unique: true },
    resetPassword: { type: Boolean }
});

export const Users = model('user', schema);
