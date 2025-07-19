import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const PublicLayout = ({ children, title = "My ToDo App", description }) => {
  React.useEffect(() => {
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
    <>
      <div className="w-full min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-100 text-gray-800">
        <Navbar />
        <main className="px-4 py-6 sm:px-8">{children}</main>
        <Footer />
      </div>
    </>
  );
};

export default PublicLayout;
