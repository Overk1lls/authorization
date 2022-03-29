import { compareSync, hashSync } from 'bcrypt';
import { Router } from 'express';
import { APIError, ErrorCode } from '../../services/api-error.service';
import { IUserModel } from '../../interfaces/user';
import { UsersModel } from '../../models/user';

const router = Router();

router.post('/', async (req, res, next) => {
    try {
        const { resetCode, password } = req.body as IUserModel;

        const user = await UsersModel.findOne({ resetCode });
        if (!user) throw new APIError(ErrorCode.USER_IS_NOT_FOUND);

        const isPwdEq = compareSync(password, user.password);
        if (isPwdEq)
            throw new APIError(ErrorCode.BAD_REQUEST, 'The password is the same as yours');

        user.password = hashSync(password, 3);
        user.resetCode = undefined;
        await user.save();

        res.status(200).json({ response: 'Password is updated' });
    } catch (error) {
        next(error);
    }
});

export default router;
