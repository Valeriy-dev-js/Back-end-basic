require('dotenv').config()
const { Router } = require("express");
const { User } = require('../../models')
const { body } = require('express-validator');
const { ErrorHandler } = require('../../error');
const jwt = require('jsonwebtoken');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');
const router = Router();

router.post('/login',
    body('name').trim().isString().isLength({ min: 4 }).withMessage('Invalid username'),
    body('password').isString().isLength({ min: 4 }).withMessage('Invalid password'),
    validatorMiddleware,
    async (req, res, next) => {
        const {name, password} = req.body;
        try {
        const exsistingUser = await User.findOne({where: {name}});
        if(!exsistingUser){
            throw new ErrorHandler(422, "Can`t find User");
        };

        const exsistingUserWithPassword = await User.findOne({where: { name, password }});
        if(!exsistingUserWithPassword){
            throw new ErrorHandler(422, "Incorrect password");
        };
        const uuid = exsistingUserWithPassword.dataValues.uuid
        const token = jwt.sign({uuid}, process.env.SECRET, {expiresIn:'24h'})
        return res.json({token});
        } catch (err) {
            console.log(err);
            next(err);
        };
    });

module.exports = router;