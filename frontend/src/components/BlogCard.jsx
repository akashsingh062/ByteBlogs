import React, { useContext } from "react";
import { BlogContext } from "../context/BlogContext";
import { assets } from "../assets/assets.js";
import { useNavigate } from "react-router-dom";

const BlogCard = () => {
  const navigate = useNavigate();
  const { filterBlog } = useContext(BlogContext);
  const stripHtml = (html) => {
    return html.replace(/<[^>]*>?/gm, "");
  };

  return (
    <div className="my-8 mx-4 sm:mx-6 md:mx-10 lg:mx-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 px-2 sm:px-4 md:px-6 lg:px-10">
      {filterBlog.map((item) => (
        <div
          key={item._id}
          onClick={() => {
            navigate(`/blog/${item._id}`);
            scrollTo(0, 0);
          }}
          className="cursor-pointer border rounded-lg overflow-hidden bg-white
           transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg
           flex flex-col h-full"
        >
          <img
            className="w-full h-48 object-cover"
            src={item.image}
            alt={item.title}
          />

          <div className="flex items-center m-3">
            <p className="px-1.5 py-1 rounded-sm bg-black text-white text-[10px]">
              {item.category}
            </p>
          </div>

          <div className="m-3 flex-1">
            <h2 className="text-base sm:text-lg font-semibold mb-3">
              {item.title}
            </h2>
            <p className="text-sm text-gray-600 line-clamp-3">
              {stripHtml(item.description)}
            </p>
          </div>

          <button className="group flex items-center justify-center gap-2 mx-3 mb-4 px-4 py-2 rounded-full text-xs font-semibold bg-gray-100 text-gray-800 hover:bg-black hover:text-white transition-colors duration-200">
            Read more
            <img
              className="w-3 h-3 transition-filter duration-200 group-hover:invert"
              src={assets.arrow}
              alt="arrow"
            />
          </button>
        </div>
      ))}
    </div>
  );
};

export default BlogCard;
