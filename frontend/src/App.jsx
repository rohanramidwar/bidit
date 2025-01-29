import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { Toaster } from "react-hot-toast";
import SellerDashboard from "./components/SellerDashboard";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { useSelector } from "react-redux";

const App = () => {
  const { user } = useSelector((state) => state.authReducer);

  return (
    <div className="text-slate-800 flex flex-col min-h-screen">
      <Toaster position="top-right" reverseOrder={false} />
      <Navbar />
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected buyer route */}
        <Route
          path="/"
          element={
            <ProtectedRoute allowedRoles={["buyer"]}>
              <Home />
            </ProtectedRoute>
          }
        />

        {/* Protected seller route */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={["seller"]}>
              <SellerDashboard />
            </ProtectedRoute>
          }
        />

        {/* Redirect based on role if logged in */}
        <Route
          path="*"
          element={
            user ? (
              user.role === "seller" ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Navigate to="/" replace />
              )
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </div>
  );
};

export default App;
