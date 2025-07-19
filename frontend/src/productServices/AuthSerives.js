import axios from "axios";

// Use full backend API URL
const API = import.meta.env.MODE === "development"
  ? "http://localhost:2025"
  : "https://todo-app-mern-stack-prnf.onrender.com";

const registerUser = (data) => {
  console.log("Registering user with data:", data);
  return axios.post(`${API}/api/v1/user/register`, data);
};

const loginUser = (data) => {
  return axios.post(`${API}/api/v1/user/login`, data);
};

const AuthServices = { registerUser, loginUser };

export default AuthServices;
