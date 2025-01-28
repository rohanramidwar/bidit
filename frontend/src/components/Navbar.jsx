import React from "react";
import logo from "../assets/logo.png";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="fixed top-0 h-14 px-4 w-full flex items-center border-b border-gray-100 justify-between">
      <Link to={"/"}>
        <div className="flex gap-2 items-center">
          <img src={logo} alt="Logo" className="h-5" />
          <p>Bidit</p>
        </div>
      </Link>
      <div className="flex gap-4 items-center">
        <Button variant={"ghost"}>
          <Link to={"/login"}>Sign in</Link>
        </Button>
        <div className="w-px h-10 bg-gray-100"></div>
        <Button variant={"ghost"}>
          <Link to={"/signup"}>Create account</Link>
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
