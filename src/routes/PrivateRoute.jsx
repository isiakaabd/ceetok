import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = () => {
  const isAuthenticated = useSelector((state) => state.auth.auth);

  return !isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
