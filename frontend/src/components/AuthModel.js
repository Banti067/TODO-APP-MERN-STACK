import React, { useState } from "react";
import toast from "react-hot-toast";

const AuthModal = ({ mode = "login", showModal, setShowModal }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleClose = () => {
    setShowModal(false);
  };

  const handleSubmit = () => {
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    if (mode === "login") {
      // call login API here
      toast.success("Logged in successfully");
    } else {
      // call register API here
      toast.success("Registered successfully");
    }

    setShowModal(false);
  };

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">
                {mode === "login" ? "Sign In" : "Sign Up"}
              </h2>
              <button onClick={handleClose} className="text-gray-500 hover:text-black">
                &times;
              </button>
            </div>
            <div className="space-y-4">
              <input
                type="email"
                placeholder="Email"
                className="w-full border p-2 rounded"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full border p-2 rounded"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                onClick={handleSubmit}
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              >
                {mode === "login" ? "Login" : "Register"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AuthModal;
