import { useMutation } from "@tanstack/react-query";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { login } from "../apis/usersApi";
import Navigation from "../components/Navigation";
import { AuthContext } from "../contexts/AuthContext";
import Loader from "../ui/Loader";
import { setToken } from "../utils/setToken";

const Login = () => {
  const { register, reset, handleSubmit } = useForm();
  const { mutateAsync, isLoading, isError, error } = useMutation({
    mutationFn: login,
  });

  const { setAuth } = useContext(AuthContext) || {};

  const loginHandler = async (data) => {
    const response = await mutateAsync(data);

    if (response?.message) {
      toast.error(response.message);
    } else {
      if (response.username) {
        setAuth(response);
        setToken(response);
        toast.success("Login successful");
      } else {
        toast.error("Login failed");
      }
    }
    reset();
  };

  let content;

  if (isLoading && !isError) {
    content = <Loader auth={true} />;
  }
  if (!isLoading && isError) {
    content = <div>{error}</div>;
  }
  if (!isError && !isLoading) {
    content = (
      <>
        <div className="w-full flex flex-col gap-4">
          <Navigation />
          <div className="w-full p-2 flex flex-col gap-2 font-bold">
            <h4 className="text-[14px]">Login</h4>
            <h1 className="text-[28px]">Please enter your details</h1>
          </div>
          <form
            action=""
            className="w-full p-2 flex flex-col gap-2 "
            id="loginForm"
            onSubmit={handleSubmit(loginHandler)}
          >
            <label htmlFor="userName" className="text-lg font-semibold">
              Username
            </label>
            <input
              type="text"
              id="userName"
              className="w-full h-[56px] rounded-lg text-xl bg-[#F4F4F4] p-[8px]"
              placeholder="Type your username here"
              {...register("username")}
              required
            />

            <label htmlFor="password" className="text-lg font-semibold">
              Password
            </label>
            <input
              type="password"
              className="w-full h-[56px] rounded-lg text-xl bg-[#F4F4F4] p-[8px]"
              placeholder="Type your password here"
              {...register("password")}
              required
            />
          </form>
        </div>

        <button
          className="w-full h-[56px] text-xl flex items-center justify-center bg-primary rounded shadow-md font-semibold text-white cursor-pointer"
          type="submit"
          form="loginForm"
        >
          Login
        </button>
      </>
    );
  }

  return content;
};

export default Login;
