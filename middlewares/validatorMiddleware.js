const { validationResult } = require('express-validator');
const { ErrorHandler } = require('../error')
module.exports = (req, res, next) => {
    const errors = validationResult(req);
    try {
        if (!errors.isEmpty()) {
            const messages = errors.array().map(err => err.msg).join(', ');
            throw new ErrorHandler(400, messages);
        }
        next();
    } catch (err) {
        next(err);
    };
};