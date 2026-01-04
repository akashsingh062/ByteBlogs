import React from "react";
import { assets } from "../assets/assets.js";
import { useNavigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { BlogContext } from "../context/BlogContext.jsx";
import { toast } from "react-toastify";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    userData,
    setUserData,
    token,
    setToken,
    getAllBlogs,
  } = useContext(BlogContext);

  const handelLogout = () => {
    if (token) {
      setToken("");
      localStorage.removeItem("token");
      toast.success("User Logged out.");
      setUserData({});
      getAllBlogs()
      navigate("/");
    }
  };

  return (
    <div className="flex items-center justify-between px-5 md:px-20 mt-4">
      {/* Logo */}
      <div
        onClick={() => navigate("/")}
        className="cursor-pointer bg-black px-4 py-2 rounded-xl flex items-center"
        aria-label="Go to home"
        role="button"
      >
        <img
          className="w-36 md:w-48"
          src={assets.logo_light}
          alt="logo"
        />
      </div>

      {/* Right section */}
      {!token || !userData ? (
        <div
          onClick={() => navigate("/login")}
          className="flex items-center gap-2 px-4 py-2 rounded-full cursor-pointer border bg-gray-100 text-gray-800 hover:bg-black hover:text-white transition-colors duration-200 group"
        >
          <p className="text-md font-medium">Get Started</p>
          <img
            src={assets.arrow}
            alt="arrow"
            className="w-4 h-4 transition-filter duration-200 group-hover:invert"
          />
        </div>
      ) : (
        <div
          className="relative group flex items-center gap-2 p-1 cursor-pointer rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Open user menu"
          role="button"
        >
          <img
            src={userData.image}
            alt="menu"
            className="w-10 h-10 md:w-14 md:h-14 rounded-full object-cover "
          />
          <div className="absolute right-0 top-16 w-44 bg-white text-gray-700 rounded-lg shadow-lg z-20 hidden group-hover:block">
            <p
              onClick={() => navigate("/")}
              className={`px-4 py-2 cursor-pointer text-sm ${
                location.pathname === "/"
                  ? "bg-gray-100 font-semibold"
                  : "hover:bg-gray-100"
              }`}
            >
              Home
            </p>
            <p
              onClick={() => navigate("/profile")}
              className={`px-4 py-2 cursor-pointer text-sm ${
                location.pathname === "/profile"
                  ? "bg-gray-100 font-semibold"
                  : "hover:bg-gray-100"
              }`}
            >
              My Profile
            </p>
            <p
              onClick={() => navigate("/new-blog")}
              className={`px-4 py-2 cursor-pointer text-sm ${
                location.pathname === "/new-blog"
                  ? "bg-gray-100 font-semibold"
                  : "hover:bg-gray-100"
              }`}
            >
              New Blog
            </p>
            <p
              onClick={handelLogout}
              className="px-4 py-2 cursor-pointer text-red-500 text-sm"
            >
              Logout
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
