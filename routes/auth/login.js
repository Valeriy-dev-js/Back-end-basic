require('dotenv').config()
const { Router } = require("express");
const { User } = require('../../models')
const { body, validationResult } = require('express-validator');
const { ErrorHandler } = require('../../error');
const jwt = require('jsonwebtoken');
const router = Router();

router.post('/login',
    body('name').trim().isString().isLength({ min: 4 }),
    body('password').isString().isLength({ min: 4 }),
    async (req, res, next) => {
        try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new ErrorHandler(400, "invalid body", errors.array());
        };
        const {name, password} = req.body;
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