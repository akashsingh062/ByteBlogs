import React from "react";
import { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { useContext } from "react";
import { BlogContext } from "../context/BlogContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CreateBlog = () => {
  const { token, backendUrl,getAllBlogs } = useContext(BlogContext);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Technology");
  const [description, setDescription] = useState("");
  const [blogImg, setBlogImg] = useState(false);
  const [disable, setDisable] = useState(false);
  const navigate = useNavigate()

  const handelSubmit = async () => {
    try {
      setDisable(true);
      if (!blogImg) {
        toast.error("Please upload a blog image");
        setDisable(false);
        return;
      }
      const formData = new FormData();
      formData.append("image", blogImg);
      formData.append("title", title);
      formData.append("description", description);
      formData.append("category", category);

      const { data } = await axios.post(
        backendUrl + "/api/blog/add-blog",
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (data.success) {
        toast.success(data.message);
        setTitle("");
        setCategory("Technology");
        setDescription("");
        setBlogImg(false);
        setDisable(false);
        navigate('/profile')
        getAllBlogs()
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handelSubmit();
      }}
    >
      <div className="flex items-center justify-center flex-col ">
        <p className="text-3xl font-semibold text-gray-700 mt-10 mb-10">
          Add new blog
        </p>

        <div className=" px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll ">
          {/* add blog image */}
          <div className="flex items-center gap-4 mb-8 text-gray-500">
            <label htmlFor="blog-img">
              <img
                className="w-16 h-16 object-cover bg-gray-100 rounded-full cursor-pointer"
                src={
                  blogImg
                    ? typeof blogImg === "string"
                      ? blogImg
                      : URL.createObjectURL(blogImg)
                    : assets.upload_area
                }
                alt=""
              />
            </label>
            <input
              onChange={(e) => setBlogImg(e.target.files[0])}
              type="file"
              id="blog-img"
              accept="image/*"
              hidden
            />
            <p>
              Upload blog <br />
              Image
            </p>
          </div>

          {/* add blog title */}
          <div className="flex flex-col m-1 items-start gap-10 text-gray-600">
            <div className="w-full lg:flex-1 flex flex-col gap-4">
              <div className="flex-1 flex flex-col gap-1">
                <p>Blog title</p>
                <input
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                  className="border rounded px-3 py-2"
                  type="text"
                  placeholder="Blog title"
                  required
                />
              </div>
              {/* blog description */}
              <div>
                <p className="mt-4 mb-2">Blog description</p>
                <textarea
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                  className="w-full px-4 pt-2 border rounded"
                  placeholder="write about blog"
                  rows={5}
                  required
                />
              </div>
              {/* category */}
              <div className="w-full lg:flex-1 flex flex-col gap-4">
                <div className="flex-1 flex flex-col gap-1">
                  <p>Category</p>
                  <select
                    onChange={(e) => setCategory(e.target.value)}
                    value={category}
                    className="border rounded px-3 py-2"
                    name=""
                    id=""
                  >
                    <option value="Technology">Technology</option>
                    <option value="Startup">Startup</option>
                    <option value="Lifestyle">Lifestyle</option>
                  </select>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={disable}
              className={`px-8 py-3 mt-4 rounded-full text-sm font-semibold
transition-colors duration-200
${
  disable
    ? "bg-gray-300 text-gray-600 cursor-not-allowed"
    : "bg-black text-white hover:bg-gray-800"
}`}
            >
              Add Blog
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CreateBlog;
