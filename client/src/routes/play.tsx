import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import CryptoWallet from "../components/crypto-wallet-button.js";
import ReactTetris from "../components/react-tetris.js";
import Snake from "../components/snake.js";

export const Route = createFileRoute("/play")({
  component: Play,
});

function Play() {
  const navigate = useNavigate();
  const [play, setPlay] = useState("tetris");

  function handleClick({ game }: { game: string }) {
    navigate({
      to: "/play/$game",
      params: { game: game },
    });
  }
  return (
    <div className="flex">
      <div className="w-1/6 mt-12 text-blue-700 p-4 text-2xl">
        {" "}
        <button
          className="relative px-6 py-2 text-white font-semibold bg-blue-500 rounded-lg overflow-hidden shadow-md transition-all duration-300 ease-in-out
          before:absolute before:inset-0 before:bg-white/20 before:scale-x-0 before:origin-left before:transition-transform before:duration-300 
          hover:before:scale-x-100 hover:text-blue-900 hover:border-blue-500 hover:border-2"
          onClick={() => {
            handleClick({ game: "tetris" });
            setPlay("tetris");
          }}
        >
          Tetris
        </button>
        <button
          className="relative px-6 py-2 text-white font-semibold bg-blue-500 rounded-lg overflow-hidden shadow-md transition-all duration-300 ease-in-out
          before:absolute before:inset-0 before:bg-white/20 before:scale-x-0 before:origin-left before:transition-transform before:duration-300 
          hover:before:scale-x-100 hover:text-blue-900 hover:border-blue-500 hover:border-2 flex mt-4"
          onClick={() => {
            handleClick({ game: "snake" });
            setPlay("snake");
          }}
        >
          Snake
        </button>
      </div>
      <div className="flex-1 bg-gray-100 p-4 text-center text-blue-700 text-2xl">
        {"tetris" === play && <ReactTetris />}
        {"snake" === play && <Snake />}
      </div>
      <div className="w-1/6 mt-12 p-4 text-blue-700 text-2xl">
        <CryptoWallet />
      </div>
    </div>
  );
}
