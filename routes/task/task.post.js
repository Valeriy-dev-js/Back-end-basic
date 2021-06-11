const { Router } = require("express");
const { Task } = require('../../models')
const { body } = require('express-validator');
const { ErrorHandler } = require('../../error')
const authMiddleware = require('../../middlewares/authMiddleware');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');
const router = Router();

router.post('/task',
    authMiddleware,
    body('name').trim().isString().isLength({ min: 2 }).withMessage('Invalid name'),
    body('done').isBoolean().withMessage('Invalid done'),
    validatorMiddleware,
    async (req, res, next) => {
        const user_uuid = res.locals.user.uuid;
        const { name, done } = req.body;
        try {
            const exsistingTask = await Task.findOne({ where: { name, user_uuid } });
            if (exsistingTask) {
                throw new ErrorHandler(422, "Task with same name not allowed");
            }
            const task = await Task.create({ user_uuid, name, done });
            return res.json(task);
        } catch (err) {
            next(err)
        };
    });

module.exports = router;