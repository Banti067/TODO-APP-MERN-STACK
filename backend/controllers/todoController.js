const todoModel = require("../models/todoModels");

// CREATE TODO
const createTodoController = async (req, res) => {
  try {
    const { title, description } = req.body;
    const createdBy = req.user._id; // ✅ use from JWT

    if (!title || !description) {
      return res.status(400).send({
        success: false,
        message: "Please provide title and description",
      });
    }

    const todo = new todoModel({ title, description, createdBy });
    const result = await todo.save();

    res.status(201).send({
      success: true,
      message: "Your task has been created",
      result,
    });
  } catch (error) {
    console.error("Create Todo Error:", error); // 👈 This logs in server console

    res.status(500).send({
      success: false,
      message: "Error in Create Todo API",
      error: error.message, // 👈 Show actual error
    });
  }
};


// GET TODOS FOR USER
const getTodoController = async (req, res) => {
  try {
    const { userId } = req.params;

    // Secure check - ensure authenticated user matches request
    if (req.user._id !== userId) {
      return res.status(403).send({
        success: false,
        message: "Forbidden: You cannot access other users' todos",
      });
    }

    const todos = await todoModel.find({ createdBy: userId });

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
      error,
    });
  }
};

// DELETE TODO
const deleteTodoController = async (req, res) => {
  try {
    const { id } = req.params;

    const todo = await todoModel.findByIdAndDelete(id);

    if (!todo) {
      return res.status(404).send({
        success: false,
        message: "No task found with this ID",
      });
    }

    res.status(200).send({
      success: true,
      message: "Your task has been deleted",
    });
  } catch (error) {
    console.error("Delete Todo Error:", error);
    res.status(500).send({
      success: false,
      message: "Error in Delete Todo API",
      error,
    });
  }
};

// UPDATE TODO
const updateTodoController = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const todo = await todoModel.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true }
    );

    if (!todo) {
      return res.status(404).send({
        success: false,
        message: "No task found to update",
      });
    }

    res.status(200).send({
      success: true,
      message: "Your task has been updated",
      todo,
    });
  } catch (error) {
    console.error("Update Todo Error:", error);
    res.status(500).send({
      success: false,
      message: "Error in Update Todo API",
      error,
    });
  }
};

module.exports = {
  createTodoController,
  getTodoController,
  deleteTodoController,
  updateTodoController,
};
