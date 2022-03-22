import { Router } from 'express';
import { IUserAuth } from '../../interfaces/dto/user.dto';
import { hashSync } from 'bcrypt';
import { createTransport } from 'nodemailer';
import { Users } from '../../models/user';
import { ErrorCode } from '../../errors/api-error';
import { EMAIL, EMAIL_PWD, LOCAL_URL } from '../..';
import { generateId } from '../../lib/utils';

export const router = Router();

router.post('/', async (req, res) => {
    try {
        const {
            name,
            surname,
            phone,
            date,
            email,
            password
        } = req.body as IUserAuth;

        if (!password) throw new Error(ErrorCode.BAD_REQUEST);

        const userExists = await Users.findOne({ email });
        if (userExists) return res.status(400).json({ error: 'User already exists' });

        const pwdHash = hashSync(password, 3);

        const token = generateId();
        const activationCode = generateId();
        const url = `${LOCAL_URL}/activate-email/${activationCode}`;

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

        await Users.create({
            token,
            name,
            surname,
            phone,
            date,
            email,
            password: pwdHash,
            activationCode
        });

        res.status(201).send({
            response: 'User activation link is sent on your email'
        });
    } catch (err) {
        res.status(500).send({ error: ErrorCode.SERVER });
        console.error(err);
    }
});

router.post('/activate-email', async (req, res) => {
    const { code }: { code: string } = req.body;

    const user = await Users.findOneAndUpdate(
        { activationCode: code },
        { activationCode: '' },
        { new: true }
    );
    if (!user) return res.status(400).json({ error: ErrorCode.NO_USER });
    else if (!user.activationCode)
        return res.status(400).json({ error: 'The email is already activated' });

    res.status(200).json({ response: 'The email is activated' });
});