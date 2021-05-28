import { Router } from "express";
import fs from 'fs';

const router = Router();


router.delete('task/:id', (req, res) => {
    // fs.readFile('Tasks.json', 'utf-8', (err, data) => {
        // if (err) {
            // throw err;
        // };
// 
        // const 
    // })
    console.log(`Body: ${req.params.id}`)
});

export default router;