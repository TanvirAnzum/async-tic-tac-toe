import { useMutation } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { refresh } from "../apis/usersApi";
import { AuthContext } from "../contexts/AuthContext";
import Loader from "../ui/Loader";
import useGetToken from "./useGetToken";

const useAuth = () => {
  const [user, setUser] = useState("");
  const token = useGetToken();

  const { setAuth } = useContext(AuthContext);

  const { mutateAsync, isLoading } = useMutation({ mutationFn: refresh });

  useEffect(() => {
    const getUser = async () => {
      const response = await mutateAsync({ refreshToken: token.refreshToken });
      setUser(response);
      setAuth(response);
    };

    if (token) getUser();
  }, [mutateAsync, setAuth, token, token.refeshToken]);

  let content;
  if (isLoading) content = <Loader auth={true} />;
  else content = user;

  return content;
};

export default useAuth;
