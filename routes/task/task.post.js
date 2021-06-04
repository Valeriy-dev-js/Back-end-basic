const { Router } = require("express");
const { Task } = require('../../models')
const { body, validationResult } = require('express-validator');
const { ErrorHandler } = require('../../error')
const authMiddleware = require('../../middlewares/authMiddleware')


const router = Router();

router.post('/task',
    authMiddleware,
    body('name').trim().isString().isLength({ min: 2 }),
    body('done').isBoolean(),
    async (req, res, next) => {
        try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new ErrorHandler(400, "invalid body", errors.array())
        };
        const userUUID = req.user.uuid
        // console.log('UUIDu', userUUID);
        const {name, done} = req.body;
        const taskName = await Task.findOne({where: {name: name, user_uuid:userUUID}})
        // console.log("taskName",taskName);
        if(taskName){
            throw new ErrorHandler(422, "Task with same name not allowed")
        }
        const task = await Task.create({ user_uuid: userUUID , name, done});
        return res.json(task)
        } catch (err) {
            next(err)
        };
    });

module.exports = router;