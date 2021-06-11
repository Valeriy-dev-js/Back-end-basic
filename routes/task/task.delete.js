const { Router } = require("express");
const { Task } = require('../../models');
const { param } = require('express-validator');
const { ErrorHandler } = require('../../error')
const authMiddleware = require('../../middlewares/authMiddleware');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');
const router = Router();

router.delete('/task/:uuid',
    authMiddleware,
    param('uuid').isUUID().withMessage('Invalid uuid'),
    validatorMiddleware,
    async (req, res, next) => {
        const user_uuid = res.locals.user.uuid;
        const uuid = req.params.uuid;
        try {
            const exsistingTask = await Task.findOne({ where: { uuid, user_uuid } });
            if (!exsistingTask) {
                throw new ErrorHandler(422, "Can`t find task");
            };
            const task = exsistingTask.dataValues
            await Task.destroy({ where: { uuid, user_uuid } });
            return res.send(task)
        } catch (err) {
            next(err);
        };
    });

module.exports = router;