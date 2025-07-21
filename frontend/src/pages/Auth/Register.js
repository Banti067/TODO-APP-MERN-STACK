import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthServices from "../../productServices/AuthSerives";
import { getErrorMessage } from "../../utils/ErrorMessage";
import BounceDialog from "../../components/BounceDialog";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false); 
  const [popup, setPopup] = useState({
    open: false,
    isSuccess: false,
    message: "",
  });

  const navigate = useNavigate();

  const registerHandler = async (e) => {
    e.preventDefault();
    setLoading(true); 
    try {
      const data = { email, password, username };
      const res = await AuthServices.registerUser(data);
      localStorage.setItem("todoapp", JSON.stringify(res.data));
      setPopup({
        open: true,
        isSuccess: true,
        message: `Welcome, ${username}!`,
      });
    } catch (err) {
      const isConflict = err?.response?.status === 409;
      setPopup({
        open: true,
        isSuccess: false,
        message: isConflict
          ? "User already exists. Try a different email."
          : getErrorMessage(err),
      });
    } finally {
      setLoading(false); 
    }
  };

  const handlePopupClose = () => {
    setPopup({ ...popup, open: false });
    if (popup.isSuccess) navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] px-4 py-12">
      {/* ✅ Popup */}
      <BounceDialog
        open={popup.open}
        onClose={handlePopupClose}
        onAction={handlePopupClose}
        isSuccess={popup.isSuccess}
        message={popup.message}
        buttonText={popup.isSuccess ? "Go to Login" : "Try Again"}
      />

      {/* ✅ Register Form */}
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
          className="w-full py-3 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded-xl transition flex items-center justify-center"
          disabled={loading}
        >
          {loading ? (
            <>
              <svg
                className="animate-spin h-5 w-5 mr-2 text-black"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                />
              </svg>
              Registering...
            </>
          ) : (
            "REGISTER"
          )}
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
