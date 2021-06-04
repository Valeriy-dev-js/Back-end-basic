const express = require('express');
const { handleError } = require('./error')
const postTask = require('./routes/task.post');
const getTasks = require('./routes/tasks.get')
const deleteTask = require('./routes/task.delete')
const patchTask = require('./routes/task.patch')
const postUser = require('./routes/user.post');


const PORT = process.env.PORT || 3000;
const app = express();



app.use(express.json())
app.use(getTasks);
app.use(postTask);
app.use(postUser);
app.use(deleteTask)
app.use(patchTask)
app.use((err, req, res, next) => {
    handleError(err, res);
  });
    



app.listen(PORT, () => console.log(`Server listening on port ${PORT}...`))