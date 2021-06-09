require('dotenv').config()
const { User } = require('../models')
const { ErrorHandler } = require('../error');
const jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            throw new ErrorHandler(403, "Missing headers");
        }

        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            throw new ErrorHandler(403, "User isn`t authorized");
        };
        try {
            const decoded = jwt.verify(token, process.env.SECRET)
            const existingUser = User.findOne({ where: { uuid: decoded.uuid } })
            if (!existingUser) {
                throw new ErrorHandler(403, "User isn`t authorized")
            }
            res.locals.user = decoded
        } catch (err) {
            throw new ErrorHandler(422, "Incorrect token")
        }
        next()
    } catch (err) {
        next(err);
    };
};