const express = require('express');
const { handleError } = require('./error')
const postTask = require('./routes/task/task.post');
const getTasks = require('./routes/task/tasks.get')
const deleteTask = require('./routes/task/task.delete')
const patchTask = require('./routes/task/task.patch')
const signupUser = require('./routes/auth/signup');
const loginUser = require('./routes/auth/login');


const PORT = process.env.PORT || 3000;
const app = express();



app.use(express.json())
app.use(signupUser);
app.use(loginUser);
app.use(getTasks);
app.use(postTask);
app.use(deleteTask)
app.use(patchTask)
app.use((err, req, res, next) => {
    handleError(err, res);
  });
    



app.listen(PORT, () => console.log(`Server listening on port ${PORT}...`))