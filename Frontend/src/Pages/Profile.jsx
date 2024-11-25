import React, { useState } from "react";
import { userInstance } from "../axios";

const Profile = () => {
  const [userInfo, setUserInfo] = useState({});

  const handleInput = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      let res = await userInstance.post(
        `/update/6744d4503f2bf012cb976d01`,
        userInfo
      );

      let data = res.data;
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-gray-400 p-5 w-max h-max rounded-2xl">
        <form action="" className="">
          <label className="md:w-[150px] w-[100px] sm:inline-block block">
            Name :
          </label>
          <input
            name="name"
            onChange={handleInput}
            className="rounded-md  my-2 text-black w-[200px] p-2"
            type="text"
          />
          <br />
          <label className="md:w-[150px] w-[100px] sm:inline-block block">
            Email :
          </label>
          <input
            name="email"
            disabled
            className="rounded-md my-2 text-black w-[200px] bg-white p-2"
            type="email"
          />
          <br />
          <label className="md:w-[150px] w-[100px] sm:inline-block block">
            Update Password :
          </label>
          <input
            className="rounded-md my-2 text-black w-[200px] p-2"
            name="password"
            onChange={handleInput}
            type="password"
          />
          <br />
          <label className="md:w-[150px] w-[100px] sm:inline-block block">
            Update Bio :
          </label>
          <input
            name="bio"
            onChange={handleInput}
            className="rounded-md my-2 text-black w-[200px] p-2"
            type="text"
          />
          <br />
          <button
            onClick={handleUpdate}
            className="bg-green-950 text-white py-2 px-4 rounded-md hover:bg-green-800"
          >
            Update Details
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
