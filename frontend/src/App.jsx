import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import CreateBlog from "./pages/CreateBlog";
import MyBlogs from "./pages/MyBlogs";
import EditBlog from "./pages/EditBlog";

const App = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <ToastContainer
  position="bottom-center"
  autoClose={1200}
  hideProgressBar
  closeOnClick
  pauseOnHover
  draggable
  theme="dark"
  limit={2}
/>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog/:blogId" element={<Blog />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/new-blog" element={<CreateBlog />} />
        <Route path="/edit/:blogId" element={<EditBlog />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
