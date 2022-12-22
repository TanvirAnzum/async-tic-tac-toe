import { useMutation } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { registration } from "../apis/usersApi";
import Navigation from "../components/Navigation";
import Loader from "../ui/Loader";

const Register = () => {
  const { register, reset, handleSubmit } = useForm();
  const navigate = useNavigate();

  const { mutateAsync, isLoading, isError, error } = useMutation({
    mutationFn: registration,
  });

  const registrationHandler = async (data) => {
    const response = await mutateAsync(data);
    if (response?.message) {
      toast.error(response.message);
    } else {
      if (response.username) {
        toast.success("Registration successful");
        navigate("/login");
      } else {
        toast.error("Registration failed");
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
            <h4 className="text-[14px]">Create account</h4>
            <h1 className="text-[28px]">Let’s get to know you better!</h1>
          </div>

          <form
            action=""
            className="w-full p-2 flex flex-col gap-2 "
            id="registrationForm"
            onSubmit={handleSubmit(registrationHandler)}
          >
            <label htmlFor="name" className="text-lg font-semibold">
              Your name
            </label>
            <input
              type="text"
              id="name"
              className="w-full h-[56px] rounded-lg text-xl bg-[#F4F4F4] p-[8px]"
              placeholder="Type your name here"
              {...register("name")}
              required
            />
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
            <label htmlFor="email" className="text-lg font-semibold">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full h-[56px] rounded-lg text-xl bg-[#F4F4F4] p-[8px]"
              placeholder="Type your email here"
              {...register("email")}
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
          form="registrationForm"
        >
          Register
        </button>
      </>
    );
  }

  return <>{content}</>;
};

export default Register;
