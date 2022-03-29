import { compareSync } from 'bcrypt';
import { Router } from 'express';
import { UsersModel } from '../../models/user';
import { APIError, ErrorCode } from '../../services/api-error.service';
import { IUserAuth } from '../../interfaces/dto/user.dto';
import { EMAIL, EMAIL_PWD, FRONT_URL, JWT_SECRET } from '../..';
import { createTransport } from 'nodemailer';
import { generateId } from '../../lib/utils';
import { sign } from 'jsonwebtoken';
import { TokensModel } from '../../models/token';

const router = Router();

router.post('/', async (req, res, next) => {
    try {
        const { email, password } = req.body as IUserAuth;

        const user = await UsersModel.findOne({ email });
        if (!user) throw new APIError(ErrorCode.USER_IS_NOT_FOUND);

        const isPwdReal = compareSync(password, user.password);
        if (!isPwdReal)
            throw new APIError(ErrorCode.BAD_REQUEST, 'Either email or password is wrong');

        const jwt = sign({ email }, JWT_SECRET);
        await TokensModel.findOneAndUpdate({ userEmail: email }, { jwt }, { upsert: true });

        res.status(200).json(
            user.activationCode ?
                { response: 'You need to activate your account in order to log in' } :
                { token: jwt }
        );
    } catch (error) {
        next(error);
    }
});

router.post('/reset-password', async (req, res, next) => {
    try {
        const { email } = req.body as IUserAuth;

        const user = await UsersModel.findOne({ email });
        if (!user) throw new APIError(ErrorCode.USER_IS_NOT_FOUND);
        else if (user.resetCode) {
            throw new APIError(
                ErrorCode.BAD_REQUEST,
                'The activation link is already sent to your email'
            );
        }
        user.resetPassword = true;

        const token = generateId();
        const resetUrl = `${FRONT_URL}/reset-password/${token}`;

        const transport = createTransport({
            host: 'smtp',
            service: 'gmail',
            auth: {
                user: EMAIL,
                pass: EMAIL_PWD
            }
        });

        await transport.sendMail({
            from: `${user.name} ${user.surname} <${user.email}>`,
            to: user.email,
            subject: 'Reset Password Code',
            text: `To reset the password, follow the link: ${resetUrl}`
        });
        transport.close();

        user.resetCode = token;
        await user.save();

        res.status(200).json({ response: 'The reset code is sent', token });
    } catch (error) {
        next(error);
    }
});

export default router;
