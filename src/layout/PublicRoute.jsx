// component/PublicRoute.jsx
import { Navigate, Outlet } from "react-router-dom";

export default function PublicRoute() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user) return <Navigate to="/add-cutomer" replace />;

  return <Outlet />;
}