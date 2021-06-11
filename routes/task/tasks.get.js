const { Router } = require("express");
const { Task } = require('../../models');
const { query } = require('express-validator');
const authMiddleware = require('../../middlewares/authMiddleware');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');
const router = Router();

router.get('/tasks',
    authMiddleware,
    query('order').isString().isIn(['asc', 'desc']).toUpperCase().optional({ checkFalsy: true }).withMessage('Invalid order'),
    query('filterBy').isString().isIn(['done', 'undone']).optional({ checkFalsy: true }).withMessage('Invalid filterBy'),
    query('curentPage').isNumeric().optional({ checkFalsy: true }).withMessage('Invalid curentPage'),
    query('limit').isNumeric().optional({ checkFalsy: true }).withMessage('Invalid limit'),
    validatorMiddleware,
    async (req, res, next) => {
        const user_uuid = res.locals.user.uuid;
        const { filterBy, order, curentPage = 1, limit = 100 } = req.query;
        const filterQuery = { 'done': true, 'undone': false };
        const filter = {
            where: { user_uuid },
            offset: limit * (curentPage - 1),
            limit: limit
        };
        if (order) filter.order = [['createdAt', order]];
        if (filterBy) filter.where.done = filterQuery[filterBy];
        try {
            const { count, rows } = await Task.findAndCountAll(filter);
            const pagesCount = Math.ceil(count / limit);
            return res.send({ pagesCount, tasks: rows })

        } catch (err) {
            next(err);
        };
    });

module.exports = router;