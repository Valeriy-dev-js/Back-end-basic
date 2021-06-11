const { Router } = require("express");
const { User } = require('../../models')
const { body } = require('express-validator');
const { ErrorHandler } = require('../../error');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');

const router = Router();

router.post('/signup',
    body('name').trim().isString().isLength({ min: 4 }).withMessage('Invalid username'),
    body('password').isString().isLength({ min: 4 }).withMessage('Invalid password'),
    validatorMiddleware,
    async (req, res, next) => {
        const {name, password} = req.body;
        try {
        const exsistingUser = await User.findOne({where: {name: name}})
        if(exsistingUser){
            throw new ErrorHandler(422, "User is already registered")
        }
        const newUser = await User.create({name, password});
        return res.json(newUser)
        } catch (err) {
            next(err)
        };
    });

module.exports = router;