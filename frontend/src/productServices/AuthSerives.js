import axios from "axios";


const registerUser = (data) => {
   console.log("Registering user with data:", data);
  return axios.post("/api/v1/user/register", data);
};


const loginUser = (data) => {
  return axios.post("/api/v1/user/login", data);
};

const AuthServices = { registerUser, loginUser };

export default AuthServices;