import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthServices from "../../productServices/AuthSerives";
import { toast } from "react-hot-toast";
import { getErrorMessage } from "../../utils/ErrorMessage";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const registerHandler = async (e) => {
    try {
      e.preventDefault();
      const data = { email, password, username };
      const res = await AuthServices.registerUser(data);
      toast.success(res.data.message);
       localStorage.setItem("todoapp", JSON.stringify(res.data));
      navigate("/login");
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] px-4 py-12">
      <form
        onSubmit={registerHandler}
        className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-full max-w-md text-white space-y-5 border border-white/10"
      >
        <div className="flex justify-center text-5xl text-yellow-400 mb-4">
          <i className="fa-solid fa-circle-user" />
        </div>

        <input
          type="text"
          placeholder="Enter username"
          className="w-full px-4 py-3 rounded-xl bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder:text-gray-400"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

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
          REGISTER
        </button>

        <p className="text-center text-sm mt-2">
          Already have an account?
          <Link to="/login" className="text-yellow-400 hover:underline ml-1">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
