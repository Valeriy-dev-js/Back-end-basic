const { Router } = require("express");
const { Task } = require('../models')
const { body, validationResult } = require('express-validator');
const router = Router();
const { ErrorHandler } = require('../error')


router.post('/task',
    body('name').isString().isLength({ min: 2 }),
    body('done').isBoolean(),
    async (req, res, next) => {
        try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new ErrorHandler(422, "invalid querry", errors.array())
        };
        const {name, done} = req.body;
        const task = await Task.findOne({where: {name: name}})
        if(task){
            throw new ErrorHandler(422, "Task with same name not allowed")
        }
        const user = await Task.create({name, done});
        return res.json(user)
        } catch (err) {
            next(err)
        };
    });

module.exports = router;