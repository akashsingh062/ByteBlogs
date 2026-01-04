import { useContext, useEffect, useState } from "react";

import BlogCard from "./BlogCard.jsx";
import { BlogContext } from "../context/BlogContext.jsx";

const BlogPost = () => {
  const [speciality, setSpeciality] = useState("");
  const { filterBlog, setFilterBlog, data, setData } = useContext(BlogContext);

  const applyFilter = () => {
    if (!Array.isArray(data)) {
      setFilterBlog([]);
      return;
    }
    if (speciality) {
      setFilterBlog(data.filter((item) => item.category === speciality));
    } else {
      setFilterBlog(data);
    }
  };

  useEffect(() => {
    applyFilter();
  }, [speciality, data]);

  const categories = ["", "Technology", "Startup", "Lifestyle"];
  return (
    <div>
      <div className="flex justify-center items-center gap-3 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat || "all"}
            onClick={() => setSpeciality(cat)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium
              transition-colors duration-200
              ${
                speciality === cat
                  ? "bg-black text-white"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }`}
          >
            {cat || "All"}
          </button>
        ))}
      </div>
      <BlogCard />
    </div>
  );
};

export default BlogPost;
