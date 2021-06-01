const { Router } = require("express");
const { sequelize, Task } = require('../models')
const { body, validationResult } = require('express-validator');
const router = Router();

router.post('/task',
    body('name').isString().isLength({ min: 2 }),
    body('done').isBoolean(),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).send({ errors: errors.array() });
        };

        const {name, done} = req.body;
        try {
            const user = await Task.create({name, done});
            return res.json(user)
        } catch (err) {
            console.log(err);
            return res.send("Cant post task")
        };
    });

module.exports = router;