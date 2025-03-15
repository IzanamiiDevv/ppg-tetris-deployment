import { createFileRoute } from "@tanstack/react-router";
import CryptoWallet from "../components/crypto-wallet-button.js";
import ReactTetris from "../components/react-tetris.js";

export const Route = createFileRoute("/play")({
  component: Play,
});

function Play() {
  return (
    <div className="flex">
      <div className="w-1/6 mt-12 text-blue-700 p-4 text-2xl">
        {" "}
        <button
          className="relative px-6 py-2 text-white font-semibold bg-blue-500 rounded-lg overflow-hidden shadow-md transition-all duration-300 ease-in-out
        before:absolute before:inset-0 before:bg-white/20 before:scale-x-0 before:origin-left before:transition-transform before:duration-300 
        hover:before:scale-x-100 hover:text-blue-900 hover:border-blue-500 hover:border-2"
        >
          Tetris
        </button>
        <button
          className="relative px-6 py-2 mt-4 text-white font-semibold bg-blue-500 rounded-lg overflow-hidden shadow-md transition-all duration-300 ease-in-out
        before:absolute before:inset-0 before:bg-white/20 before:scale-x-0 before:origin-left before:transition-transform before:duration-300 
        hover:before:scale-x-100 hover:text-blue-900 hover:border-blue-500 hover:border-2"
        >
          In-progress
        </button>
      </div>
      <div className="flex-1 bg-gray-100 p-4 text-center text-blue-700 text-2xl">
        <ReactTetris />
      </div>
      <div className="w-1/6 mt-12 p-4 text-blue-700 text-2xl">
        <CryptoWallet />
      </div>
    </div>
  );
}
