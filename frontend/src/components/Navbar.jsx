import React from "react";
import logo from "../assets/bear.png";
import dummy from "../assets/dummy.png";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { user } = useSelector((state) => state.authReducer);

  return (
    <div className="bg-white sticky z-50 top-0 inset-x-0 h-14 flex items-center border-b border-gray-200 justify-between">
      <Link to={"/"}>
        <div className="flex gap-2 items-center">
          <img src={logo} alt="Logo" className="h-6" />
          <p>Bidit</p>
        </div>
      </Link>
      {user ? (
        <div role="button">
          <img src={dummy} alt="pic" className="w-9 h-9 rounded-full" />
        </div>
      ) : (
        <div className="flex space-x-2 items-center">
          <Button variant={"ghost"}>
            <Link to={"/login"}>Sign in</Link>
          </Button>
          <div className="w-px h-10 bg-gray-100"></div>
          <Button variant={"ghost"}>
            <Link to={"/signup"}>Create account</Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
