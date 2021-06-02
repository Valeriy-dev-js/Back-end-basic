const { Router } = require("express");
const { Task } = require('../models')
const { query, validationResult } = require('express-validator');
const { ErrorHandler } = require('../error')

const router = Router();

router.get('/tasks',
    query('order').isString().optional({ checkFalsy: true }),
    query('filterBy').isString().optional({ checkFalsy: true }),
    query('page').isNumeric().optional({ checkFalsy: true }),
    query('limit').isNumeric().optional({ checkFalsy: true }),
    async (req, res, next) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw new ErrorHandler(400, "qerry", errors.array())
            };
            const { filterBy = '', order = 'desc', page, limit } = req.query;

            const filterQuery = { 'done': true, 'undone': false, '': [true, false] };
            const sorterQuery = { 'asc': 'ASC', 'desc': 'DESC' };
            console.log('FILTER', filterQuery[filterBy]);

            if (filterQuery[filterBy] === undefined || sorterQuery[order] === undefined) {
                throw new ErrorHandler(400, "Incorrect query");
            };

            const tasks = await Task.findAll({
                where: {
                    done: filterQuery[filterBy]
                },
                order: [['createdAt', sorterQuery[order]]]
            })
            res.send(tasks)
        } catch (err) {
            next(err);
        };
    });


module.exports = router;