import { useEffect, useState } from "react";
import Tetris from "react-tetris";

const ReactTetris = () => {
  const [start, setStart] = useState<boolean>(false);
  const [gameHeight, setGameHeight] = useState<number>(0);

  useEffect(() => {
    // Prevent default behavior for game control keys
    const handleKeyDown = (event: KeyboardEvent) => {
      const blockedKeys = [
        "ArrowUp",
        "ArrowDown",
        "ArrowLeft",
        "ArrowRight",
        " ",
      ];
      if (blockedKeys.includes(event.key)) {
        event.preventDefault();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (start) {
      const style = document.createElement("style");
      style.innerHTML = `
        .game-board {
          display: grid !important;
          grid-template-rows: repeat(1, 1fr) !important;
          height: auto !important;
          overflow: visible !important;
        }
        .game-board > div {
          position: relative !important;
          height: auto !important;
          aspect-ratio: 1/2;
        }
        .tetris-piece {
          position: absolute !important;
          width: 100% !important;
          height: 100% !important;
          box-sizing: border-box !important;
          border: 1px solid rgba(255, 255, 255, 0.2) !important;
        }
      `;
      document.head.appendChild(style);

      setTimeout(() => {
        const board = document.querySelector(".game-board");
        if (board) {
          setGameHeight(board.clientHeight);
        }
      }, 100);

      return () => {
        document.head.removeChild(style);
      };
    }
  }, [start]);

  return (
    <div className="flex flex-col items-center font-pixelify text-gray-600">
      <h1 className="text-2xl font-bold mb-4 text-gray-700">Tetris</h1>

      {!start ? (
        <button
          onClick={() => setStart(true)}
          className="relative px-6 py-2 mt-4 text-white font-semibold bg-green-500 rounded-lg overflow-hidden shadow-md transition-all duration-300 ease-in-out
        before:absolute before:inset-0 before:bg-white/20 before:scale-x-0 before:origin-left before:transition-transform before:duration-300 
        hover:before:scale-x-100 hover:text-green-900 hover:border-green-500 hover:border-2"
        >
          Start Game
        </button>
      ) : (
        <div className="relative">
          <Tetris
            keyboardControls={{
              down: "MOVE_DOWN",
              left: "MOVE_LEFT",
              right: "MOVE_RIGHT",
              space: "HARD_DROP",
              z: "FLIP_COUNTERCLOCKWISE",
              x: "FLIP_CLOCKWISE",
              up: "FLIP_CLOCKWISE",
              p: "TOGGLE_PAUSE",
              c: "HOLD",
              shift: "HOLD",
            }}
          >
            {({
              HeldPiece,
              Gameboard,
              PieceQueue,
              points,
              linesCleared,
              state,
              controller,
            }) => (
              <div className="flex flex-col items-center">
                <div className="flex justify-between w-full max-w-xs text-sm mb-4">
                  <div className="text-center">
                    <p className="uppercase tracking-wide">points</p>
                    <p className="text-lg font-semibold text-gray-500">
                      {points.toString().padStart(4, "0")}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="uppercase tracking-wide">lines</p>
                    <p className="text-lg font-semibold text-gray-500">
                      {linesCleared.toString().padStart(4, "0")}
                    </p>
                  </div>
                </div>
                <div className="flex gap-8 items-start">
                  <div className="flex flex-col items-center">
                    <p className="text-sm uppercase mb-2">Hold</p>
                    <div className="bg-gray-100 p-2 rounded">
                      <HeldPiece />
                    </div>
                  </div>
                  <div className="bg-gray-100 p-2 rounded relative">
                    <Gameboard />
                    {state === "LOST" && (
                      <div
                        className="absolute mt-2 inset-0 bg-black flex flex-col items-center justify-center"
                        style={{ height: gameHeight || "100%" }}
                      >
                        <h2 className="text-xl font-semibold text-white mb-4">
                          Game Over
                        </h2>
                        <button
                          onClick={controller.restart}
                          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                        >
                          New Game
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col items-center">
                    <p className="text-sm uppercase mb-2">Next</p>
                    <div className="bg-gray-100 p-2 rounded">
                      <PieceQueue />
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex gap-4">
                  <button
                    onClick={
                      state === "PAUSED" ? controller.resume : controller.pause
                    }
                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-1 rounded text-sm transition"
                  >
                    {state === "PAUSED" ? "Resume" : "Pause"}
                  </button>
                  <button
                    onClick={() => {
                      controller.restart();
                      setStart(false);
                    }}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-1 rounded text-sm transition"
                  >
                    Exit
                  </button>
                </div>
              </div>
            )}
          </Tetris>
        </div>
      )}

      <div className="mt-6 max-w-md text-sm text-gray-500">
        <h3 className="font-semibold mb-2">Controls:</h3>
        <div className="grid grid-cols-2 gap-2">
          <div>← → : Move</div>
          <div>↓ : Soft Drop</div>
          <div>↑ or X : Rotate CW</div>
          <div>Z : Rotate CCW</div>
          <div>Space : Hard Drop</div>
          <div>C or Shift : Hold</div>
          <div>P : Pause</div>
        </div>
      </div>
    </div>
  );
};

export default ReactTetris;
