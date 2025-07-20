import React, { useState, useEffect } from "react";
import {
  createTodo,
  getAllTodos,
  updateTodo,
  deleteTodo,
} from "../../productServices/TodoServices";
import {
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Slide,
} from "@mui/material";

const SlideTransition = (props) => {
  return <Slide {...props} direction="up" />;
};

const TodoCard = () => {
  const user = JSON.parse(localStorage.getItem("todoapp"))?.user;
  const userId = user?.id;

  const [todos, setTodos] = useState([]);
  const [todoInput, setTodoInput] = useState({ title: "", description: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [confirmDeleteDialog, setConfirmDeleteDialog] = useState({
    open: false,
    id: null,
  });

  useEffect(() => {
    if (userId) fetchTodos();
  }, [userId]);

  const showMessage = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false });

  const handleAddOrUpdate = async (e) => {
    e.preventDefault();
    const { title, description } = todoInput;
    if (!title.trim()) return;

    try {
      if (isEditing) {
        await updateTodo(editingId, { title, description });
        showMessage(" Todo updated successfully!");
      } else {
        await createTodo({
          title,
          description,
          isCompleted: false,
          createdBy: userId,
        });
        showMessage("📝 New todo created!");
      }
      setTodoInput({ title: "", description: "" });
      setIsEditing(false);
      setEditingId(null);
      fetchTodos();
    } catch (err) {
      showMessage(" Error saving todo", "error");
      console.error(err.message);
    }
  };

  const fetchTodos = async () => {
    setLoading(true);
    try {
      const res = await getAllTodos(userId);
      setTodos(res.data?.todos || []);
    } catch (err) {
      showMessage(" Failed to fetch todos", "error");
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (todo) => {
    setTodoInput({ title: todo.title, description: todo.description });
    setIsEditing(true);
    setEditingId(todo._id);
  };

  const handleConfirmDelete = (id) => {
    setConfirmDeleteDialog({ open: true, id });
  };

  const handleDelete = async () => {
    try {
      await deleteTodo(confirmDeleteDialog.id);
      showMessage(" Todo deleted!");
      fetchTodos();
    } catch (err) {
      showMessage(" Delete failed", "error");
      console.error(err.message);
    } finally {
      setConfirmDeleteDialog({ open: false, id: null });
    }
  };

  const toggleCompletion = async (todo) => {
    try {
      await updateTodo(todo._id, {
        title: todo.title,
        description: todo.description,
        isCompleted: !todo.isCompleted,
      });
      showMessage(" Todo status updated");
      fetchTodos();
    } catch (err) {
      showMessage(" Failed to update status", "error");
      console.error(err.message);
    }
  };

  const incompleteTodos = todos.filter((t) => !t.isCompleted);
  const completedTodos = todos.filter((t) => t.isCompleted);

  return (
    <div className="bg-gradient-to-br from-pink-100 via-white to-cyan-100 p-6 rounded-xl shadow-2xl max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Your Todo List
      </h2>

      <form
        onSubmit={handleAddOrUpdate}
        className="space-y-4 mb-8 bg-white p-4 rounded-lg shadow"
      >
        <div>
          <label className="block text-sm font-semibold mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={todoInput.title}
            onChange={(e) =>
              setTodoInput({ ...todoInput, title: e.target.value })
            }
            placeholder="What's your task?"
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-pink-400"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">
            Description
          </label>
          <textarea
            name="description"
            value={todoInput.description}
            onChange={(e) =>
              setTodoInput({ ...todoInput, description: e.target.value })
            }
            placeholder="Describe your task..."
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-pink-400"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded shadow-sm"
        >
          {isEditing ? "Update Todo ✏️" : "Add Todo "}
        </button>
      </form>

      {loading ? (
        <div className="text-center text-sm text-gray-500 py-6">
          ⏳ Loading tasks...
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <section className="bg-white p-4 rounded-xl shadow">
            <h3 className="text-pink-700 text-lg font-bold mb-3">
               Incomplete Tasks
            </h3>
            {incompleteTodos.length === 0 ? (
              <p className="text-sm text-gray-500">No pending tasks 🎉</p>
            ) : (
              <ul className="space-y-3">
                {incompleteTodos.map((todo) => (
                  <li
                    key={todo._id}
                    className="bg-pink-50 p-4 rounded shadow flex justify-between items-start"
                  >
                    <div>
                      <h4 className="text-md font-semibold text-gray-800">
                        {todo.title}
                      </h4>
                      <p className="text-sm text-gray-600">{todo.description}</p>
                    </div>
                    <div className="flex flex-col gap-2 ml-4">
                      <button
                        onClick={() => handleEdit(todo)}
                        className="bg-yellow-400 hover:bg-yellow-500 text-white text-xs px-3 py-1 rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => toggleCompletion(todo)}
                        className="bg-green-500 hover:bg-green-600 text-white text-xs px-3 py-1 rounded"
                      >
                        Complete
                      </button>
                      <button
                        onClick={() => handleConfirmDelete(todo._id)}
                        className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section className="bg-white p-4 rounded-xl shadow">
            <h3 className="text-green-700 text-lg font-bold mb-3">
               Completed Tasks
            </h3>
            {completedTodos.length === 0 ? (
              <p className="text-sm text-gray-500">
                No completed tasks yet 🚀
              </p>
            ) : (
              <ul className="space-y-3">
                {completedTodos.map((todo) => (
                  <li
                    key={todo._id}
                    className="bg-green-100 p-4 rounded shadow flex justify-between items-start"
                  >
                    <div>
                      <h4 className="text-md font-semibold text-gray-800 line-through">
                        {todo.title}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {todo.description}
                      </p>
                    </div>
                    <div className="flex flex-col gap-2 ml-4">
                      <button
                        onClick={() => toggleCompletion(todo)}
                        className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-3 py-1 rounded"
                      >
                        Mark Incomplete
                      </button>
                      <button
                        onClick={() => handleConfirmDelete(todo._id)}
                        className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      )}

      {/* Snackbar for status */}
      <Snackbar
        open={snackbar.open}
        onClose={handleCloseSnackbar}
        autoHideDuration={2500}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        TransitionComponent={SlideTransition}
      >
        <Alert
          severity={snackbar.severity}
          onClose={handleCloseSnackbar}
          sx={{ width: "100%", borderRadius: 2 }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

      {/* Custom Dialog */}
      <Dialog
        open={confirmDeleteDialog.open}
        onClose={() => setConfirmDeleteDialog({ open: false, id: null })}
        TransitionComponent={SlideTransition}
        keepMounted
        PaperProps={{
          sx: {
            borderRadius: 4,
            background: "linear-gradient(to bottom right, #ffe4e6, #f0f9ff)",
            boxShadow: 10,
            px: 3,
            py: 2,
          },
        }}
      >
        <DialogTitle
          sx={{
            fontWeight: "bold",
            color: "#b91c1c",
            display: "flex",
            alignItems: "center",
            gap: 1,
            fontSize: "1.25rem",
          }}
        >
          ⚠️ Confirm Deletion
        </DialogTitle>
        <DialogContent sx={{ py: 1 }}>
          <p className="text-sm text-gray-700">
            This action will <strong>permanently delete</strong> your task.
            Are you sure you want to continue?
          </p>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "space-between", pt: 2 }}>
          <Button
            onClick={() => setConfirmDeleteDialog({ open: false, id: null })}
            sx={{
              backgroundColor: "#e0f2fe",
              color: "#0369a1",
              "&:hover": { backgroundColor: "#bae6fd" },
              fontWeight: 500,
              px: 3,
            }}
          >
            ❌ Cancel
          </Button>
          <Button
            onClick={handleDelete}
            sx={{
              backgroundColor: "#fecaca",
              color: "#b91c1c",
              "&:hover": { backgroundColor: "#f87171" },
              fontWeight: 500,
              px: 3,
            }}
          >
             Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TodoCard;
