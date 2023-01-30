import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminRoute = () => {
  const isAuthenticated = useSelector((state) => state.auth.token);
  const admin = useSelector((state) => state.auth.admin);
  return isAuthenticated && admin ? <Outlet /> : <Navigate to="/" />;
};

export default AdminRoute;
