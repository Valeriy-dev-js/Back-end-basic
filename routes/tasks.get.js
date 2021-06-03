const { Router } = require("express");
const { Task } = require('../models')
const { query, validationResult } = require('express-validator');
const { ErrorHandler } = require('../error')

const router = Router();

router.get('/tasks',
    query('order').isString().optional({ checkFalsy: true }),
    query('filterBy').isString().optional({ checkFalsy: true }),
    query('curentPage').isNumeric().optional({ checkFalsy: true }),
    query('limit').isNumeric().optional({ checkFalsy: true }),
    async (req, res, next) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw new ErrorHandler(400, "qerry", errors.array())
            };
            const { filterBy = '', order = 'desc', curentPage = 1, limit = 100 } = req.query;

            const filterQuery = { 'done': true, 'undone': false, '': [true, false] };
            const sorterQuery = { 'asc': 'ASC', 'desc': 'DESC' };

            if (filterQuery[filterBy] === undefined || sorterQuery[order] === undefined) {
                throw new ErrorHandler(400, "Incorrect query");
            };

            const { count, rows } = await Task.findAndCountAll({
                where: {
                    done: filterQuery[filterBy]
                },
                order: [['createdAt', sorterQuery[order]]],
                limit: limit,
                offset: limit * ( curentPage - 1 ),
            })

            const pagesCount = Math.ceil(count / limit);
            return res.send({ pagesCount, Tasks: rows })
            
        } catch (err) {
            next(err);
        };
    });


module.exports = router;