import React, { useState } from "react";
import { userInstance } from "../axios";
import { useDispatch } from "react-redux";
import { setState } from "../Store/userSlice";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [detail, setDetail] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setDetail({ ...detail, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("detail", detail);

    let response = await userInstance.post("login", detail);
    console.log("response", response.data);
    if (response.data.success) {
      dispatch(setState(response.data.token));
      alert(response.data.msg);
      navigate("/");
    } else {
      alert(response.data.msg);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form className="bg-gray-300 rounded-md flex flex-col gap-2 items-center justify-center p-2">
        <div className=" flex flex-col gap-2 items-center justify-center">
          <label htmlFor="email">Email</label>
          <input
            className="rounded p-1"
            name="email"
            type="text"
            id="email"
            placeholder="Enter Email here"
            onChange={handleChange}
          />
        </div>
        <div className=" flex flex-col gap-2 items-center justify-center">
          <label htmlFor="password">Password</label>
          <input
            className="rounded p-1"
            name="password"
            type="password"
            id="password"
            placeholder="Enter Password here"
            onChange={handleChange}
          />
        </div>
        <p>
          Don't have an account?{" "}
          <Link
            to={"/register"}
            className="hover:text-blue-600 hover:underline"
          >
            Sign Up
          </Link>{" "}
        </p>
        <button className="buttonL" onClick={handleSubmit}>
          Log In
        </button>
      </form>
    </div>
  );
};

export default Login;
