import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PublicLayout = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <Outlet />;
  }
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default PublicLayout;