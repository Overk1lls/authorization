import { Router } from "express";
import { APIError, ErrorCode } from "../../errors/api-error";
import { errors } from "../../lib/config";
import { Users } from "../../models/user";

const router = Router();

router.get('/:code', async (req, res, next) => {
    try {
        const { code } = req.params;

        if (!code) throw new APIError(ErrorCode.BAD_REQUEST, 'No code provided');

        const user = await Users.findOneAndUpdate(
            { activationCode: code },
            { activationCode: '' },
            { new: true }
        );
        if (!user) throw new APIError(ErrorCode.NOT_FOUND, errors.NO_USER);
        else if (!user.activationCode) {
            throw new APIError(
                ErrorCode.BAD_REQUEST,
                'The email is already activated'
            );
        }
        res.status(200).json({ response: 'The email is activated' });
    } catch (error) {
        next(error);
    }
});

export default router;