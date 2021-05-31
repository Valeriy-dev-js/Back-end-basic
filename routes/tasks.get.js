import { Router } from "express";
import { query, validationResult } from 'express-validator';
import fs from 'fs';
const router = Router();


router.get('/tasks',
    query('order').isString().optional({ checkFalsy: true }),
    query('filterBy').isString().optional({ checkFalsy: true }),
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).send({ errors: errors.array() });
        };

        const { filterBy, order = 'desc', page, limit } = req.query

        fs.readFile('Tasks.json', 'utf-8', (err, data) => {
            if (err) { return res.send({ msg: 'Can`t read file', err }) };

            const tasks = JSON.parse(data);
            let newTasks = tasks;
            if (filterBy) {
                newTasks = tasks.filter(task =>
                    filterBy === 'done'
                        ? task.done === true
                        : task.done === false)
            }

            if (order) {
                newTasks = newTasks.sort((a, b) =>
                    order === 'desc'
                        ? Date.parse(a.date) - Date.parse(b.date)
                        : Date.parse(b.date) - Date.parse(a.date))
            }

            if (page && limit) {
                const indexOfFirstTask = (page - 1) * limit;
                const indexOfLastTask = page * limit;
                newTasks = newTasks.slice(indexOfFirstTask, indexOfLastTask)
            };
            res.send(newTasks)
        });
    });


export default router;