const mongoose = require("mongoose");
const todoModel = require("../models/todoModels");

// CREATE TODO
const createTodoController = async (req, res) => {
  try {
    const { title, description, createdBy, isCompleted } = req.body;
    if (!title || !description) {
      return res.status(500).send({
        success: false,
        message: "Please provide title and description",
      });
    }

    const todo = new todoModel({
      title,
      description,
      createdBy,
      isCompleted, 
    });

    const result = await todo.save();

    res.status(201).send({
      success: true,
      message: "Your task has been created",
      result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Create Todo API",
      error,
    });
  }
};



const getTodoController = async (req, res) => {
  try {
    const requestedUserId = req.params.id;
    const loggedInUserId = req.user._id;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(requestedUserId)) {
      return res.status(400).send({
        success: false,
        message: "Invalid user ID",
      });
    }

    // Secure check
    if (requestedUserId !== loggedInUserId.toString()) {
      return res.status(403).send({
        success: false,
        message: "Forbidden: You cannot access other users' todos",
      });
    }

    const todos = await todoModel.find({ createdBy: requestedUserId });

    res.status(200).send({
      success: true,
      message: todos.length ? "Your Todos" : "You have no todos",
      todos,
    });
  } catch (error) {
    console.error("Get Todo Error:", error);
    res.status(500).send({
      success: false,
      message: "Error in Get Todo API",
      error: error.message,
    });
  }
};

// DELETE TODO
const deleteTodoController = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId format
    if (!id || id.length !== 24) {
      return res.status(400).send({
        success: false,
        message: "Invalid or missing task ID",
      });
    }

    // Check if the todo exists
    const todo = await todoModel.findById(id);
    if (!todo) {
      return res.status(404).send({
        success: false,
        message: "No task found with this ID",
      });
    }

    // Check if the authenticated user owns the todo
    if (!todo.createdBy || todo.createdBy.toString() !== req.user._id) {
      return res.status(403).send({
        success: false,
        message: "Unauthorized to delete this task",
      });
    }

    // Delete the task
    await todoModel.findByIdAndDelete(id);

    return res.status(200).send({
      success: true,
      message: "Your task has been deleted",
    });
  } catch (error) {
    console.error("Delete Todo Error:", error);
    return res.status(500).send({
      success: false,
      message: "Error in Delete Todo API",
      error: error.message,
    });
  }
};


// UPDATE TODO
const updateTodoController = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (!id || id.length !== 24) {
      return res.status(400).send({
        success: false,
        message: "Invalid or missing task ID",
      });
    }

    const todo = await todoModel.findById(id);

    if (!todo) {
      return res.status(404).send({
        success: false,
        message: "No task found to update",
      });
    }

    // 🛡️ Ownership check
    if (!todo.createdBy || todo.createdBy.toString() !== req.user._id) {
      return res.status(403).send({
        success: false,
        message: "Forbidden: You are not allowed to update this task",
      });
    }

    // Perform update
    const updatedTodo = await todoModel.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: "Your task has been updated",
      todo: updatedTodo,
    });
  } catch (error) {
    console.error("Update Todo Error:", error);
    res.status(500).send({
      success: false,
      message: "Error in Update Todo API",
      error: error.message,
    });
  }
};


module.exports = {
  createTodoController,
  getTodoController,
  deleteTodoController,
  updateTodoController,
};
