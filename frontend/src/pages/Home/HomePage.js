import React from "react";
import { Link } from "react-router-dom";
import Hero from "../../assets/hero.jpg"; 

const Landing = () => {
  return (
    <section className="bg-gradient-to-b from-indigo-50 via-white to-pink-50">
      <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-8 px-6 py-12 lg:py-20">
        {/* ⬅️  Text block */}
        <div className="w-full lg:w-1/2 space-y-6">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-800 leading-tight">
            <span className="block text-indigo-600">Take control of your time,</span>
            <span className="block text-pink-600">Master your day. </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-600">
           Got something to do? Just type it —&nbsp;
          <strong className="text-purple-600">TodoList</strong>&nbsp;
           instantly figures it out and adds it to your list.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              to="/register"
              className="btn-gradient py-3 px-6 text-white rounded-md hover:opacity-90 transition common-transition"
            >
              Register Now!
            </Link>
            <Link
              to="/login"
              className="bg-white text-purple-700 border border-purple-600 py-3 px-6 rounded-md hover:bg-purple-50 transition common-transition"
            >
              Login
            </Link>
          </div>
        </div>

        {/* ⮕  Image block */}
        <div className="w-full lg:w-1/2">
          <img
            src={Hero}
            alt="Productivity illustration"
            className="rounded-xl shadow-lg w-full h-[350px] lg:h-[450px] object-cover"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
};

export default Landing;
