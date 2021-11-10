const { Router } = require('express');
const router = Router();
const crypto = require('crypto-js');
const User = require('../models/user');
const { generateId } = require('../utils/utils');
const nodemailer = require('nodemailer');

require('dotenv').config();

router.post('/', async (req, res) => {
    try {
        let { name, surname, phone, date, email, password } = req.body;
        let encryptPassword = crypto.HmacSHA256(password, process.env.SECRET_KEY).toString();
        let token = generateId();

        let activationCode = generateId();
        let url = 'http://localhost:3000/activateEmail/' + activationCode;

        let transport = await nodemailer.createTransport({
            host: 'smtp',
            service: 'Gmail',
            auth: {
                user: 'yury.overkill.test@gmail.com',
                pass: process.env.PASSWORD
            }
        });

        await transport.sendMail({
            from: 'Authorization Service',
            to: email,
            subject: 'Email Activation Link',
            text: 'To activate the email, please, follow the link: ' + url,
            
        });

        transport.close();

        let newUser = new User({
            token,
            name,
            surname,
            phone,
            date,
            email,
            password: encryptPassword,
            activationCode
        });
        await newUser.save();

        res.status(201).send({ response: 'Email activation link has been sent to the email' });
    } catch (e) {
        res.status(400).send({ error: e.message });
        console.error(e);
    }
});

router.post('/activateEmail', async (req, res) => {
    let { code } = req.body;
    
    let user = await User.findOne({ activationCode: code });
    if (user) {
        user.activationCode = '';
        await user.save();

        res.json({ response: 'Email has been activated. Thank you!' });
    } else res.status(400).json({ error: 'There is no need of email activation or no user found' });
});

module.exports = router;