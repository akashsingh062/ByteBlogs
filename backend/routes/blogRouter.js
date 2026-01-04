import express from "express";
import authUser from "../middlewares/authUser.js";
import { addBlog, deleteBlog, getAllBlogs, getBlog, getMyBlogs, updateBlog } from "../controllers/blogController.js";
import upload from "../middlewares/multer.js";

const blogRouter = express.Router()

blogRouter.post("/add-blog", upload.single('image'), authUser, addBlog)
blogRouter.delete("/delete", deleteBlog)
blogRouter.get("/getBlogs", getAllBlogs)
blogRouter.get('/my-blog', authUser, getMyBlogs)
blogRouter.get('/getBlog/:blogId', authUser, getBlog)
blogRouter.post('/update-blog', upload.single('image'), authUser, updateBlog)

export default blogRouter