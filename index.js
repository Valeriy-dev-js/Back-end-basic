import express from 'express';
import postTask from './routes/task.post.js';
import getTasks from './routes/tasks.get.js'



const app = express();


app.use(getTasks);
app.use(postTask)






app.listen(3000)