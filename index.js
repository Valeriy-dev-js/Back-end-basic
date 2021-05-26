import express from 'express';
import fs from 'fs'

const app = express();

app.use((req, res, next) => {
    console.log('Middleware 1');
    next()
})

// app.use('/about', (req, res, next) => {
//     console.log('Middleware About');
//     res.send("About")
    
// })

app.use((req, res , next) => {
    const now = Date.now()
    const data = `Data now: ${now}`
    console.log(data);
    fs.appendFile("server.log", data + '\n', ()=>{})
    next
})







app.get('/', (req, res) =>{
    // console.log('Route/ ');
    res.send('hello')
})
app.listen(3000)