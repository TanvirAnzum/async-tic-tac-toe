import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { fetchGames } from "../apis/gamesApi";
import GameCard from "../components/GameCard";
import Navigation from "../components/Navigation";
import { AuthContext } from "../contexts/AuthContext";
import Loader from "../ui/Loader";

const Home = () => {
  const { auth } = useContext(AuthContext);

  const { data, error, isError, isLoading } = useQuery({
    queryKey: ["games", auth.username],
    queryFn: () => fetchGames(auth.username),
  });

  console.log(data);

  let content;

  if (!isError && isLoading) content = <Loader />;
  if (isError && !isLoading) content = <div>{error}</div>;
  if (!isError && !isLoading && !data?.length)
    content = (
      <div className="w-full flex flex-col items-center justify-center gap-10 min-h-[500px] mt-5">
        <h1 className="font-bilbo text-[4em] text-center">No Games Found</h1>
        <Link
          to="/startGame"
          className="w-full h-[56px] text-xl flex items-center justify-center bg-primary rounded shadow-md font-semibold text-white cursor-pointer"
        >
          Start a new game
        </Link>
      </div>
    );
  if (!isError && !isLoading && data?.length > 0) {
    content = (
      <div className="w-full mt-10">
        {data?.map((game) => (
          <GameCard key={game._id} game={game} />
        ))}
      </div>
    );
  }
  return (
    <>
      <Navigation />
      {content}
      <div className="fixed bottom-10 right-10">
        <Link
          to={"/startGame"}
          className="bg-[#270F36] p-4 text-white rounded-xl font-bold"
        >
          + New Game
        </Link>
      </div>
    </>
  );
};

export default Home;
