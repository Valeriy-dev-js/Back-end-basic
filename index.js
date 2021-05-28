import express from 'express';
import postTask from './routes/task.post.js';
import getTasks from './routes/tasks.get.js'
import deleteTask from './routes/task.delete.js'



const app = express();

app.use(express.json())
app.use(getTasks);
app.use(postTask)
app.use(deleteTask)





app.listen(3000, () => console.log('Server listening on port 3000'))