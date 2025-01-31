import React from "react";
import logo from "../assets/logo.png";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import CreateAuction from "./CreateAuction";

const Navbar = () => {
  const { user } = useSelector((state) => state.authReducer);

  return (
    <div className="px-4 bg-gray-900 sticky z-50 top-0 inset-x-0 h-14 flex items-center border-b justify-between">
      <div className="flex items-center gap-4">
        <Link to={"/"}>
          <div className="flex gap-2 items-center hover:opacity-75 transition">
            <img src={logo} alt="logo" loading="lazy" width={30} height={30} />
            <p className="text-lg text-teal-700 font-bold">Bidit</p>
          </div>
        </Link>
        {user && user?.role === "seller" && (
          <div>
            <CreateAuction />
          </div>
        )}
      </div>
      {user ? (
        <div></div>
      ) : (
        <div className="flex space-x-2 items-center">
          <Button size="sm" variant={"teal"}>
            <Link to={"/login"}>Sign in</Link>
          </Button>

          <Button className="text-white" size="sm" variant={"ghost"}>
            <Link to={"/signup"}>Create account</Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
