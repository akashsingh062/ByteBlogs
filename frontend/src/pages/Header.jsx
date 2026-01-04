import React, { useState } from 'react'

const Header = () => {
  const [subEmail, setSubEmail] = useState("");

  const handelSubscribe = () => {
    setSubEmail("");
  };

  return (
    <div className="flex flex-col w-full my-12 ">
      <div className="flex justify-center items-center flex-col my-8 px-6 md:px-20 ">
        <h1 className="text-5xl font-bold">Latest Blogs</h1>
        <p className="mt-8">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla beatae
          odit neque quibusdam nobis nihil illum illo.{" "}
        </p>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>

        {/* Subscribe component */}
        <div className="mt-8 flex items-center gap-2 border px-4 py-2 rounded-full w-full max-w-md bg-white">
          <input
            onChange={(e) => {
              setSubEmail(e.target.value);
            }}
            value={subEmail}
            className="w-full h-8 outline-none text-sm px-2"
            type="email"
            name=""
            id="" 
            required
            placeholder="Enter your email"
          />
          <button
            onClick={handelSubscribe}
            className="px-4 py-1.5 rounded-full text-sm font-semibold
bg-black text-white hover:bg-gray-800
transition-colors duration-200"
          >
            Subscribe
          </button>
        </div>
      </div>
    </div>
  )
}

export default Header
