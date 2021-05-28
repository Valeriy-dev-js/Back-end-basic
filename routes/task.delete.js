import { Router } from "express";
import fs from 'fs';
const router = Router();


router.delete('/task/:id', (req, res) => {
    const id  = req.params.id;
    console.log('ID', typeof id);
    fs.readFile('Tasks.json', (err, data) => {
        if(err){
            throw err;
        }

        const tasks = JSON.parse(data);
        const newTasks = tasks.filter(task => task.id !== id);
        const prettyJSON = JSON.stringify(newTasks, null, 2);
        fs.writeFile('Tasks.json', prettyJSON, err => {
            if(err){
                throw err;
            };
        });
        res.send(`Task: ${JSON.stringify(tasks.find(task => task.id === id))} DELETED`)
    })
});

export default router;