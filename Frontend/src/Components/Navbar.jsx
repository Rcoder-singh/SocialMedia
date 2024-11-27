import React from "react";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <div className=" bg-blue-600/70 flex items-center justify-center gap-5 p-2">
      <Link
        className="hover:text-white hover:font-semibold hover:underline"
        to="/"
      >
        Home
      </Link>
      <Link
        className="hover:text-white hover:font-semibold hover:underline"
        to="/register"
      >
        Register
      </Link>
      <Link
        className="hover:text-white hover:font-semibold hover:underline"
        to="/login"
      >
        Login
      </Link>
      <Link
        className="hover:text-white hover:font-semibold hover:underline"
        to="/profile"
      >
        Profile
      </Link>
    </div>
  );
};

export default Navbar;
