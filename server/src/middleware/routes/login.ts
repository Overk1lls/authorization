import { hashSync } from 'bcrypt';
import { Router } from 'express';
import { Users } from '../../models/user';
import { ErrorCode } from '../../errors/api-error';
import { IUserAuth } from '../../interfaces/dto/user.dto';
import { EMAIL, EMAIL_PWD, LOCAL_URL } from '../..';
import { createTransport } from 'nodemailer';
import { generateId } from '../../lib/utils';

export const router = Router();

router.post('/', async (req, res) => {
    try {
        const { email, password } = req.body as IUserAuth;

        const pwdHash = hashSync(password, 3);

        const user = await Users.findOne({ email, password: pwdHash });
        if (!user) return res.status(400).json({ error: ErrorCode.BAD_REQUEST });

        res.json(
            user.activationCode ?
                { response: 'Activation link is already sent to your email' } :
                { token: user.token }
        );
    } catch (err) {
        res.status(500).json({ error: ErrorCode.SERVER });
        console.error(err);
    }
});

router.post('/reset-password', async (req, res) => {
    try {
        const { email } = req.body as IUserAuth;

        const user = await Users.findOne({ email });
        if (!user) return res.status(400).json({ error: ErrorCode.NO_USER });
        else {
            if (user.resetCode) {
                return res.status(400).json({
                    error: 'The email reset code is already sent'
                });
            }
            user.resetPassword = true;
        }

        if (user && !user.resetCode) {
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
        }
    } catch (err) {
        res.status(500).json({ error: ErrorCode.SERVER });
        console.error(err);
    }
});
