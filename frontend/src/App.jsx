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
import { useAuthPersist } from "./hooks/useAuthPersist";

const App = () => {
  const { user } = useSelector((state) => state.authReducer);
  const { isLoading, localUser } = useAuthPersist();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const currentUser = user || localUser;

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
            currentUser ? (
              currentUser.role === "seller" ? (
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
