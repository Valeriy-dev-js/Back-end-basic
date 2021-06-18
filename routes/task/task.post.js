const { Router } = require("express");
const { Task } = require('../../models')
const { body } = require('express-validator');
const { ErrorHandler } = require('../../error')
const authMiddleware = require('../../middlewares/authMiddleware');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');
const router = Router();

router.post('/task',
    authMiddleware,
    body('name').trim().isString().isLength({ min: 2 }).withMessage('Invalid Taskname'),
    body('done').isBoolean().withMessage('Invalid done'),
    validatorMiddleware,
    async (req, res, next) => {
        const user_uuid = res.locals.user.uuid;
        const { name, done } = req.body;
        try {
            const task = await Task.findOne({ where: { name } });
            if (task) {
                throw new ErrorHandler(422, "Task with same name not allowed");
            }
            console.log(1);
            const newTask = await Task.create({ user_uuid, name, done });
            return res.json(newTask);
        } catch (err) {
            // next(err)
            console.log(err);
        };
    });

module.exports = router;