import { Router } from "express";
import { body, validationResult} from 'express-validator';
import fs from 'fs';

const router = Router();

router.patch('/task/:id',
    body('name').isString().isLength({ min: 2}),
    body('done').isBoolean(),
    (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).send({errors: errors.array()});
    };
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
        if(index === -1){
            return res.status(401).send('Task not founded')
        }
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