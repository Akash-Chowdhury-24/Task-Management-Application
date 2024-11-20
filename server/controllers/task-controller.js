
const Joi = require('joi');
const Task = require('../models/task.js');


// add new task 
// edit task 
// delete task 
// get all tasks by user id


// check if the new task info is in correct order 
const newTaskSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  status: Joi.string().required(),
  userId: Joi.string().required(),
  priority: Joi.string().required(),
  hours: Joi.number().required(),
  minutes: Joi.number().required(),
});

// add new task 
const addNewTask = async (req, res, next) => {
  const {
    title,
    description,
    status,
    userId,
    priority,
    hours,
    minutes,
  } = await req.body;

  const { error } = newTaskSchema.validate({ title, description, status, userId, priority, hours, minutes });

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }
  try {
    const newlyCreatedTask = await Task.create({
      title,
      description,
      status,
      userId,
      priority,
      hours,
      minutes,
      originalHours: hours,
      originalMinutes: minutes,
    });

    if (newlyCreatedTask) {
      return res.status(200).json({
        success: true,
        message: 'Task created successfully',
        newlyCreatedTask,
      });
    } else {
      return res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });

  }


}

// get All Task 
const getAllTask = async (req, res, next) => {
  const { id } = await req.params;
  try {
    const allTask = await Task.find({ userId: id });
    if (allTask) {
      return res.status(200).json({
        success: true,
        message: 'All task fetched successfully',
        taskList: allTask,
      });
    } else {
      return res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
}


// delete task 

const deleteTask = async (req, res, next) => {
  const { id } = await req.params;

  try {
    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'Task id is required',
      });
    }
    const deletedTask = await Task.findByIdAndDelete(id);
    if (deletedTask) {
      return res.status(200).json({
        success: true,
        message: 'Task deleted successfully',
      });
    } else {
      return res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
}

// update a task
const updateTask = async (req, res, next) => {
  const { title, description, priority, status, userId, hours, minutes, _id } = await req.body;

  try {
    const fieldsToBeUpdated = {
      title,
      description,
      priority,
      status,
      hours,
      minutes,
    }


    const updatedTask = await Task.findByIdAndUpdate(_id, {
      title,
      description,
      priority,
      status,
      userId,
      hours,
      minutes,
      originalHours: hours,
      originalMinutes: minutes,
    },
      { new: true }
    )

    if (updateTask) {
      return res.status(200).json({
        success: true,
        message: 'Task updated successfully',
      });
    } else {
      return res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }


  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

module.exports = { addNewTask, getAllTask, deleteTask, updateTask };