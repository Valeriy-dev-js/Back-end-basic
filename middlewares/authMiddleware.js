require('dotenv').config()
const { ErrorHandler } = require('../error');
const jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        next();
    };

    try {
        const token = req.headers.authorization.split(' ')[1]
            if (!token) {
            throw new ErrorHandler(403, "User isn`t authorized");
            };
        jwt.verify(token, process.env.SECRET, (err, decoded) => {
            if (err) {
                throw new ErrorHandler(422, "Incorrect token");
            };
            res.locals.user = decoded;
        });
        next()
    } catch (err) {

        next(err);
    };
};