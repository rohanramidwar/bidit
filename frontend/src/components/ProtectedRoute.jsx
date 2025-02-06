import { useAuthPersist } from "@/hooks/useAuthPersist";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

export const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useSelector((state) => state.authReducer);
  const { isLoading, localUser } = useAuthPersist();
  const location = useLocation();

  if (isLoading) {
    return <div>Loading...</div>; // Or your loading component
  }

  const currentUser = user || localUser;

  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!allowedRoles.includes(currentUser.role)) {
    if (currentUser.role === "seller") {
      return <Navigate to="/dashboard" replace />;
    }
    return <Navigate to="/" replace />;
  }

  return children;
};
