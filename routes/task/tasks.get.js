const { Router } = require("express");
const { Task } = require('../../models')
const { User } = require('../../models')
const { query, validationResult } = require('express-validator');
const { ErrorHandler } = require('../../error');
const authMiddleware = require('../../middlewares/authMiddleware')


const router = Router();

router.get('/tasks',
    authMiddleware,
    query('order').isString().isIn(['asc', 'desc']).toUpperCase().optional({ checkFalsy: true }),
    query('filterBy').isString().isIn(['done', 'undone']).optional({ checkFalsy: true }),
    query('curentPage').isNumeric().optional({ checkFalsy: true }),
    query('limit').isNumeric().optional({ checkFalsy: true }),
    async (req, res, next) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw new ErrorHandler(400, "qerry", errors.array())
            };
            const user_uuid = res.locals.user.uuid;
            const { name } = await User.findOne({ where: { uuid: user_uuid } });
            const { filterBy, order, curentPage = 1, limit = 100 } = req.query;
            const filterQuery = { 'done': true, 'undone': false };

            const filter = {
                where: { user_uuid },
                offset: limit * (curentPage - 1),
                limit: limit
            };
            if (order) filter.order = [['createdAt', order]];
            if (filterBy) filter.where.done = filterQuery[filterBy];

            const { count, rows } = await Task.findAndCountAll(filter);

            const pagesCount = Math.ceil(count / limit);
            return res.send({ pagesCount, userName: name, tasks: rows })

        } catch (err) {
            next(err);
        };
    });


module.exports = router;