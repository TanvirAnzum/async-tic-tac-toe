import React from "react";
import { Link } from "react-router-dom";

const Entry = () => {
  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div className="w-full sm:max-w-lg min-h-screen sm:min-h-[720px] p-4 flex items-center justify-center relative">
        <div className="font-bilbo text-black flex flex-col items-center justify-center text-center">
          <h5 className="text-[36px]">async</h5>
          <h1 className="text-[96px]">tic tac</h1>
          <h1 className="text-[96px]">toe</h1>
        </div>

        {/* Links */}
        <div className="absolute w-full flex flex-col gap-5 bottom-0 p-4">
          <Link
            to="/login"
            className="w-full h-[56px] text-xl flex items-center justify-center bg-primary rounded shadow-md font-semibold text-white cursor-pointer"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="w-full h-[56px] text-xl flex items-center justify-center bg-secondary rounded shadow-md font-semibold text-white cursor-pointer"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Entry;
