const { Router } = require("express");
const { User } = require('../../models')
const { body, validationResult } = require('express-validator');
const { ErrorHandler } = require('../../error')

const router = Router();

router.post('/signup',
    body('name').trim().isString().isLength({ min: 4 }),
    body('password').isString().isLength({ min: 4 }),
    async (req, res, next) => {
        try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new ErrorHandler(400, 'Incorrect Username or Password');
        };
        const {name, password} = req.body;
        const userName = await User.findOne({where: {name: name}})
        if(userName){
            throw new ErrorHandler(422, "User is already registered")
        }
        const user = await User.create({name, password});
        return res.json(user)
        } catch (err) {
            next(err)
        };
    });

module.exports = router;