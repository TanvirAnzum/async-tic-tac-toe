import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const useAuthCheck = () => {
  const { auth } = useContext(AuthContext) || {};

  return auth ? true : false;
};

export default useAuthCheck;
