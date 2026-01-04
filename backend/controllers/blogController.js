import blogModel from "../models/blogModel.js"
import userModel from "../models/userModel.js"
import cloudinary from 'cloudinary'


const addBlog = async (req, res) => {
    try {
        const { userId } = req
        const { title, category, description } = req.body
        const imageFile = req.file

        if (!title || !category || !description || !imageFile) {
            return res.json({ success: false, message: 'Please fill all fields.' })
        }

        const uploadImage = await cloudinary.uploader.upload(imageFile.path, { resource_type: 'image' })
        const imageUrl = uploadImage.secure_url

        const userData = await userModel.findById(userId)

        const blogData = {
            authorId: userData._id.toString(),
            author: userData.name,
            author_img: userData.image,
            title,
            image: imageUrl,
            category,
            description
        }

        const newBlog = new blogModel(blogData)
        newBlog.save()
        res.json({ success: true, message: "Blog added successfully" })

    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

const deleteBlog = async (req, res) => {
    try {
        const { blogId } = req.body
        const blogExist = await blogModel.findById(blogId)
        if (blogExist) {
            await blogModel.findByIdAndDelete(blogId)
            res.json({ success: true, message: "Blog deleted" })
        }
    } catch (error) {
        res.json({ success: false, message: error.message })
    }

}

const getAllBlogs = async (req, res) => {
    try {
        const blogData = await blogModel.find({})
        if (blogData) {
            res.json({ success: true, blogData })
        }
        else {
            res.json({ success: false, message: "Error in fetching blogs" })
        }
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

const getMyBlogs = async (req, res) => {
    try {
        const { userId } = req
        const data = await blogModel.find({ authorId: userId })
        res.json({ success: true, myBlogs: data })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}
const getBlog = async (req, res) => {
    try {
        const { blogId } = req.params
        const blogData = await blogModel.findById(blogId)
        if (!blogData) {
            return res.json({ success: false, message: "Blog does not exist" })
        }

        return res.json({ success: true, blogData })
    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}
const updateBlog = async (req, res) => {
    try {
        const { userId } = req
        const { title, category, description, blogId } = req.body
        const imageFile = req.file

        if (!title || !category || !description) {
            return res.json({ success: false, message: 'Please fill all fields.' })
        }

        const blog = await blogModel.findById(blogId)
        if (!blog) {
            return res.json({ success: false, message: "Blog not found" })
        }

        if (blog.authorId != userId) {
            return res.json({ success: false, message: 'Unauthorized request' })
        }

        const updateData = {
            title,
            category,
            description,
        }

        if (imageFile) {
            const uploadImage = await cloudinary.uploader.upload(imageFile.path, {
                resource_type: 'image'
            })
            updateData.image = uploadImage.secure_url
        }
        await blogModel.findByIdAndUpdate(blogId, updateData)
        res.json({ success: true, message: "Blog updated successfully" })

    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}
export {
    addBlog, deleteBlog, getAllBlogs, getMyBlogs, getBlog, updateBlog
}