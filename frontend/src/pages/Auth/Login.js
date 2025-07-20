import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthServices from "../../productServices/AuthSerives";
import toast from "react-hot-toast";
import { getErrorMessage } from "../../utils/ErrorMessage";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginHandler = async (e) => {
    try {
      e.preventDefault();
      const data = { email, password };
      const res = await AuthServices.loginUser(data);
     toast.success(res.data.message);
    // ✅ Save user data first
    localStorage.setItem("todoapp", JSON.stringify(res.data));
    // ✅ Then navigate
    navigate("/dashboard");
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] px-4 py-12">
      <form
        onSubmit={loginHandler}
        className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-full max-w-md text-white space-y-5 border border-white/10"
      >
        <div className="flex justify-center text-5xl text-yellow-400 mb-4">
          <i className="fa-solid fa-circle-user" />
        </div>

        <input
          type="email"
          placeholder="Enter email"
          className="w-full px-4 py-3 rounded-xl bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder:text-gray-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Enter password"
          className="w-full px-4 py-3 rounded-xl bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder:text-gray-400"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full py-3 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded-xl transition"
        >
          LOGIN
        </button>

        <p className="text-center text-sm mt-2">
          Not a user?
          <Link to="/register" className="text-yellow-400 hover:underline ml-1">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
