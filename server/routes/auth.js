const { Router } = require('express');
const router = Router();
const utils = require('../utils/utils');
const crypto = require('crypto-js');
const User = require('../models/user');

require('dotenv').config();

router.post('/', async (req, res) => {
    try {
        let { name, surname, phone, date, email, password } = req.body;
        let encryptPassword = crypto.HmacSHA256(password, process.env.SECRET_KEY).toString();
        let token = utils.generateId();
        
        let newUser = new User({
            token,
            name,
            surname,
            phone,
            date,
            email,
            password: encryptPassword
        });
        await newUser.save();

        res.status(201).send({ token: token });
    } catch (e) {
        res.status(400).send({ error: e.message });
        console.error(e.message);
    }
});

module.exports = router;