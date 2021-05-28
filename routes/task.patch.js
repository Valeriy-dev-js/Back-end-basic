import { Router } from "express";
import fs from 'fs';

const router = Router();

router.patch('/task/:id', (req, res) => {
    const id = req.params.id;
    const task = req.body;
    fs.readFile('Tasks.json', 'utf-8', (err, data) => {
        if(err) {
            throw err;
        };

        const tasks = JSON.parse(data);
        const newTasks = [...tasks];
        const index = newTasks.findIndex(task => task.id === id);
        newTasks[index] = {...newTasks[index], name: task.name, done: task.done};
        const prettyJSON = JSON.stringify(newTasks, null, 2);

        fs.writeFile('Tasks.json', prettyJSON, err =>{
            if(err) {
                throw err;
            };
        });
        res.send(`Task with id: ${id}, Changed to: ${JSON.stringify(newTasks[index])}`);
    });

})

export default router;