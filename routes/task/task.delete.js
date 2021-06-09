const { Router } = require("express");
const { Task } = require('../../models');
const { param, validationResult } = require('express-validator');
const { ErrorHandler } = require('../../error')
const authMiddleware = require('../../middlewares/authMiddleware');


const router = Router();



router.delete('/task/:uuid',
    authMiddleware,
    param('uuid').isUUID(),
    async (req, res, next) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw new ErrorHandler(400, "invalid request", errors.array())
            };

            const user_uuid = res.locals.user.uuid;
            const uuid = req.params.uuid;

            const exsistingTask = await Task.findOne({ where: { uuid, user_uuid } });
            if (!exsistingTask) {
                throw new ErrorHandler(422, "Can`t find task");
            };

            await Task.destroy({ where: { uuid, user_uuid } });
            return res.send("Task deleted")
        } catch (err) {
            next(err);
        };
    });

module.exports = router;