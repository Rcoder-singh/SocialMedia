import React, { useState } from "react";
import { userInstance } from "../axios";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [nameAlert, setNameAlert] = useState("");
  const [emailAlert, setEmailAlert] = useState("");
  const [passwordAlert, setPasswordAlert] = useState("");
  const [detail, setDetail] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setDetail({ ...detail, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(detail);

    let response = await userInstance.post("register", detail);
    console.log("response", response.data);
    if (response.data.success) {
      navigate("/");
      alert(response.data.msg);
    } else {
      if (response.data.name == "name") setNameAlert(response.data.msg);
      else if (response.data.email == "email") setEmailAlert(response.data.msg);
      else if (response.data.password == "password")
        setPasswordAlert(response.data.msg);
      else alert(response.data.msg);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form className="bg-gray-300 rounded-md flex flex-col gap-2 items-center justify-center p-2">
        <div className=" flex flex-col gap-2 items-center justify-center">
          <label htmlFor="email">Name</label>
          <input
            className="rounded p-1"
            name="name"
            type="text"
            id="name"
            placeholder="Enter Name here"
            onChange={handleChange}
          />
          {nameAlert ? (
            <p className="text-red-600">
              <sup>* </sup>
              {nameAlert}
            </p>
          ) : (
            ""
          )}
        </div>
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
          {emailAlert ? (
            <p className="text-red-600">
              <sup>* </sup>
              {emailAlert}
            </p>
          ) : (
            ""
          )}
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
          {passwordAlert ? (
            <p className="text-red-600">
              <sup>* </sup>
              {passwordAlert}
            </p>
          ) : (
            ""
          )}
        </div>
        <p className="flex gap-2 items-center justify-center">
          Already have an account?
          <Link
            to={"/login"}
            className=" font-bold hover:text-blue-600 hover:underline"
          >
            Log In
          </Link>
        </p>
        <button className="buttonR" onClick={handleSubmit}>
          Register
        </button>
      </form>
    </div>
  );
};

export default SignUp;
