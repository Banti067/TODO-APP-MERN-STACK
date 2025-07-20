import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import TodoCard from "../../components/Card/TodoCard";

const Dashboard = () => {
  const navigate = useNavigate();
  const data = JSON.parse(localStorage.getItem("todoapp"));
  const user = data?.user;

  // ✅ Redirect if not logged in
  useEffect(() => {
    if (!user) {
      toast.error("You must be logged in!");
      navigate("/"); // or navigate("/login");
    }
  }, [user, navigate]);

  // ✅ Optional: guard render
  if (!user) return null;

  const handleLogout = () => {
    localStorage.removeItem("todoapp");
    toast.success("Logged out successfully!");
    navigate("/login");
  };

  return (
    <div className="bg-white text-black">
      {/* Navbar */}
      <nav className="bg-gray-100 py-6 shadow-sm">
        <div className="main-container flex justify-between items-center">
          <Link to="/" className="text-xl font-bold text-blue-600">
            MY TODO APP
          </Link>

          <div className="space-x-4 text-sm flex items-center">
            <span className="text-gray-700 font-medium">
              Welcome, {user.username} 👋
            </span>
            <button
              onClick={handleLogout}
              className="btn-primary px-4 py-1 text-white text-sm"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Profile Info Section */}
      <div className="main-container mt-8">
        <div className="flex flex-col md:flex-row justify-between gap-6">
          {/* Left: Todo List Card */}
          <div className="flex-1">
            <TodoCard />
          </div>

          {/* Right: Profile Info Card */}
          <div className="bg-gray-100 rounded-lg p-6 shadow-md w-full md:max-w-sm">
            <h2 className="sub-title mb-2">Profile Info</h2>
            <p className="description mb-1">
              <strong>Username:</strong> {user?.username || "N/A"}
            </p>
            <p className="description">
              <strong>Email:</strong> {user?.email || "N/A"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
