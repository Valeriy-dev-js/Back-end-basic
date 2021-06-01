const express = require('express');
const { handleError } = require('./error')
const postTask = require('./routes/task.post');
const getTasks = require('./routes/tasks.get')
const deleteTask = require('./routes/task.delete')
const patchTask = require('./routes/task.patch')


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json())
// app.use(postTask)
// app.get("/", (req, res) => {
    //     res.send({ name: 'sadfsd' })
    // })
    
app.use(getTasks);
app.use(postTask);
app.use(deleteTask)
app.use(patchTask)
app.use((err, req, res, next) => {
    handleError(err, res);
  });
    




app.listen(PORT, () => console.log(`Server listening on port ${PORT}...`))