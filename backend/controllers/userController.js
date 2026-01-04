import express from "express";
import jwt from 'jsonwebtoken'
import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from 'bcrypt'
import cloudinary from 'cloudinary'

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body
        if (!name || !email || !password) {
            return res.json({ success: false, message: "All fields are required" })
        }
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Enter a valid email" })
        }
        if (password.length < 8) {
            return res.json({ success: false, message: "Enter a strong password" })
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const userData = {
            name, email, password: hashedPassword
        }
        const newUser = new userModel(userData)
        await newUser.save()

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET)
        res.json({ success: true, token, message: "User registered successfully" })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            res.json({ success: false, message: "All fields are required" })
        }

        const user = await userModel.findOne({ email })
        if (!user) {
            return res.json({ success: false, message: "User not found" })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.json({ success: false, message: "Enter valid credentials" })
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
        res.json({ success: true, token, message: "Login successful" })
    } catch (error) {
        res.json({ success: false, message: "Login failed" })
    }
}

const getUserData = async (req, res) => {
    try {
        const { userId } = req
        const userData = await userModel.findById(userId).select('-password')
        if (userData) {
            res.json({ success: true, user:userData })
        }
        else {
            res.json({ success: false, message: "Error in fetching user profile" })
        }
    } catch (error) {
        res.json({ success: false, message: error.message })
    }

}
const updateProfile = async (req, res) => {
    try {
        const { name } = req.body
        const { userId } = req
        const imageFile = req.file
        await userModel.findByIdAndUpdate(userId, { name })
        if (imageFile) {
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: 'image' })
            const imageURL = imageUpload.secure_url
            await userModel.findByIdAndUpdate(userId, { image: imageURL })
        }
        res.json({ success: true, message: "Profile Updated" })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}
export {
    registerUser,
    loginUser, getUserData, updateProfile
} 