import React from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";


const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white py-8 mt-12 shadow-inner">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2  gap-6">
       
        <div>
          <h3 className="text-lg font-bold mb-3">My ToDo App</h3>
          <p className="text-sm text-gray-200">
            Organize your life, one task at a time. Built with ❤️ using the MERN stack.
          </p>
        </div>

        

        
        <div className="flex space-x-4 text-2xl">
          <h3 className="text-lg font-bold mb-3">Connect with me</h3>
  <a href="https://github.com/Banti067" target="_blank" rel="noreferrer" className="hover:text-yellow-300">
    <FaGithub />
  </a>
  <a href="https://www.linkedin.com/in/p-banti/" target="_blank" rel="noreferrer" className="hover:text-yellow-300">
    <FaLinkedin />
  </a>
  <a href="mailto:youremail@example.com" className="hover:text-yellow-300">
    <FaEnvelope />
  </a>
</div>
      </div>

      <div className="text-center text-sm text-gray-300 mt-8 border-t border-indigo-400 pt-4">
        © {new Date().getFullYear()} P Banti My ToDo App. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
