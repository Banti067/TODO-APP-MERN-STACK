// src/utils/axiosConfig.js
import axios from "axios";

const instance = axios.create({
  baseURL: "https://todo-app-mern-stack-prnf.onrender.com/api/v1",
});

instance.interceptors.request.use(
  (config) => {
    const token = JSON.parse(localStorage.getItem("todoapp"))?.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
