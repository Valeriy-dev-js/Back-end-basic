import { Router } from "express";
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid'
const router = Router();

router.post('/task', (req, res) => {
    fs.readFile('Tasks.json', 'utf-8', (err, data) => {
        if (err) {
            throw err;
        };
        
        const task = req.body
        const tasks = JSON.parse(data)
        const newTasks = [...tasks, { id: uuidv4(), ...task, date: new Date(Date.now()) }];
        const prettyJSON = JSON.stringify(newTasks, null, 2)

        fs.writeFile(`Tasks.json`, prettyJSON, err => {
            if (err) {
                throw err;
            };
        });
        res.send(`Name: ${task.name} Done: ${task.done} Length: ${newTasks.length}`);
    });
});

export default router;