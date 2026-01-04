import { createContext, useState } from "react";
// import { blog_data as blogData } from "../assets/assets.js";
import { useAsyncError } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";

export const BlogContext = createContext();

const BlogContextProvider = (props) => {
  const [data, setData] = useState({});
  const [filterBlog, setFilterBlog] = useState([]);
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : ""
  );
  const [userData, setUserData] = useState({});
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const getUserData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.success) {
        setUserData(data.user);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Server error. Try again.");
    }
  };
  
  const getAllBlogs = async ()=>{
    try {
      const {data} = await axios.get(backendUrl+'/api/blog/getBlogs',{headers:{Authorization:`Bearer ${token}`}})
      setData(data.blogData.reverse())
    } catch (error) {
      toast.error(error.response?.data?.message || "Server error. Try again.");
      
    }
  }
  useEffect(()=>{
    getAllBlogs()
  },[])
  useEffect(() => {
    if (token) {
      getUserData();
    }
  }, [token]);

  const value = {
    data,
    setData,
    filterBlog,
    setFilterBlog,
    userData,
    setUserData,
    backendUrl,
    token,
    setToken,
    getUserData,getAllBlogs
  };

  return (
    <BlogContext.Provider value={value}>{props.children}</BlogContext.Provider>
  );
};
export default BlogContextProvider;
