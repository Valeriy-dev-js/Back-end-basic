const { Router } = require("express");
const { Task } = require('../models');
const { param, validationResult } = require('express-validator');
const { ErrorHandler } = require('../error')

const router = Router();



router.delete('/task/:uuid', 
    param('uuid').isUUID(),
    async (req, res, next) => {
        try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new ErrorHandler(400, "invalid request", errors.array())
        };

        const uuid = req.params.uuid;

        const taskID = await Task.findOne({where: {uuid: uuid}});
        if(!taskID){
            throw new ErrorHandler(422, "Can`t find task")
        };
        const task = await Task.destroy({where: 
            { uuid: uuid }
        });
        return res.json(task)
    } catch (err) {
        next(err);
    };
});

module.exports = router;