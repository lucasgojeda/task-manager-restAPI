const { response, request } = require("express");
const { Task } = require("../models");
const { ObjectId } = require("mongoose").Types;

const getTasks = async (req = request, res = response) => {

  const { user } = req;

  try {

    const tasks = await Task.find({ id: user._id });

    res.status(200).json({
      msg: "OK",
      tasks
    });
  } catch (error) {
    res.status(400).json({
      msg: "Get tasks failed - Talk with the administrator"
    });
    console.log(error);
  }
};

const createTask = async (req, res = response) => {

  const { body: { title, body }, user } = req;

  try {

    const data = {
      title,
      body,
      date: Date.now(),
      user: user._id,
    };

    const newTask = new Task(data);

    const task = await newTask.save();

    res.status(200).json({
      msg: "OK",
      task
    });

  } catch (error) {
    res.status(400).json({
      msg: "Create task failed - Talk with the administrator"
    });
    console.log(error);
  }
};

const updateTask = async (req, res = response) => {

  const { body, params: { id } } = req;

  try {

    const dataTask = {
      _id: id,
      title: body.title,
      body: body.body,
    };

    const updatedTask = await Task.findByIdAndUpdate(id, dataTask, { new: true });

    res.status(200).json({
      msg: "OK",
      task: updatedTask
    });
  } catch (error) {
    res.status(400).json({
      msg: "Update task failed - Talk with the administrator"
    });
    console.log(error);
  }
};

const finishTask = async (req, res = response) => {

  const { params: { id } } = req;

  try {

    const finishedTask = await Task.findByIdAndUpdate(id, { status: false }, { new: true });

    res.status(200).json({
      msg: "OK",
      task: finishedTask
    });
  } catch (error) {
    res.status(400).json({
      msg: "Finish task failed - Talk with the administrator"
    });
    console.log(error);
  }
};

const deleteTask = async (req, res = response) => {

  const { params: { id } } = req;

  try {

    const deletedTask = await Task.findByIdAndRemove(id, { new: true });

    res.status(200).json({
      msg: "OK",
      task: deletedTask
    });
  } catch (error) {
    res.status(400).json({
      msg: "Delete task failed - Talk with the administrator"
    });
    console.log(error);
  }
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  finishTask,
  deleteTask,
};
