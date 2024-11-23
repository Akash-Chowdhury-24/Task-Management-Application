// create the express app 

require('dotenv').config();
const express = require('express');
const app = express();
const Task = require('./models/task.js');
const userRouter = require('./routes/user-routes.js');
const taskRouter = require('./routes/task-routes.js');
const cors = require('cors');
const cookieParse = require('cookie-parser');

const Port = process.env.PORT;
// configing the cors
app.use(
  cors({
    origin: [process.env.CLIENT_URL],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
)
app.use(cookieParse()); // for cookies

app.use(express.json()); // for parsing all the data that is comming in json format

app.use('/api/user', userRouter); // for the userRoute 
app.use('/api/task', taskRouter); // for the taskRoute


// connection to the database and calling it
require('./database');
// tell to which endpoint the api calls are made 
app.use('/api', (req, res) => {
  res.status(200).json({ message: 'hello express' });
})


// run the server on some port
app.listen(Port, () => { console.log('server is running on port 5000') });