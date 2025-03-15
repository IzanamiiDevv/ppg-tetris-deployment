import { createFileRoute } from "@tanstack/react-router";
import CryptoWallet from "../components/crypto-wallet-button.js";
import ReactTetris from "../components/react-tetris.js";

export const Route = createFileRoute("/play")({
  component: Play,
});

function Play() {
  return (
    <div className="flex">
      <div className="w-1/6 mt-12 text-blue-700 p-4 text-2xl">Tetris</div>
      <div className="flex-1 bg-gray-100 p-4 text-center text-blue-700 text-2xl">
        <ReactTetris />
      </div>
      <div className="w-1/6 mt-12 p-4 text-blue-700 text-2xl">
        <CryptoWallet />
      </div>
    </div>
  );
}
