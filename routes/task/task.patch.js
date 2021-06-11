const { Router } = require("express");
const { Task } = require('../../models')
const { body, param } = require('express-validator');
const { ErrorHandler } = require('../../error');
const authMiddleware = require('../../middlewares/authMiddleware');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');
const router = Router();

router.patch('/task/:uuid',
    authMiddleware,
    body('name').trim().isString().isLength({ min: 2 }).withMessage('Invalid name'),
    body('done').isBoolean().withMessage('Invalid done'),
    param('uuid').isUUID().withMessage('Invalid uuid'),
    validatorMiddleware,
    async (req, res, next) => {
        const user_uuid = res.locals.user.uuid;
        const uuid = req.params.uuid;
        const { name, done } = req.body;
        try {
            const task = await Task.findOne({ where: { uuid, user_uuid } });
            if (!task) {
                throw new ErrorHandler(422, "Can`t find task");
            };

            await Task.update({ name, done }, { where: { uuid, user_uuid } });
            return res.json(req.body);
        } catch (err) {
            next(err);
        };


    })

module.exports = router;