import fs from 'fs';
import path from 'path';

const __dirname = path.resolve('/Task.json')




export const postTask = (req, res) =>{
    console.log("All done");
    // res.send(req.body)   
    const data = req.body


    // fs.writeFile()
    res.send(`Name: ${data.name} Done: ${data.done}`);
    console.log('DIRNAME', __dirname);
}