import { useEffect, useState } from "react";
import Tetris from "react-tetris";

const ReactTetris = () => {
  const [start, setStart] = useState<boolean>(false);

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
                <div className="flex gap-4 items-start">
                  <div className="flex flex-col mt-6 items-center">
                    <p className="text-xl uppercase mb-2">Hold</p>
                    <div className="bg-gray-100 p-2 rounded">
                      <HeldPiece />
                    </div>
                  </div>
                  <div
                    className="bg-gray-100 p-2 rounded relative"
                    style={{ transform: "scale(0.85)" }}
                  >
                    <Gameboard />
                    {state === "LOST" && (
                      <div
                        className="absolute mt-2 inset-0 bg-black flex flex-col items-center justify-center"
                        style={{ height: "100%" }}
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
                  <div className="flex flex-col mt-6 items-center">
                    <p className="text-xl uppercase mb-2">Next</p>
                    <div
                      className="bg-gray-100 p-2 rounded overflow-hidden"
                      style={{ height: "298px" }}
                    >
                      <PieceQueue />
                    </div>
                    <div className="mt-2 bg-gray-100 p-2 rounded w-full">
                      <div className="flex flex-col">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xl uppercase tracking-wide">
                            points
                          </span>
                          <span className="text-xl font-semibold text-gray-500">
                            {points.toString().padStart(4, "0")}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-xl uppercase tracking-wide">
                            lines
                          </span>
                          <span className="text-xl font-semibold text-gray-500">
                            {linesCleared.toString().padStart(4, "0")}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Tetris>
        </div>
      )}
    </div>
  );
};

export default ReactTetris;
