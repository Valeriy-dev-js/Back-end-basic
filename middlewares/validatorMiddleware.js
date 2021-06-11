const { validationResult } = require('express-validator');

module.exports = (req, res, next) => {
    const errors = validationResult(req)
    try {
        if (!errors.isEmpty()) {
            const messages = errors.array().map(err => err.msg)
            throw new ErrorHandler(400, messages)
        }
        next()
    } catch (err) {
        next(err)
    }
}