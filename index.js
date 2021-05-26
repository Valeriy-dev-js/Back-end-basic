import express from 'express';


const app = express();


app.use((req, res, next) => {
    console.log('Middleware 1');
    next()
})







app.get('/', (req, res) =>{
    console.log('Route/ ');
    res.send('hello')
})
app.listen(3000)