import React, { useState } from "react";
import logo from "../assets/logo.png";
import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CreateAuction from "./CreateAuction";
import { logOut } from "@/actions/authActions";
import { Package, UserCircle } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.authReducer);
  const [isOpen, setIsOpen] = useState(false);

  const handleLogOut = () => {
    dispatch(logOut(navigate));
    setIsOpen(false);
  };

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
        <div className="flex items-center gap-4">
          {user && user?.role === "buyer" && (
            <Button size="sm" variant="teal">
              <Link
                to={`/orders/${user?.id}`}
                className="flex items-center gap-2"
              >
                <Package className="mb-px" /> Track Orders
              </Link>
            </Button>
          )}
          <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
              <div
                role="button"
                className="flex flex-col gap-px items-center text-white"
              >
                <UserCircle />
                <p className="text-sm font-normal lowercase">
                  {user?.name?.split(" ")[0]}
                </p>
              </div>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-30">
              <div className="grid gap-4">
                <div>
                  <h4 className="text-center text-sm font-medium text-teal-900">
                    Profile
                  </h4>
                </div>
                <Button
                  variant={"destructive"}
                  size="sm"
                  onClick={handleLogOut}
                >
                  Log out
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
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
