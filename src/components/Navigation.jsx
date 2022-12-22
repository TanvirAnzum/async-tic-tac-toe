import { useMutation } from "@tanstack/react-query";
import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { logOut } from "../apis/usersApi.js";
import backIcon from "../assets/images/backButton.png";
import { AuthContext } from "../contexts/AuthContext";

const Navigation = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation() || {};
  const { auth, setAuth } = useContext(AuthContext);

  const { mutate } = useMutation({ mutationFn: logOut });

  const logOutHandler = () => {
    mutate(auth.username);
    setAuth("");
  };

  return (
    <div className="w-full h-[4vh] p-2 flex items-center justify-start">
      <div className="flex items-center justify-between w-full">
        {pathname === "/" ? (
          <h1 className="text-[28px] font-bold">Your Games</h1>
        ) : (
          <img
            src={backIcon}
            alt="back icon"
            className="cursor-pointer"
            onClick={() => navigate(-1)}
          />
        )}
        {auth && (
          <button
            className="bg-red-500 text-white cursor-pointer p-2 rounded font-semibold"
            onClick={logOutHandler}
          >
            Log Out
          </button>
        )}
      </div>
    </div>
  );
};

export default Navigation;
