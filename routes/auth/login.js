require('dotenv').config()
const { Router } = require("express");
const { User } = require('../../models')
const { body } = require('express-validator');
const { ErrorHandler } = require('../../error');
const jwt = require('jsonwebtoken');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');
const bcrypt = require('bcrypt')
const router = Router();

router.post('/login',
    body('name').trim().isString().isLength({ min: 4 }).withMessage('Invalid username'),
    body('password').isString().isLength({ min: 4 }).withMessage('Invalid password'),
    validatorMiddleware,
    async (req, res, next) => {
        const { name, password } = req.body;
        try {
            const user = await User.findOne({ where: { name } });
            if (!user) {
                throw new ErrorHandler(422, `Can't find user ${name}`);
            };

            const validPassword = bcrypt.compareSync(password, user.password);
            if (!validPassword) {
                throw new ErrorHandler(422, "Incorrect password");
            };

            const token = jwt.sign({ uuid: user.uuid }, process.env.SECRET, { expiresIn: '24h' })
            return res.json({ token });
        } catch (err) {
            next(err);
        };
    });

module.exports = router;