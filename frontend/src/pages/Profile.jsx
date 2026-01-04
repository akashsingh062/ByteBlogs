import React, { useContext, useEffect, useState } from "react";
import { BlogContext } from "../context/BlogContext";
import { assets } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";
import MyBlogs from "./MyBlogs";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { token, getUserData, userData, backendUrl } =
    useContext(BlogContext);
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);
  const [name, setName] = useState("");
  const [disabled, setDisabled] = useState(false);

  const handleSave = async () => {
    try {
      if (!isEdit) {
        setIsEdit(true);
        return;
      }
      setDisabled(true);
      const formData = new FormData();
      formData.append("name", name);
      if (image) {
        formData.append("image", image);
      }
      const { data } = await axios.post(
        backendUrl + "/api/user/update-profile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        getUserData();
        setImage(false);
        setIsEdit(false);
        setDisabled(false);
        toast.success(data.message);
      } else {
        toast.error(data.message);
        setDisabled(false);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Profile update failed");
      setDisabled(false);
    }
  };

  useEffect(() => {
    if (userData?.name) {
      setName(userData.name);
    }
  }, [userData]);

  return (
    token && (
      <div>
        <div className="relative mb-24">
          <div className="h-40 md:h-48 bg-linear-to-r from-gray-100 to-gray-200" />
          <div className="relative -mt-20 mx-auto w-full max-w-4xl bg-white border rounded-2xl shadow-sm
flex flex-col items-center gap-6 p-8 md:p-10">
            <div className="shrink-0 -mt-16 md:mt-0 flex justify-center w-full md:w-auto">
              {isEdit ? (
                <div className="inline-block relative cursor-pointer group">
                  <label htmlFor="profile-image" aria-label="Upload profile image">
                    <img
                      className="w-48 h-48 rounded-xl object-cover opacity-90 group-hover:opacity-70 transition shadow-xl"
                      src={image ? URL.createObjectURL(image) : userData.image}
                      alt="profile"
                    />
                    <img
                      className="w-10 absolute bottom-12 right-12"
                      src={assets.upload_icon}
                      alt="upload"
                    />
                  </label>

                  <input
                    id="profile-image"
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                </div>
              ) : (
                <img
                  className="w-48 h-48 rounded-xl object-cover shadow-xl"
                  src={userData.image}
                  alt="profile"
                />
              )}
            </div>
            <div className="w-24 h-px bg-gray-200 my-4" />
            <div className="flex flex-col items-center text-center gap-3 flex-1">
              {isEdit ? (
                <input
                  className="text-2xl md:text-3xl font-semibold border-b border-gray-300 outline-none text-center md:text-left focus:border-black transition-colors"
                  value={name}
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                />
              ) : (
                <p className="text-2xl md:text-3xl font-semibold tracking-tight text-gray-900">{userData.name}</p>
              )}

              <div className="pt-4">
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={isEdit && disabled}
                  className={`px-10 py-3 text-sm font-semibold rounded-full
                transition-colors duration-200
                ${
                  isEdit && disabled
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "bg-black text-white hover:bg-gray-800"
                }
              `}
                >
                  {isEdit ? "Save" : "Edit"}
                </button>
              </div>
            </div>
          </div>
        </div>
        <hr className="mt-20 mb-16 w-full max-w-4xl mx-auto border-t border-gray-200" />
        <div className="mt-12">
          <h1 className="text-center text-3xl md:text-4xl font-semibold tracking-tight">
            <span className="text-gray-500 mr-2">My</span>
            Blogs
          </h1>
          <MyBlogs />
        </div>
      </div>
    )
  );
};

export default Profile;
