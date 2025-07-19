import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const PublicLayout = ({ title = "My ToDo App", description }) => {
  useEffect(() => {
    document.title = title;
    if (description) {
      const metaDescription = document.querySelector("meta[name='description']");
      if (metaDescription) {
        metaDescription.setAttribute("content", description);
      } else {
        const meta = document.createElement("meta");
        meta.name = "description";
        meta.content = description;
        document.head.appendChild(meta);
      }
    }
  }, [title, description]);

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-100 text-gray-800">
      <Navbar />
      <main className="px-4 py-6 sm:px-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default PublicLayout;
