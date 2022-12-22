import { Navigate, useLocation } from "react-router-dom";
import useAuthCheck from "../hooks/useAuthCheck";

export default function PrivateRoute({ children }) {
  const isLoggedIn = useAuthCheck();

  const location = useLocation();
  const { pathname } = location || {};

  return isLoggedIn ? (
    children
  ) : (
    <Navigate to="/entry" state={{ from: pathname }} />
  );
}
