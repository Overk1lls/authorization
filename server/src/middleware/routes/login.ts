import { compareSync } from 'bcrypt';
import { Router } from 'express';
import { Users } from '../../models/user';
import { APIError, ErrorCode } from '../../errors/api.error';
import { IUserAuth } from '../../interfaces/dto/user.dto';
import { EMAIL, EMAIL_PWD, LOCAL_URL } from '../..';
import { createTransport } from 'nodemailer';
import { generateId } from '../../lib/utils';
import { errors, JWT_SECRET } from '../../lib/config';
import { sign } from 'jsonwebtoken';
import { Tokens } from '../../models/token';
import { jwtHandler, PAYLOAD } from '../handlers/jwt.handler';

const router = Router();

router.post('/', async (req, res, next) => {
    try {
        const { email, password } = req.body as IUserAuth;

        const user = await Users.findOne({ email });
        if (!user) throw new APIError(ErrorCode.NOT_FOUND, errors.NO_USER);

        const isPwdReal = compareSync(password, user.password);
        if (!isPwdReal) {
            throw new APIError(
                ErrorCode.BAD_REQUEST,
                'Either email or password is wrong'
            );
        }

        const jwt = sign({ email }, JWT_SECRET);
        await Tokens.create({ userEmail: email, jwt });

        res.json(
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

        const user = await Users.findOne({ email });
        if (!user) throw new APIError(ErrorCode.NOT_FOUND, errors.NO_USER);

        if (user.resetCode) {
            throw new APIError(
                ErrorCode.BAD_REQUEST,
                'The activation link is already sent to your email'
            );
        }
        user.resetPassword = true;

        const token = generateId();
        const resetUrl = `${LOCAL_URL}/reset-password/${token}`;

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