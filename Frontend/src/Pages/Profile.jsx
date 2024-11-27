import { userInstance } from "../axios";
import { useNavigate } from "react-router-dom";
import { fetchUserById } from "../Store/userSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let userDetails = useSelector((state) => state.user);
  console.log("userDetails", userDetails);
  const [userInfo, setUserInfo] = useState({});

  const handleInput = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      let res = await userInstance.put(
        `/update/${userDetails.user._id}`,
        userInfo,
        {
          headers: {
            Authorization: userDetails.token,
          },
        }
      );

      let data = res.data;
      console.log("data", data);
      dispatch(fetchUserById(userDetails.token));

      if (res.data.success) {
        alert(res.data.msg);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setUserInfo({
      name: userDetails.user.name ? userDetails.user.name : "",
      email: userDetails.user.email ? userDetails.user.email : "",
      password: "",
      bio: userDetails.user.bio ? userDetails.user.bio : "",
    });
  }, [userDetails]);

  const handleDelete = async () => {
    try {
      let res = await userInstance.delete(`/delete/${userDetails.user._id}`);

      let data = res.data;
      console.log(data);
      if (res.data.success) alert(res.data.msg);
      navigate("/register");
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
            className="bg-green-950 text-white py-2 px-4 rounded-md hover:bg-green-800 mt-5"
          >
            Update Details
          </button>
        </form>
        <button
          className="text-red-600 bg-white rounded-md py-2 px-4  ml-56 hover:bg-red-600 "
          onClick={handleDelete}
        >
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default Profile;
