import { Navigate, useLocation } from "react-router-dom";
import useAuthCheck from "../hooks/useAuthCheck";

export default function PublicRoute({ children }) {
  const isLoggedIn = useAuthCheck();
  const location = useLocation();
  const { from } = location.state || {};

  return !isLoggedIn ? children : <Navigate to={from ? from : "/"} />;
}
