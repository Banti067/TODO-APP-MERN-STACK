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


router.get("/user/:id", authMiddleware, getTodoController);


router.delete("/:id", authMiddleware, deleteTodoController);


router.put("/:id", authMiddleware, updateTodoController);

module.exports = router;
