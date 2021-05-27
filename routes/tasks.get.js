import { Router } from "express";
import fs from 'fs';
const router = Router();

router.get('/tasks', (req, res) => {
    fs.readFile('Tasks.json', 'utf-8', (err, data) => {
        if(err) {
            throw err;
        };
        const todos = JSON.parse(data)
        const test = data
        res.send(todos)
    });
});


export default router;