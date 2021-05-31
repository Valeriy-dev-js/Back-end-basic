import { Router } from "express";
import fs from 'fs';
const router = Router();


router.delete('/task/:id', (req, res) => {
    const id = req.params.id;
    console.log('ID', typeof id);
    fs.readFile('Tasks.json', (err, data) => {
        if (err) { return res.send({ msg: 'Can`t read file', err }) };

        const tasks = JSON.parse(data);
        const index = tasks.findIndex(task => task.id === id);
        if (index === -1) {
            return res.status(401).send({ msg: `Task not found`, id })
        };
        const task = tasks[index]
        const newTasks = tasks.filter(task => task.id !== id);
        const prettyJSON = JSON.stringify(newTasks, null, 2);
        fs.writeFile('Tasks.json', prettyJSON, err => {
            if (err) {
                return res.send({ msg: 'Can`t write file', err })
            };
            return res.send({ msg: 'Task deleted', task })
        });
    })
});

export default router;