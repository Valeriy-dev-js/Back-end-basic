const { Router } = require("express");
const { Task } = require('../models')
const { query, validationResult } = require('express-validator');
const router = Router();


router.get('/tasks',
    query('order').isString().optional({ checkFalsy: true }),
    query('filterBy').isString().optional({ checkFalsy: true }),
    query('page').isNumeric().optional({ checkFalsy: true }),
    query('limit').isNumeric().optional({ checkFalsy: true }),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).send({ errors: errors.array() });
        };

        const { filterBy, order = 'desc', page, limit } = req.query
        try {
            const tasks = await Task.findAll()
            res.send(tasks)
        } catch (err){
            console.log(err);
        }
        

            
        
    });


module.exports = router;