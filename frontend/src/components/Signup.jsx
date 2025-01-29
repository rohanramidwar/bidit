import React, { useState } from "react";
import { z } from "zod";
import { ArrowRight } from "lucide-react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "@/actions/authActions";

const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(4, "Password must be at least 4 characters"),
  // .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  // .regex(/[0-9]/, "Password must contain at least one number"),
});

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.authReducer.isLoading);
  const [role, setRole] = useState("buyer");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));

    if (errors[id]) {
      setErrors((prev) => ({
        ...prev,
        [id]: "",
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      signupSchema.parse(formData);
      const signupData = {
        ...formData,
        role,
      };
      dispatch(signup(signupData, navigate));
      console.log({ formData, role });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors = {};
        error.errors.forEach((err) => {
          newErrors[err.path[0]] = err.message;
        });
        setErrors(newErrors);
      }
    }
  };

  const toggleRole = () => {
    setRole((prev) => (prev === "buyer" ? "seller" : "buyer"));
  };

  return (
    <div className="py-14 flex items-center justify-center">
      <div className="lg:w-1/4">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col space-y-2 items-center w-full"
        >
          <h1 className="text-3xl font-medium">Create an account</h1>
          <div
            role="button"
            className="flex items-center text-sm cursor-pointer"
            onClick={() => navigate("/login")}
          >
            <p>Already have an account? Sign in</p>
            <ArrowRight size={16} />
          </div>
          <div className="w-full">
            <Label htmlFor="name">Full name</Label>
            <Input
              type="text"
              id="name"
              placeholder="Full name"
              value={formData.name}
              onChange={handleInputChange}
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>
          <div className="w-full">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              className={errors.email ? "border-red-500" : ""}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>
          <div className="w-full">
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              id="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              className={errors.password ? "border-red-500" : ""}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>
          <div className="w-full pt-2">
            <Button
              type="submit"
              variant="blue"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? "Signing up..." : "Sign up"}
            </Button>
          </div>
          <div className="w-full flex items-center justify-between space-x-2 text-slate-500">
            <div className="h-px bg-gray-200 w-full"></div>
            <p>OR</p>
            <div className="h-px bg-gray-200 w-full"></div>
          </div>
          <div className="w-full">
            <Button
              type="button"
              className="w-full"
              variant="secondary"
              onClick={toggleRole}
            >
              Continue as {role === "buyer" ? "seller" : "buyer"}
            </Button>
          </div>
          <p className="text-slate-500 text-sm text-center">
            By clicking continue, you agree to our{" "}
            <span className="underline cursor-pointer">Terms of Service</span>{" "}
            and <span className="underline cursor-pointer">Privacy Policy</span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
