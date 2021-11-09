const { Router } = require('express');
const router = Router();
const User = require('../models/user');
const crypto = require('crypto-js');

require('dotenv').config();

router.post('/', async (req, res) => {
    try {
        let { resetCode, password } = req.body;

        let findUser = await User.findOne({ resetCode: resetCode });
        if (findUser) {
            let newPassword = crypto.HmacSHA256(password, process.env.SECRET_KEY).toString();
            if (findUser.password === newPassword) {
                res.status(400).json({ error: 'password is the same' });
            } else {
                findUser.password = newPassword;
                findUser.resetCode = undefined;
                await findUser.save();

                res.json({ response: 'Password Updated' });
            }
        } else res.status(400).json({ error: 'token is invalid' });
    } catch (e) {
        console.log(e.message);
        res.status(400).json({ error: e.message });
    }
});

module.exports = router;