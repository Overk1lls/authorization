import { Router } from "express";
import { ErrorCode } from "../../errors/api-error";
import { Users } from "../../models/user";

const router = Router();

router.get('/:code', async (req, res) => {
    const { code } = req.params;

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

export default router;