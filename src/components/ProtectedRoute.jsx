import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const ProtectedRoute = ({ children, pageLogin = false }) => {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />; // Điều hướng đến trang đăng nhập
  } else if (pageLogin) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
