import { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";

const useSetToken = () => {
  const { auth } = useContext(AuthContext) || {};

  useEffect(() => {
    const token = {
      accessToken: auth?.accessToken,
      refreshToken: auth?.refreshToken,
    };
    if (auth?.accessToken)
      localStorage.setItem("authToken", JSON.stringify(token));
  }, [auth?.accessToken, auth?.refreshToken]);

  return true;
};

export default useSetToken;
