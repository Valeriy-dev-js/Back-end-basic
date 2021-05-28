import { Router } from "express";
import fs from 'fs';
const router = Router();


router.get('/tasks', (req, res) => {
    const { filterBy, order } = req.query
    fs.readFile('Tasks.json', 'utf-8', (err, data) => {
        if (err) {
            throw err;
        };
        const tasks = JSON.parse(data);

        let filteredTasks;

        filterBy
        ? filteredTasks = tasks.filter(task => {
            if(filterBy === 'done'){
                return task.done === true;
            };
            if(filterBy === 'undone'){
                return task.done === false;
            };
        })
        : filteredTasks = tasks;

        let sorteredTasks;

        order 
        ? sorteredTasks = filteredTasks.sort((a, b) =>{
            if(order === 'desc'){
                return Date.parse(a.date) - Date.parse(b.date);
            };
            if(order === 'asc'){
                return Date.parse(b.date) - Date.parse(a.date);
            };
        })
        : sorteredTasks = filteredTasks;

        res.send(sorteredTasks)
    });
});


export default router;