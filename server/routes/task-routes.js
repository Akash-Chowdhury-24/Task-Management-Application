const express = require('express');
const taskRouter = express.Router();

const{addNewTask,getAllTask,deleteTask,updateTask} = require('../controllers/task-controller.js');


taskRouter.post('/add-new-task',addNewTask);
taskRouter.get('/get-all-task-by-id/:id',getAllTask);
taskRouter.delete('/delete-task-by-id/:id',deleteTask);
taskRouter.put('/update-task-by-id',updateTask);

module.exports = taskRouter;