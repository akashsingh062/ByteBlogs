import React, { useContext, useState } from "react";
import { BlogContext } from "../context/BlogContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { token, setToken, backendUrl } = useContext(BlogContext);
  const [state, setState] = useState("Login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handelLogin = async () => {
    try {
      if (state === "Login") {
        const { data } = await axios.post(`${backendUrl}/api/user/login`, {
          email,
          password,
        });
        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
          toast.success(data.message);
          navigate("/");
          scrollTo(0, 0);
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + "/api/user/register", {
          name,
          email,
          password,
        });
        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
          toast.success(data.message);
          navigate("/");
          scrollTo(0, 0);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Server error. Try again.");
    }
  };
  return (
    <div className="h-[70vh] flex items-center justify-center mt-12 px-4">
      <div className="w-full max-w-md bg-white border rounded-xl p-6 sm:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">
          {state === "Sign Up" ? "Sign Up" : "Login"}
        </h1>
        <div className="flex flex-col gap-4">
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            className={`w-full px-4 py-2 border rounded-md outline-none transition focus:ring-2 focus:ring-black ${
              state === "Sign Up" ? "" : "hidden"
            }`}
            required
            type="text"
            placeholder="Enter name"
          />
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="w-full px-4 py-2 border rounded-md outline-none transition focus:ring-2 focus:ring-black"
            required
            type="email"
            placeholder="Enter email"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="w-full px-4 py-2 border rounded-md outline-none transition focus:ring-2 focus:ring-black"
            required
            type="password"
            placeholder="Enter password"
          />
        </div>
        <button
          type="button"
          onClick={handelLogin}
          className="w-full mt-6 px-8 py-3 rounded-full text-sm font-semibold transition-colors duration-200 bg-black text-white hover:bg-gray-800"
        >
          {state === "Sign Up" ? "Sign Up" : "Login"}
        </button>
        <p className="mt-4 text-sm text-center text-gray-500">
          {" "}
          Click here to{" "}
          <span
            onClick={() =>
              setState((prev) => (prev === "Login" ? "Sign Up" : "Login"))
            }
            className="cursor-pointer text-black font-semibold underline hover:opacity-80 transition-opacity duration-200"
          >
            {state === "Sign Up" ? "Login" : "Sign Up"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
