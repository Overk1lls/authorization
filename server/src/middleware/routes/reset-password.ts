import { compareSync, hashSync } from 'bcrypt';
import { Router } from 'express';
import { ErrorCode } from '../../errors/api-error';
import { IUserModel } from '../../interfaces/user';
import { Users } from '../../models/user';

const router = Router();

router.post('/', async (req, res) => {
    try {
        const { resetCode, password } = req.body as IUserModel;

        const user = await Users.findOne({ resetCode });
        if (!user) return res.status(400).json({ error: ErrorCode.NO_USER });

        const isPwdEq = compareSync(password, user.password);
        if (isPwdEq)
            return res.status(400).json({ error: 'The password is the same' });

        user.password = hashSync(password, 3);
        user.resetCode = undefined;
        await user.save();

        res.status(200).json({ response: 'Password is updated' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: ErrorCode.SERVER });
    }
});

export default router;