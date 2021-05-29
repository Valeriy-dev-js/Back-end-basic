import { Router } from "express";
import { query, validationResult } from 'express-validator';
import fs from 'fs';
const router = Router();


router.get('/tasks',
    query('filterBy').isString(),
    query('order').isString(),
    (req, res) => {
        const { filterBy, order = 'desc' } = req.query

        fs.readFile('Tasks.json', 'utf-8', (err, data) => {
            if (err) {
                throw err;
            };
            const tasks = JSON.parse(data);

            let filteredTasks = tasks;

            if (filterBy) {
                filteredTasks = tasks.filter(task =>
                    filterBy === 'done'
                        ? task.done === true
                        : task.done === false)
            }

            if (order) {
                filteredTasks = filteredTasks.sort((a, b) =>
                    order === 'desc'
                        ? Date.parse(a.date) - Date.parse(b.date)
                        : Date.parse(b.date) - Date.parse(a.date))
            }
            res.send(filteredTasks)
        });
    });


export default router;