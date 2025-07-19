import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Navbar = () => {
  const [username, setUsername] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("todoapp"));
    setUsername(userData?.user?.username || "");
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem("todoapp");
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <nav className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-5 flex justify-between items-center text-white">
        <Link to="/">
  <h2 className="text-xl font-bold tracking-wide flex items-center gap-2 cursor-pointer">
    <i className="fa-solid fa-clipboard-list"></i> My ToDo App
  </h2>
</Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 font-medium items-center">

          {!username ? (
            <>
              <li>
                <Link
                  to="/login"
                  className="bg-white text-purple-700 px-4 py-1.5 rounded-full hover:bg-yellow-300 transition"
                >
                  Sign In
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="border border-white px-4 py-1.5 rounded-full hover:bg-white hover:text-purple-700 transition"
                >
                  Sign Up
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className="text-sm italic">
                Welcome, <strong>{username}</strong>
              </li>
              <li>
                <button
                  onClick={logoutHandler}
                  title="Logout"
                  className="text-red-300 hover:text-white transition"
                >
                  <i className="fa-solid fa-power-off text-xl" />
                </button>
              </li>
            </>
          )}
        </ul>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            <i className="fa-solid fa-bars text-xl" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-indigo-700 px-4 pb-4 text-white">
          <ul className="space-y-3">
            {!username ? (
              <>
                <li>
                  <Link to="/login" onClick={() => setMenuOpen(false)}>
                    Sign In
                  </Link>
                </li>
                <li>
                  <Link to="/register" onClick={() => setMenuOpen(false)}>
                    Sign Up
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <span className="italic">Welcome, {username}</span>
                </li>
                <li>
                  <button
                    onClick={() => {
                      logoutHandler();
                      setMenuOpen(false);
                    }}
                    className="text-red-300 hover:text-white transition"
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
