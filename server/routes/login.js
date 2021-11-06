const { Router } = require('express');
const router = Router();
const utils = require('../utils/utils');
const crypto = require('crypto-js');
const User = require('../models/user');

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
        console.error(e);
    }
});

module.exports = router;