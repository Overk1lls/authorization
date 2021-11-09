const { Router } = require('express');
const router = Router();
const utils = require('../utils/utils');
const crypto = require('crypto-js');
const User = require('../models/user');
const nodemailer = require('nodemailer');

require('dotenv').config();

router.post('/', async (req, res) => {
    try {
        let { email, password } = req.body;
        let encryptPassword = crypto.HmacSHA256(password, process.env.SECRET_KEY).toString();

        let findUser = await User.findOne({ email: email, password: encryptPassword });
        if (findUser) res.json({ token: findUser.token });
        else res.status(400).json({ error: 'wrong data' });
    } catch (e) {
        res.status(400).json({ error: e.message });
        console.log(e.message);
    }
});

router.post('/resetPassword', async (req, res) => {
    try {
        let { email } = req.body;
        let user = await User.findOne({ email });

        if (user && !user.resetCode) {
            user.resetPassword = true;
            let token = utils.generateId();
            let url = 'http://localhost:3000/resetPassword/' + token;

            let transport = await nodemailer.createTransport({
                host: 'smtp',
                service: 'Gmail',
                auth: {
                    user: 'yury.overkill.test@gmail.com',
                    pass: process.env.PASSWORD
                }
            });

            await transport.sendMail({
                from: user.name + ' ' + user.surname + '<' + user.email + '>',
                to: user.email,
                subject: 'Reset Password Code',
                text: 'To reset the password, please, follow the link: ' + url
            });

            user.resetCode = token;
            await user.save();

            transport.close();
            res.json({ response: 'Reset code has been sent', token });
        } else if (user.resetCode) {
            res.status(400).json({ response: 'Reset code has already been sent' });
        } else {
            res.status(404).json({ error: 'no user found' });
        }
    } catch (e) {
        res.status(400).json({ error: e.message });
        console.log(e.message);
    }
});

module.exports = router;