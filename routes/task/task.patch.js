const { Router } = require("express");
const { Task } = require('../../models')
const { body, param, validationResult } = require('express-validator');
const { ErrorHandler } = require('../../error');
const authMiddleware = require('../../middlewares/authMiddleware');


const router = Router();

router.patch('/task/:uuid',
    authMiddleware,
    body('name').trim().isString().isLength({ min: 2 }),
    body('done').isBoolean(),
    param('uuid').isUUID(),
    async (req, res, next) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw new ErrorHandler(400, "invalid request", errors.array())
            };

            const user_uuid = res.locals.user.uuid;
            const uuid = req.params.uuid;
            const { name, done } = req.body;

            const exsistingTask = await Task.findOne({ where: { uuid, user_uuid } });
            if (!exsistingTask) {
                throw new ErrorHandler(422, "Can`t find task");
            };

            await Task.update({ name, done }, { where: { uuid, user_uuid } });

            return res.json(req.body);
        } catch (err) {
            next(err);
        };


    })

module.exports = router;