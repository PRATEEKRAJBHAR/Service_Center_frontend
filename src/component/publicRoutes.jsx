// component/PublicRoute.jsx
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  // ✅ Already logged in → redirect to dashboard (or any page)
  if (token) {
    return <Navigate to="/listing-cutomer" replace />;
  }

  return children;
};

export default PublicRoute;