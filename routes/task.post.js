import { Router } from "express";
import fs from 'fs';

const router = Router();

router.post('/task', (req, res) =>{
    const body = req.body
    fs.readFile('Tasks.json', 'utf-8', (err, data) => {
        if(err) {
            throw err;
        };

        const tacks = JSON.parse(data)
        const newTasks = JSON.stringify([...tacks, body])

        fs.writeFile(`Tasks.json`, newTasks, err => {
            if(err) {
                throw err;
            };
        });
    });
    res.send(`Name: ${body.name} Done: ${body.done}`);
});

export default router;