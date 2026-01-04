import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BlogContext } from "../context/BlogContext";

const Blog = () => {
  const { data } = useContext(BlogContext);
  const { blogId } = useParams();

  const [blogData, setBlogData] = useState(null);

  useEffect(() => {
    if (blogId && data.length) {
      const foundBlog = data.find(
        (blog) => String(blog._id) === String(blogId)
      );
      setBlogData(foundBlog);
    }
  }, [blogId, data]);

  if (!blogData) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center text-gray-600">
        Loading blog...
      </div>
    );
  }
  return (
    <div className="min-h-screen py-12 sm:py-16
bg-white
bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.05)_1px,transparent_0)] bg-size-[24px_24px]">
      {/* Title + Author */}
      <div className="max-w-3xl mx-auto flex flex-col items-center px-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center bg-linear-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent">
          {blogData.title}
        </h1>

        <img
          className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 mt-6 ring-2 ring-gray-300 ring-offset-2 rounded-full object-cover"
          src={blogData.author_img}
          alt={blogData.author}
        />

        <p className="mt-3 text-gray-600 text-sm sm:text-base">
          {blogData.author}
        </p>
      </div>

      {/* Blog Image */}
      <div className="mt-10">
        <div className="max-w-5xl mx-auto bg-linear-to-br from-white to-gray-50 rounded-xl p-3 sm:p-4 shadow-lg">
          <img
            className="w-full aspect-video object-cover rounded-lg"
            src={blogData.image}
            alt={blogData.title}
          />
        </div>
      </div>

      {/* Description */}
      <div
        id="blog"
        className="max-w-3xl mx-auto mt-12 px-4 prose prose-gray prose-p:text-gray-700 prose-strong:text-gray-900"
        dangerouslySetInnerHTML={{ __html: blogData.description }}
      />
    </div>
  );
};

export default Blog;
