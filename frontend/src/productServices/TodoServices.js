// src/productServices/TodoServices.js
import axios from "../utils/axiosConfig"; // ✅ Use the configured instance

export const createTodo = (data) => {
  return axios.post("/todo/create", data);
};

export const getAllTodos = (userId) => {
  return axios.get(`/todo/user/${userId}`);
};

export const updateTodo = (id, data) => {
  return axios.put(`/todo/${id}`, data);
};

export const deleteTodo = (id) => {
  return axios.delete(`/todo/${id}`);
};
