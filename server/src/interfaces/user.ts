export interface IUserModel {
    token: string;
    name: string;
    surname: string;
    phone: string;
    date: Date;
    email: string;
    password: string;
    resetCode?: string;
    activationCode?: string;
    resetPassword?: boolean;
}