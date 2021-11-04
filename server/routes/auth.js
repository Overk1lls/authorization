const { Router } = require('express');
const router = Router();
const utils = require('../utils/utils');
const crypto = require('crypto-js');
const User = require('../models/user');

require('dotenv').config();

router.post('/', async (req, res) => {
    try {
        // let { email, password } = req.body;
        // let encryptPassword = crypto.HmacSHA256(password, process.env.SECRET_KEY).toString();

        // if (token) {
        //     let user = await User.findOne({ token: token });

        //     if (!user) {
        //         res.status(404).json({ error: 'User not found by that token' });
        //     }


        // } else {
        //     console.log('no token');
        //     let newToken = utils.generateId();

        //     let newUser = new User({
        //         token: newToken,
        //         email: email,
        //         password: encryptPassword
        //     });
        //     await newUser.save();

        //     res.status(201).send({ token: newToken });
        // }
        // res.status(404);
        // let { password } = req.body;
        // let encryptPassword = crypto.HmacSHA256(password, process.env.SECRET_KEY).toString();
        let token = utils.generateId();

        // let newUser = new User({
        //     token: token,
        //     email: email,
        //     password: encryptPassword
        // });
        // await newUser.save();

        res.status(201).send({ token: token });
    } catch (e) {
        res.status(400).send({ error: e.message });
        console.error(e);
    }


    // res.send({ token: utils.generateId() });
});

module.exports = router;