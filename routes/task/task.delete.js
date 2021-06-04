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

        const userUUID = res.locals.user.uuid;
        const taskUUID = req.params.uuid;

        const taskID = await Task.findOne({where: {uuid: taskUUID, user_uuid: userUUID}});
        if(!taskID){
            throw new ErrorHandler(422, "Can`t find task");
        };

        await Task.destroy({where: {
            uuid: taskUUID,
            user_uuid: userUUID
        }});
        return res.send("Task deleted")
    } catch (err) {
        next(err);
    };
});

module.exports = router;