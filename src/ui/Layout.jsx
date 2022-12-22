import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Layout = () => {
  const location = useLocation();
  const { pathname } = location;
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="w-full min-h-screen flex items-center justify-center">
        <div
          className={
            pathname === "/"
              ? "w-full sm:max-w-lg min-h-screen sm:min-h-[720px] p-4 flex flex-col justify-start"
              : "w-full sm:max-w-lg min-h-screen sm:min-h-[720px] p-4 flex flex-col justify-between"
          }
        >
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Layout;
