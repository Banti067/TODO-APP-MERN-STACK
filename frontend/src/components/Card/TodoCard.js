import React, { useState } from "react";

const TodoCard = () => {
  const [todos, setTodos] = useState([]);
  const [todoInput, setTodoInput] = useState({ title: "", description: "" });
  const [isEditing, setIsEditing] = useState(null);

  const handleChange = (e) => {
    setTodoInput({ ...todoInput, [e.target.name]: e.target.value });
  };

  const handleAddOrUpdate = (e) => {
    e.preventDefault();
    if (!todoInput.title.trim()) return;

    if (isEditing !== null) {
      const updated = [...todos];
      updated[isEditing] = { ...todoInput, completed: updated[isEditing].completed };
      setTodos(updated);
      setIsEditing(null);
    } else {
      setTodos([...todos, { ...todoInput, completed: false }]);
    }
    setTodoInput({ title: "", description: "" });
  };

  const handleEdit = (index) => {
    const { title, description } = todos[index];
    setTodoInput({ title, description });
    setIsEditing(index);
  };

  const handleDelete = (index) => {
    const updated = todos.filter((_, i) => i !== index);
    setTodos(updated);
    if (isEditing === index) {
      setTodoInput({ title: "", description: "" });
      setIsEditing(null);
    }
  };

  const toggleCompletion = (index) => {
    const updated = [...todos];
    updated[index].completed = !updated[index].completed;
    setTodos(updated);
  };

  const incompleteTodos = todos.filter((t) => !t.completed);
  const completeTodos = todos.filter((t) => t.completed);

  return (
    <div className="bg-gradient-to-br from-pink-100 via-white to-cyan-100 p-6 rounded-xl shadow-2xl max-w-4xl mx-auto">
      <h2 className="title mb-6 text-center">🎯 Your Todo List</h2>

      {/* Form */}
      <form onSubmit={handleAddOrUpdate} className="space-y-4 mb-8 bg-white p-4 rounded-lg shadow">
        <div>
          <label className="block text-sm font-semibold mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={todoInput.title}
            onChange={handleChange}
            placeholder="What's your task?"
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Description</label>
          <textarea
            name="description"
            value={todoInput.description}
            onChange={handleChange}
            placeholder="Describe your task..."
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-primary"
          />
        </div>
        <button type="submit" className="btn-primary px-5 py-2 text-sm">
          {isEditing !== null ? "Update Todo ✏️" : "Add Todo ➕"}
        </button>
      </form>

     {/* Two-Column Layout */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  {/* 📌 Incomplete Tasks */}
  <section className="bg-white p-4 rounded-xl shadow">
    <h3 className="sub-title mb-3 text-pink-700 text-lg font-bold">📌 Incomplete Tasks</h3>
    {incompleteTodos.length === 0 ? (
      <p className="text-sm text-gray-500">No pending tasks 🎉</p>
    ) : (
      <ul className="space-y-3">
        {incompleteTodos.map((todo, index) => {
          const actualIndex = todos.findIndex(t => t === todo);
          return (
            <li key={actualIndex} className="bg-pink-50 p-4 rounded shadow flex justify-between items-start">
              <div>
                <h4 className="text-md font-semibold text-gray-800">{todo.title}</h4>
                <p className="text-sm text-gray-600">{todo.description}</p>
              </div>
              <div className="flex flex-col gap-2 ml-4">
                <button onClick={() => handleEdit(actualIndex)} className="bg-yellow-400 hover:bg-yellow-500 text-white text-xs px-3 py-1 rounded">
                  Edit
                </button>
                <button onClick={() => toggleCompletion(actualIndex)} className="bg-green-500 hover:bg-green-600 text-white text-xs px-3 py-1 rounded">
                  Complete
                </button>
                <button onClick={() => handleDelete(actualIndex)} className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded">
                  Delete
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    )}
  </section>

  {/* ✅ Completed Tasks */}
  <section className="bg-white p-4 rounded-xl shadow">
    <h3 className="sub-title mb-3 text-green-700 text-lg font-bold">✅ Completed Tasks</h3>
    {completeTodos.length === 0 ? (
      <p className="text-sm text-gray-500">No completed tasks yet 🚀</p>
    ) : (
      <ul className="space-y-3">
        {completeTodos.map((todo, index) => {
          const actualIndex = todos.findIndex(t => t === todo);
          return (
            <li key={actualIndex} className="bg-green-100 p-4 rounded shadow flex justify-between items-start">
              <div>
                <h4 className="text-md font-semibold text-gray-800 line-through">{todo.title}</h4>
                <p className="text-sm text-gray-600">{todo.description}</p>
              </div>
              <div className="flex flex-col gap-2 ml-4">
                <button onClick={() => toggleCompletion(actualIndex)} className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-3 py-1 rounded">
                  Mark Incomplete
                </button>
                <button onClick={() => handleDelete(actualIndex)} className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded">
                  Delete
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    )}
  </section>
</div>

    </div>
  );
};

export default TodoCard;
