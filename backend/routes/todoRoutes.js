const express = require("express");
const {
  createTodoController,
  getTodoController,
  deleteTodoController,
  updateTodoController,
} = require("../controllers/todoController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();


router.post("/create", authMiddleware, createTodoController);


router.get("/user/:userId", authMiddleware, getTodoController);


router.delete("/delete/:id", authMiddleware, deleteTodoController);


router.put("/update/:id", authMiddleware, updateTodoController);

module.exports = router;
