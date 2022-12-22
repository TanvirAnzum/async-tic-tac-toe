import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const GameCard = ({ game }) => {
  const { auth } = useContext(AuthContext);
  const { initiator, opponent, timeStamp, nextMove, _id, status } = game || {};
  const date = new Date(timeStamp);

  return (
    <div className="w-full p-5 shadow-lg shadow-slate-600 rounded-xl flex flex-col gap-5 mb-4">
      <h1 className="text-[24px] font-semibold">{`Game with ${
        auth.username === initiator ? opponent : initiator
      }`}</h1>
      <p className="text-[16px]">
        {status === "running"
          ? nextMove === auth.username
            ? "Its Your Turn"
            : "Wait for their move"
          : status}
      </p>
      <p className="text-[16px]">{date.toLocaleString()}</p>
      <Link
        to={`/gamePage/${_id}`}
        className="w-full h-[56px] text-xl flex items-center justify-center bg-primary rounded shadow-md font-semibold text-white cursor-pointer"
      >
        {status === "running"
          ? nextMove === auth.username
            ? "Play!"
            : "View Game"
          : "View Game"}
      </Link>
    </div>
  );
};

export default GameCard;
