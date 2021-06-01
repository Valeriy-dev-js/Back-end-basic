const express = require('express');
const postTask = require('./routes/task.post');


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json())
// app.use(getTasks);
// app.use(postTask)
// app.use(deleteTask)
// app.use(patchTask)
// app.get("/", (req, res) => {
//     res.send({ name: 'sadfsd' })
// })

app.use(postTask);





app.listen(PORT, () => console.log(`Server listening on port ${PORT}...`))