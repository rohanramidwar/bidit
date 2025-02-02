import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { Toaster } from "react-hot-toast";
import SellerPage from "./pages/SellerPage";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { useSelector } from "react-redux";
import AuctionRoom from "./pages/AuctionRoom";

const App = () => {
  const { user } = useSelector((state) => state.authReducer);

  return (
    <div className="font-inter text-slate-800 flex flex-col min-h-screen">
      <Toaster position="top-right" reverseOrder={false} />
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/"
          element={
            <ProtectedRoute allowedRoles={["buyer"]}>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/auction/:id"
          element={
            <ProtectedRoute allowedRoles={["buyer"]}>
              <AuctionRoom />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={["seller"]}>
              <SellerPage />
            </ProtectedRoute>
          }
        />

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
