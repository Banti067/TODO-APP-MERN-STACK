import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white py-8 mt-12 shadow-inner">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {/* Column 1 */}
        <div>
          <h3 className="text-lg font-bold mb-3">My ToDo App</h3>
          <p className="text-sm text-gray-200">
            Organize your life, one task at a time. Built with ❤️ using the MERN stack.
          </p>
        </div>

        {/* Column 2 - Navigation */}
        <div>
          <h3 className="text-lg font-bold mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/home" className="hover:text-yellow-300 transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/todoList" className="hover:text-yellow-300 transition">
                My Todo List
              </Link>
            </li>
            <li>
              <Link to="/login" className="hover:text-yellow-300 transition">
                Sign In
              </Link>
            </li>
            <li>
              <Link to="/register" className="hover:text-yellow-300 transition">
                Sign Up
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3 - Socials */}
        <div>
          <h3 className="text-lg font-bold mb-3">Connect with me</h3>
          <div className="flex space-x-4 text-2xl">
            <a href="https://github.com/" target="_blank" rel="noreferrer" className="hover:text-yellow-300">
              <i className="fab fa-github" />
            </a>
            <a href="https://linkedin.com/" target="_blank" rel="noreferrer" className="hover:text-yellow-300">
              <i className="fab fa-linkedin" />
            </a>
            <a href="mailto:youremail@example.com" className="hover:text-yellow-300">
              <i className="fas fa-envelope" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="text-center text-sm text-gray-300 mt-8 border-t border-indigo-400 pt-4">
        © {new Date().getFullYear()} My ToDo App. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
