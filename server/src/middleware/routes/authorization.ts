import { Router } from 'express';
import { IUserAuth } from '../../interfaces/dto/user.dto';
import { hashSync } from 'bcrypt';
import { createTransport } from 'nodemailer';
import { UsersModel } from '../../models/user';
import { APIError, ErrorCode } from '../../services/api-error.service';
import { EMAIL, EMAIL_PWD, FRONT_URL } from '../..';
import { generateId } from '../../lib/utils';

const router = Router();

router.post('/', async (req, res, next) => {
    try {
        const {
            name,
            surname,
            phone,
            date,
            email,
            password
        } = req.body as IUserAuth;

        const userExists = await UsersModel.findOne({ email });
        if (userExists) throw new APIError(ErrorCode.BAD_REQUEST, 'User already exists');

        const pwdHash = hashSync(password, 3);
        const token = generateId();
        const activationCode = generateId();
        const url = `${FRONT_URL}/activate-email/${activationCode}`;

        const transport = createTransport({
            host: 'smtp',
            service: 'G mail',
            auth: {
                user: EMAIL,
                pass: EMAIL_PWD
            }
        });

        await transport.sendMail({
            from: 'Authorization Service',
            to: email,
            subject: 'Email Activation Link',
            text: 'To activate the email, follow the link: ' + url,

        });
        transport.close();

        await UsersModel.create({
            token,
            name,
            surname,
            phone,
            date,
            email,
            password: pwdHash,
            activationCode
        });

        res.status(201).send({ response: 'User activation link is sent to your email' });
    } catch (error) {
        next(error);
    }
});

export default router;
