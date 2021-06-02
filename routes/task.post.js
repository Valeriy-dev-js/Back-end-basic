const { Router } = require("express");
const { Task } = require('../models')
const { body, validationResult } = require('express-validator');
const { ErrorHandler } = require('../error')

const router = Router();

router.post('/task',
    body('name').isString().isLength({ min: 2 }),
    body('done').isBoolean(),
    async (req, res, next) => {
        try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new ErrorHandler(400, "invalid body", errors.array())
        };
        const {name, done} = req.body;
        const taskName = await Task.findOne({where: {name: name}})
        if(taskName){
            throw new ErrorHandler(422, "Task with same name not allowed")
        }
        const task = await Task.create({name, done});
        return res.json(task)
        } catch (err) {
            next(err)
        };
    });

module.exports = router;