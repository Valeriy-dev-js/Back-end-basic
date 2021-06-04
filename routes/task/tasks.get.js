const { Router } = require("express");
const { Task } = require('../../models')
const { query, validationResult } = require('express-validator');
const { ErrorHandler } = require('../../error');
const authMiddleware = require('../../middlewares/authMiddleware')


const router = Router();

router.get('/tasks',
    authMiddleware,
    query('order').isString().toUpperCase().optional({ checkFalsy: true }),
    query('filterBy').isString().optional({ checkFalsy: true }),
    query('curentPage').isNumeric().optional({ checkFalsy: true }),
    query('limit').isNumeric().optional({ checkFalsy: true }),
    async (req, res, next) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw new ErrorHandler(400, "qerry", errors.array())
            };
            const userUUID = res.locals.user.uuid;
            console.log(userUUID);
            const { filterBy = '' , order, curentPage = 1, limit = 100 } = req.query;

            const filterQuery = { 'done': true, 'undone': false, '': [true, false] };
            // const sorterQuery = { 'asc': 'ASC', 'desc': 'DESC' };
            console.log(filterQuery[filterBy]);
            // if (filterQuery[filterBy] === undefined) {
            //     throw new ErrorHandler(400, "Incorrect query");
            // };
            // const find = { where: { user_uuid: userUUID,
            //     user_uuid: userUUID,
            //     done: filterQuery[filterBy]
            //     },
            //     order: [['createdAt', order]],
            //     limit: limit,
            //     offset: limit * ( curentPage - 1 ),

            // };
            const filter = { 
                where: { user_uuid: userUUID }, 
                limit: limit, 
                offset: limit * (curentPage - 1) 
            };

            if(order) find.order = [['createdAt', order]];
            // if(filterBy !== undefined) find.where.done = filterQuery[filterBy];

            const { count, rows } = await Task.findAndCountAll({where: {user_uuid: userUUID}});

            const pagesCount = Math.ceil(count / limit);
            return res.send({ pagesCount, Tasks: rows })

        } catch (err) {
            next(err);
        };
    });


module.exports = router;