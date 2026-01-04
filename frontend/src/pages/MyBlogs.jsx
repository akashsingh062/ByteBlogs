import React, { useContext, useEffect, useState } from "react";
import { BlogContext } from "../context/BlogContext";

import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const MyBlogs = () => {
  const navigate = useNavigate();
  const { getAllBlogs, token, backendUrl } = useContext(BlogContext);
  const [myBlog, setMyBlog] = useState([]);

  const stripHtml = (html) => {
    return html.replace(/<[^>]*>?/gm, "");
  };

  const getMyBlogs = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/blog/my-blog", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.success) {
        setMyBlog([...data.myBlogs].reverse());
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handelDelete = async (id) => {
    try {
      const { data } = await axios.delete(backendUrl + "/api/blog/delete", {
        headers: { Authorization: `Bearer ${token}` },
        data: { blogId: id },
      });
      if (data.success) {
        setMyBlog((prev) => prev.filter((blog) => blog._id !== id));
        toast.success(data.message);
        getAllBlogs();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      getMyBlogs();
    }
  }, [token]);

  return (
    <div className="my-8 mx-4 sm:mx-6 md:mx-10 lg:mx-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 px-2 sm:px-4 md:px-6 lg:px-10">
      {myBlog.length === 0 && (
        <div className="col-span-full text-center text-gray-500 py-16">
          You haven’t written any blogs yet.
        </div>
      )}
      {myBlog.map((item) => (
        <div
          key={item._id}
          className="border rounded-lg overflow-hidden bg-white transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg flex flex-col h-full"
        >
          <img
            onClick={() => navigate(`/blog/${item._id}`)}
            className="w-full h-48 object-cover cursor-pointer"
            src={item.image}
            alt={item.title}
          />

          <div
            className="flex items-center m-3"
            onClick={() => navigate(`/blog/${item._id}`)}
          >
            <p className="px-1.5 py-1 rounded-sm bg-black text-white text-[10px] cursor-pointer">
              {item.category}
            </p>
          </div>

          <div
            onClick={() => navigate(`/blog/${item._id}`)}
            className="m-3 cursor-pointer flex-1"
          >
            <h2 className="text-base sm:text-lg font-semibold mb-3">
              {item.title}
            </h2>
            <p className="text-sm text-gray-600 line-clamp-3">
              {stripHtml(item.description)}
            </p>
          </div>

          <div className="flex justify-between items-center gap-2 px-3 pb-4 mt-auto">
            <button
              onClick={() => navigate(`/blog/${item._id}`)}
              className="group flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold 
bg-gray-100 text-gray-800 
hover:bg-black hover:text-white 
transition-colors duration-200"
            >
              Read more
              <img
                className="w-3 h-3 transition-filter duration-200 group-hover:invert"
                src={assets.arrow}
                alt="arrow"
              />
            </button>
            <button
              onClick={() => navigate(`/edit/${item._id}`)}
              className="px-4 py-2 rounded-full text-xs font-semibold 
bg-blue-100 text-blue-700 
hover:bg-blue-600 hover:text-white 
transition-colors duration-200"
            >
              Edit
            </button>
            <button
              onClick={() => handelDelete(item._id)}
              className="px-4 py-2 rounded-full text-xs font-semibold 
bg-red-100 text-red-700 
hover:bg-red-600 hover:text-white 
transition-colors duration-200"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyBlogs;
