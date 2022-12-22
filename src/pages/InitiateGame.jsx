import { useMutation } from "@tanstack/react-query";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { newGame } from "../apis/gamesApi";
import { isValidUser } from "../apis/usersApi";
import Navigation from "../components/Navigation";
import { AuthContext } from "../contexts/AuthContext";
import Loader from "../ui/Loader";
import isValidEmail from "../utils/isValidEmail";

const InitiateGame = () => {
  // creating socket

  const { auth } = useContext(AuthContext) || {};

  // debounce and user validation related tasks
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [opponent, setOpponent] = useState("");

  // debounce handler

  const doChange = async (e) => {
    setError("");
    setInput(e.target.value);
  };

  const debounce = (fn, duration) => {
    let timeOut;

    return function (...args) {
      if (timeOut) clearTimeout(timeOut);
      timeOut = setTimeout(() => {
        fn(...args);
      }, duration);
    };
  };

  const handleChange = debounce(doChange, 500);

  useEffect(() => {
    const emailCheck = isValidEmail(input);
    if (emailCheck) {
      isValidUser(input).then((response) => {
        if (response) {
          setError("");
          setDisabled(false);
          setOpponent(response);
        } else {
          setError("User Not Found");
          setDisabled(true);
        }
      });
    } else {
      setDisabled(true);
    }
  }, [input]);

  // create new game
  const { mutateAsync, isLoading } = useMutation({ mutationFn: newGame });
  const navigate = useNavigate();

  // new game handler

  const newGameHandler = async () => {
    const gameObject = {
      initiator: auth.username,
      opponent: opponent.username,
      matrix: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ],
      nextMove: auth.username,
      status: "running",
    };
    const response = await mutateAsync(gameObject);

    if (response?.message) {
      toast.error(response.message);
    } else {
      if (response._id) {
        toast.success("New Game Created!");
        navigate(`/gamePage/${response._id}`);
      } else {
        toast.error("Game Creation failed");
      }
    }
  };

  let content;
  if (isLoading) content = <Loader />;
  else
    content = (
      <>
        <Navigation />
        <div className="flex flex-col gap-5">
          <div className="font-bold flex flex-col gap-5">
            <h4 className="text-[14px]">Start a new game</h4>
            <h1 className="text-[48px]">Whom do you want to play with?</h1>
          </div>
          <div className="flex flex-col gap-4">
            <label htmlFor="email" className="text-lg font-semibold">
              Email
            </label>
            <input
              type="text"
              id="email"
              className="w-full h-[56px] rounded-lg text-xl bg-[#F4F4F4] p-[8px]"
              onChange={handleChange}
            />
            {error && (
              <p className="text-lg font-semibold text-red-500">{error}</p>
            )}
          </div>
        </div>
        <button
          className="w-full h-[56px] text-xl flex items-center justify-center bg-primary rounded shadow-md font-semibold text-white cursor-pointer"
          disabled={disabled}
          onClick={newGameHandler}
        >
          Start game
        </button>
      </>
    );
  return content;
};

export default InitiateGame;
