import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const ProtectedRoute = ({ children, pageLogin = false }) => {
  const { isLoggedIn } = useAuth();
  if (pageLogin && isLoggedIn) {
    return <Navigate to="/" replace />;
  } else if (!pageLogin && !isLoggedIn) {
    return <Navigate to="/login" replace />; // Điều hướng đến trang đăng nhập
  }

  return children;
};

export default ProtectedRoute;
