import React, { useState } from "react";

const TodoCard = () => {
  const [todos, setTodos] = useState([]);
  const [todoInput, setTodoInput] = useState({ title: "", description: "" });
  const [isEditing, setIsEditing] = useState(null); // index of editing item

  const handleChange = (e) => {
    setTodoInput({ ...todoInput, [e.target.name]: e.target.value });
  };

  const handleAddOrUpdate = (e) => {
    e.preventDefault();

    if (!todoInput.title.trim()) return;

    if (isEditing !== null) {
      const updated = [...todos];
      updated[isEditing] = todoInput;
      setTodos(updated);
      setIsEditing(null);
    } else {
      setTodos([...todos, todoInput]);
    }

    setTodoInput({ title: "", description: "" });
  };

  const handleEdit = (index) => {
    setTodoInput(todos[index]);
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

  return (
    <div className="bg-gray-100 rounded-lg p-6 shadow-md w-full">
      <h2 className="sub-title mb-4">Todo List</h2>

      {/* Form */}
      <form onSubmit={handleAddOrUpdate} className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={todoInput.title}
            onChange={handleChange}
            placeholder="Enter title"
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={todoInput.description}
            onChange={handleChange}
            placeholder="Enter description"
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
          ></textarea>
        </div>
        <button type="submit" className="btn-primary px-4 py-2 text-sm text-white">
          {isEditing !== null ? "Update Todo" : "Add Todo"}
        </button>
      </form>

      {/* Todo Items */}
      {todos.length === 0 ? (
        <p className="description text-gray-500">No todos yet. Add one above!</p>
      ) : (
        <ul className="space-y-4">
          {todos.map((todo, index) => (
            <li key={index} className="bg-white p-4 rounded shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800">{todo.title}</h3>
              <p className="text-sm text-gray-600">{todo.description}</p>
              <div className="mt-3 flex gap-2">
                <button
                  onClick={() => handleEdit(index)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded text-xs"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(index)}
                  className="bg-red-500 text-white px-3 py-1 rounded text-xs"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TodoCard;
