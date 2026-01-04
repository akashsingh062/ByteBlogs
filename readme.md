<p align="center">
  <h1 align="center">🚀 ByteBlogs</h1>
  <p align="center">
    A modern <b>full-stack MERN blog application</b> for creating, managing, and reading blogs.
  </p>
</p>

<p align="center">
  <a href="https://byteblogs-frontend.onrender.com/">
    <img src="https://img.shields.io/badge/Live-Demo-brightgreen" />
  </a>
  <img src="https://img.shields.io/badge/React-18-blue" />
  <img src="https://img.shields.io/badge/Node.js-18-green" />
  <img src="https://img.shields.io/badge/MongoDB-Database-brightgreen" />
  <img src="https://img.shields.io/badge/TailwindCSS-Utility--First-blue" />
  <img src="https://img.shields.io/badge/Stars-⭐%20Placeholder-lightgrey" />
  <img src="https://img.shields.io/badge/Forks-🍴%20Placeholder-lightgrey" />
</p>

<hr/>

## 🔗 Live Project

**Live Demo:**  
👉 https://byteblogs-frontend.onrender.com/

- Hosted on **Render**
- Fully functional **frontend & backend**

<hr/>

## 📑 Table of Contents

- [Project Overview](#-project-overview)
- [Why ByteBlogs?](#-why-byteblogs)
- [Tech Stack](#️-tech-stack)
- [Features](#-features)
- [Project Structure](#-project-structure)
- [Installation & Setup](#️-installation--setup)
- [API Routes](#-api-routes)
- [Future Improvements](#-future-improvements)
- [Contributing](#-contributing)
- [License](#-license)
- [Author](#-author)

<hr/>

## 📌 Project Overview

**ByteBlogs** is a **full-stack MERN blog application** designed to demonstrate real-world **authentication**, **CRUD operations**, and **REST API integration**. Users can securely log in, create blogs with images and HTML content, manage their profile, and explore blogs through a responsive and visually appealing UI.

**Keywords:**  
*MERN stack blog app, full-stack blog application, React Node MongoDB project, authentication, REST API, CRUD, responsive UI*

## 🌟 Why ByteBlogs?

ByteBlogs was built to showcase practical full-stack development skills, including:
- Secure authentication with JWT
- RESTful API design
- Scalable project architecture
- Clean, responsive UI with Tailwind CSS
- Real-world image upload handling

It is ideal for **learning**, **portfolio showcasing**, and **future feature expansion**.

<hr/>

## 🛠️ Tech Stack

### Frontend
- ⚛️ React.js
- ⚡ Vite
- 🎨 Tailwind CSS
- 🌐 Axios
- 🔀 React Router DOM
- 🧠 Context API

### Backend
- 🟢 Node.js
- 🚀 Express.js
- 🍃 MongoDB
- 📦 Mongoose
- 🔐 JWT Authentication
- 📤 Multer
- ☁️ Cloudinary

<hr/>

## ✨ Features

### 🔐 Authentication
- User registration & login
- JWT-based authentication
- Protected routes

### 📝 Blog Management
- Create, edit, and delete blogs
- Upload blog images
- HTML-based blog descriptions
- View all blogs
- View single blog pages
- Category-based filtering
- **My Blogs** (user-specific)

### 👤 Profile Management
- View & edit profile
- Update username
- Upload / change profile image
- Secure access

### 🎨 UI / UX
- Fully responsive design
- Modern UI using Tailwind CSS
- Clean profile layout
- Readable blog content
- Subtle background patterns
- Smooth interactions

<hr/>

## 📂 Project Structure

### Backend
```bash
backend/
├── config/
│   ├── cloudinary.js
│   └── mongodb.js
├── controllers/
│   ├── blogController.js
│   └── userController.js
├── middlewares/
│   └── authUser.js
├── models/
│   ├── blogModel.js
│   └── userModel.js
├── routes/
│   ├── blogRouter.js
│   └── userRouter.js
├── .env
├── server.js
├── package.json
└── package-lock.json
```

### Frontend
```bash
frontend/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── BlogCard.jsx
│   │   ├── BlogPost.jsx
│   │   ├── Footer.jsx
│   │   └── Navbar.jsx
│   ├── context/
│   │   └── BlogContext.jsx
│   ├── pages/
│   │   ├── Blog.jsx
│   │   ├── CreateBlog.jsx
│   │   ├── EditBlog.jsx
│   │   ├── Header.jsx
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── MyBlogs.jsx
│   │   └── Profile.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .env
├── index.html
├── vite.config.js
├── package.json
└── package-lock.json
```

<hr/>

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone <repository-url>
cd ByteBlogs
```

### 2️⃣ Install Dependencies
```bash
cd frontend && npm install
cd ../backend && npm install
```

### 3️⃣ Environment Variables

#### Backend `.env`
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

#### Frontend `.env`
```env
VITE_BACKEND_URL=http://localhost:5000
```

### 4️⃣ Run the Project
```bash
# Backend
cd backend
npm start

# Frontend
cd frontend
npm run dev
```

<hr/>

## 📡 API Routes

### 📝 Blog Routes (`/api/blog`)
- `POST /add-blog` — Create a new blog (image upload supported)
- `DELETE /delete` — Delete a blog
- `GET /getBlogs` — Get all blogs
- `GET /my-blog` — Get blogs created by logged-in user
- `GET /getBlog/:blogId` — Get single blog by ID
- `POST /update-blog` — Update blog details (image upload supported)

> Protected routes use JWT authentication middleware.

### 👤 User Routes (`/api/user`)
- `POST /register` — Register a new user
- `POST /login` — Login user
- `GET /profile` — Get logged-in user profile
- `POST /update-profile` — Update user profile (image upload supported)


<hr/>

## 📦 Repository

GitHub Repository:  
🔗 https://github.com/akashsingh062/ByteBlogs

## 🚀 Future Improvements

- Likes & comments
- Rich text editor
- Blog search
- Pagination
- Dark mode
- Role-based access
- Deployment improvements

<hr/>

## 🤝 Contributing

1. Fork the repository
2. Create a new branch
3. Commit your changes
4. Open a Pull Request

<hr/>

## 📄 License

This project is licensed under the **MIT License**.

<hr/>

## 👨‍💻 Author

**Akash Singh**

- Built for learning full-stack development
- Open to feedback and contributions

⭐ If you like this project, consider giving it a star!
