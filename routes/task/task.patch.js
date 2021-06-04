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

        const userUUID = res.locals.user.uuid;
        const taskUUID = req.params.uuid;
        const { name, done } = req.body;

        const taskID = await Task.findOne({where: {uuid: taskUUID, user_uuid:userUUID }});
        if(!taskID){
            throw new ErrorHandler(422, "Can`t find task");
        };
        const taskName = await Task.findOne({where: {name: name, user_uuid:userUUID}});
        if(taskName){
            throw new ErrorHandler(422, "Task with same name not allowed");
        };

        await Task.update({ name, done }, {where:{
            uuid: taskUUID, 
            user_uuid: userUUID
        }});
        
        return res.json(req.body);
        } catch (err) {
            next(err);
        };


    })

module.exports = router;