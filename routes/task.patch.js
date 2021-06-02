const { Router } = require("express");
const { Task } = require('../models')
const { body, param, validationResult } = require('express-validator');
const { ErrorHandler } = require('../error')


const router = Router();

router.patch('/task/:uuid',
    body('name').isString().isLength({ min: 2 }),
    body('done').isBoolean(),
    param('uuid').isUUID(),
    async (req, res, next) => {
        try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new ErrorHandler(400, "invalid request", errors.array())
        };

        const uuid = req.params.uuid;
        const { name, done } = req.body;

        
        const taskID = await Task.findOne({where: {uuid: uuid}});
        if(!taskID){
            throw new ErrorHandler(422, "Can`t find task")
        };

        const taskName = await Task.findOne({where: {name: name}})
        if(taskName){
            throw new ErrorHandler(422, "Task with same name not allowed");
        }

        await Task.update({ name, done }, {where:{
            uuid: uuid
        }});
        
        return res.json(req.body);
        } catch (err) {
            next(err);
        };


    })

module.exports = router;