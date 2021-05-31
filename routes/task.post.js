import { Router } from "express";
import { body, validationResult } from 'express-validator';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid'
const router = Router();

router.post('/task',
    body('name').isString().isLength({ min: 2 }),
    body('done').isBoolean(),
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).send({ errors: errors.array() });
        };
        
        fs.readFile('Tasks.json', 'utf-8', (err, data) => {
            if (err) { return res.send({ msg: 'Can`t read file', err: err }) };
            const task = req.body
            const tasks = JSON.parse(data)
            const newTasks = [...tasks, { id: uuidv4(), ...task, date: new Date(Date.now()) }];
            const prettyJSON = JSON.stringify(newTasks, null, 2)

            fs.writeFile(`Tasks.json`, prettyJSON, err => {
                if (err) {
                    return res.send({ msg: 'Can`t write file', err })
                };
                return res.send({ msg: 'Tack was posted', task });
            });
        });
    });

export default router;