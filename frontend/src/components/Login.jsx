import React, { useState } from "react";
import { z } from "zod";
import { ArrowRight } from "lucide-react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
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
      loginSchema.parse(formData);

      console.log("Form data:", formData);
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

  return (
    <div className="py-14 flex items-center justify-center">
      <div className="w-1/4">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col space-y-2 items-center w-full"
        >
          <h1 className="text-3xl font-medium">Sign in to your account</h1>
          <div
            role="button"
            className="flex items-center text-sm cursor-pointer hover:text-blue-600"
            onClick={() => navigate("/signup")}
          >
            <p>Don't have an account? Sign up</p>
            <ArrowRight size={16} />
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
            <Button type="submit" variant="blue" className="w-full">
              Sign in
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

export default Login;
