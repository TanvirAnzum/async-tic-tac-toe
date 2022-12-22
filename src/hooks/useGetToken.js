import { useEffect, useState } from "react";

const useGetToken = () => {
  const [token, setToken] = useState(false);

  useEffect(() => {
    const item = localStorage.getItem("authToken");
    if (item) {
      setToken(JSON.parse(item));
    }
  }, []);

  return token;
};

export default useGetToken;
