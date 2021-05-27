import express from 'express';

const app = express();


// app.use('/about', (req, res, next) => {//     console.log('Middleware About');//     res.send("About")    // })

app.get('/', (req, res) =>{
    // console.log('Route/ ');
    res.send('<h1>Hello!</h1>')
    
})

app.use('/about', (req, res) => {
    const id = req.query.id;
    res.send('<h1>Hello!</h1><p>id = ' + id + '</p>')
})




app.listen(3000)