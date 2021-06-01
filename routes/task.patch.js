const { Router } = require("express");
const { Task } = require('../models')
const { body, validationResult } = require('express-validator');

const router = Router();

router.patch('/task/:id',
    body('name').isString().isLength({ min: 2 }),
    body('done').isBoolean(),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).send({ errors: errors.array() });
        };

        const id = req.params.id;
        const { name, done } = req.body;
        try {
            const user = await Task.update({ name, done }, {where:{
                uuid: id
            }});
            return res.json(user)
        } catch (err) {
            console.log(err);
            return res.send("Cant patch task")
        };


    })

module.exports = router;