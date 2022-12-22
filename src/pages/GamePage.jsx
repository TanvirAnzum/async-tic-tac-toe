import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { io } from "socket.io-client";
import { getSingleGame, updateGame } from "../apis/gamesApi";
import { finishGame } from "../apis/usersApi";
import oIcon from "../assets/images/o.png";
import xIcon from "../assets/images/x.png";
import BoardBox from "../components/BoardBox";
import Navigation from "../components/Navigation";
import { AuthContext } from "../contexts/AuthContext";
import Loader from "../ui/Loader";
import { verdict } from "../utils/verdict";

const GamePage = () => {
  const socket = io(process.env.REACT_APP_BASE_URL, {
    reconnectionDelay: 1000,
    reconnection: true,
    reconnectionAttemps: 10,
    transports: ["websocket"],
    agent: false,
    upgrade: false,
    rejectUnauthorized: false,
  });

  const { gameId } = useParams();

  const queryClient = useQueryClient();

  const { auth } = useContext(AuthContext);

  const { data, refetch, isLoading, isError, error } = useQuery({
    queryKey: ["singleGame", gameId],
    queryFn: () => getSingleGame(gameId),
  });

  const { mutate } = useMutation({ mutationFn: updateGame });

  const { mutate: finish } = useMutation({ mutationFn: finishGame });

  const flattenArray = data?.matrix?.flat();
  const [selected, setSelected] = useState(null);
  const [status, setStatus] = useState("");

  // array mapping
  const arrObj = {
    0: "0 0",
    1: "0 1",
    2: "0 2",
    3: "1 0",
    4: "1 1",
    5: "1 2",
    6: "2 0",
    7: "2 1",
    8: "2 2",
  };

  // make move handler

  const makeMoveHandler = () => {
    const dimension = arrObj[selected];
    const dimensionX = dimension[0];
    const dimensionY = dimension[2];
    const currentBoard = [...data?.matrix];
    currentBoard[dimensionX][dimensionY] =
      data?.initiator === auth.username ? 1 : 2;
    const result = verdict(currentBoard);
    if (result === "Win") {
      setStatus("You Win!");
      mutate({
        id: gameId,
        data: {
          matrix: currentBoard,
          nextMove: null,
          status: `${auth.username} won the game`,
        },
        username: auth.username,
      });
      finish({
        initiator: data?.initiator,
        opponent: data?.opponent,
      });
    } else if (result === "Draw") {
      setStatus("It’s a Draw!");
      mutate({
        id: gameId,
        data: {
          matrix: currentBoard,
          nextMove: null,
          status: "Draw",
        },
        username: auth.username,
      });
      finish({
        initiator: data?.initiator,
        opponent: data?.opponent,
      });
    } else {
      mutate({
        id: gameId,
        data: {
          matrix: currentBoard,
          nextMove:
            data?.nextMove === data?.initiator
              ? data?.opponent
              : data?.initiator,
        },
        username: auth.username,
      });
    }
  };

  // updating realtime

  socket.on("patchResponse", (data) => {
    queryClient.invalidateQueries({ queryKey: ["singleGame", gameId] });
    refetch(gameId);
  });

  useEffect(() => {
    if (data?.status !== "running") {
      setStatus(data?.status);
    } else if (data?.initiator === auth.username) {
      setStatus("Your Move!");
    } else {
      setStatus("Their Move!");
    }
  }, [auth.username, data?.initiator, data?.status]);

  let content;
  if (!isError && isLoading) {
    content = <Loader />;
  }
  if (isError && !isLoading) {
    content = <p className="text-red-500 font-bold">{error}</p>;
  }
  if (!isError && !isLoading) {
    content = (
      <>
        <Navigation />
        <div>
          <h1 className="text-[24px] font-semibold">{`Game with ${
            data?.initiator === auth.username ? data?.opponent : data?.initiator
          }`}</h1>
          <p className="text-[14px]">Your Piece</p>
          <img src={data?.initiator === auth.username ? xIcon : oIcon} alt="" />
        </div>
        <div className=" bg-[#FFE79E] flex items-center justify-center w-full p-4">
          <p className="text-[14px]">{status}</p>
        </div>
        <div className="board">
          {flattenArray?.map((row, index) => (
            <BoardBox
              value={row}
              index={index}
              setSelected={setSelected}
              selected={selected}
              nextMove={data?.nextMove}
              initiator={data?.initiator === auth.username}
            />
          ))}
        </div>

        {data?.status === "running" ? (
          <button
            className="w-full h-[56px] text-xl flex items-center justify-center bg-primary rounded shadow-md font-semibold text-white cursor-pointer disabled:bg-[#E0E0E0]"
            disabled={data?.nextMove !== auth.username ? true : false}
            onClick={makeMoveHandler}
          >
            {data?.status === "running"
              ? data?.nextMove === auth.username
                ? "Submit"
                : `Waiting for ${
                    data?.initiator === auth.username
                      ? data?.opponent
                      : data?.initiator
                  }`
              : "Start New Game"}
          </button>
        ) : (
          <Link
            className="w-full h-[56px] text-xl flex items-center justify-center bg-primary rounded shadow-md font-semibold text-white cursor-pointer"
            to="/startGame"
          >
            Start New Game
          </Link>
        )}
      </>
    );
  }

  return content;
};

export default GamePage;
