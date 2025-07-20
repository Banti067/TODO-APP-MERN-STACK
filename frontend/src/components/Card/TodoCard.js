import React, { useState, useEffect } from "react";
import {
  createTodo,
  getAllTodos,
  updateTodo,
  deleteTodo,
} from "../../productServices/TodoServices";
import { toast } from "react-hot-toast";

const TodoCard = () => {
  const user = JSON.parse(localStorage.getItem("todoapp"))?.user;
  const userId = user?.id;

  const [todos, setTodos] = useState([]);
  const [todoInput, setTodoInput] = useState({ title: "", description: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userId) fetchTodos();
  }, [userId]);

  const handleAddOrUpdate = async (e) => {
    e.preventDefault();
    const { title, description } = todoInput;
    if (!title.trim()) return;

    try {
      if (isEditing) {
        await updateTodo(editingId, { title, description });
        toast.success("Todo updated!");
      } else {
        await createTodo({ title, description, isCompleted: false, createdBy: userId });
        toast.success("Todo created!");
      }
      setTodoInput({ title: "", description: "" });
      setIsEditing(false);
      setEditingId(null);
      fetchTodos();
    } catch (err) {
      toast.error("Error saving todo");
      console.error(err.message);
    }
  };

  const fetchTodos = async () => {
    setLoading(true);
    try {
      const res = await getAllTodos(userId);
      setTodos(res.data?.todos || []);
    } catch (err) {
      toast.error("Failed to fetch todos");
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

  const handleDelete = async (id) => {
    try {
      await deleteTodo(id);
      toast.success("Todo deleted!");
      fetchTodos();
    } catch (err) {
      toast.error("Delete failed");
      console.error(err.message);
    }
  };

  const toggleCompletion = async (todo) => {
    try {
      await updateTodo(todo._id, {
        title: todo.title,
        description: todo.description,
        isCompleted: !todo.isCompleted,
      });
      toast.success("Todo status updated");
      fetchTodos();
    } catch (err) {
      toast.error("Failed to update status");
      console.error(err.message);
    }
  };

  const incompleteTodos = todos.filter((t) => !t.isCompleted);
  const completedTodos = todos.filter((t) => t.isCompleted);

  return (
    <div className="bg-gradient-to-br from-pink-100 via-white to-cyan-100 p-6 rounded-xl shadow-2xl max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">🎯 Your Todo List</h2>

      {/* Form */}
      <form onSubmit={handleAddOrUpdate} className="space-y-4 mb-8 bg-white p-4 rounded-lg shadow">
        <div>
          <label className="block text-sm font-semibold mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={todoInput.title}
            onChange={(e) => setTodoInput({ ...todoInput, title: e.target.value })}
            placeholder="What's your task?"
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-pink-400"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Description</label>
          <textarea
            name="description"
            value={todoInput.description}
            onChange={(e) => setTodoInput({ ...todoInput, description: e.target.value })}
            placeholder="Describe your task..."
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-pink-400"
          />
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded shadow-sm">
          {isEditing ? "Update Todo ✏️" : "Add Todo ➕"}
        </button>
      </form>

      {/* Loader */}
      {loading ? (
        <div className="text-center text-sm text-gray-500 py-6">⏳ Loading tasks...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Incomplete */}
          <section className="bg-white p-4 rounded-xl shadow">
            <h3 className="text-pink-700 text-lg font-bold mb-3">📌 Incomplete Tasks</h3>
            {incompleteTodos.length === 0 ? (
              <p className="text-sm text-gray-500">No pending tasks 🎉</p>
            ) : (
              <ul className="space-y-3">
                {incompleteTodos.map((todo) => (
                  <li key={todo._id} className="bg-pink-50 p-4 rounded shadow flex justify-between items-start">
                    <div>
                      <h4 className="text-md font-semibold text-gray-800">{todo.title}</h4>
                      <p className="text-sm text-gray-600">{todo.description}</p>
                    </div>
                    <div className="flex flex-col gap-2 ml-4">
                      <button onClick={() => handleEdit(todo)} className="bg-yellow-400 hover:bg-yellow-500 text-white text-xs px-3 py-1 rounded">
                        Edit
                      </button>
                      <button onClick={() => toggleCompletion(todo)} className="bg-green-500 hover:bg-green-600 text-white text-xs px-3 py-1 rounded">
                        Complete
                      </button>
                      <button onClick={() => handleDelete(todo._id)} className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded">
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>

          {/* Completed */}
          <section className="bg-white p-4 rounded-xl shadow">
            <h3 className="text-green-700 text-lg font-bold mb-3">✅ Completed Tasks</h3>
            {completedTodos.length === 0 ? (
              <p className="text-sm text-gray-500">No completed tasks yet 🚀</p>
            ) : (
              <ul className="space-y-3">
                {completedTodos.map((todo) => (
                  <li key={todo._id} className="bg-green-100 p-4 rounded shadow flex justify-between items-start">
                    <div>
                      <h4 className="text-md font-semibold text-gray-800 line-through">{todo.title}</h4>
                      <p className="text-sm text-gray-600">{todo.description}</p>
                    </div>
                    <div className="flex flex-col gap-2 ml-4">
                      <button onClick={() => toggleCompletion(todo)} className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-3 py-1 rounded">
                        Mark Incomplete
                      </button>
                      <button onClick={() => handleDelete(todo._id)} className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded">
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
    </div>
  );
};

export default TodoCard;
