import { useEffect, useState } from "react";
import Tetris from "react-tetris";

const ReactTetris = () => {
  const [start, setStart] = useState<boolean>(false);

  useEffect(() => {
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
          className="bg-green-500 text-white px-6 py-3 rounded text-lg hover:bg-green-600 transition"
        >
          Start Game
        </button>
      ) : (
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
              <div className="flex justify-between w-full max-w-xs text-sm">
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
              <div className="flex gap-8">
                <div className="scale-75">
                  <p className="text-sm uppercase">Hold</p>
                  <HeldPiece />
                </div>
                <div className="scale-75">
                  <Gameboard />
                </div>
                <div className="flex flex-col items-center scale-75">
                  <p className="text-sm uppercase">Next</p>
                  <PieceQueue />
                </div>
              </div>
              {state === "LOST" && (
                <div className="text-center">
                  <h2 className="text-xl font-semibold text-gray-700">
                    Game Over
                  </h2>
                  <button
                    onClick={controller.restart}
                    className="bg-blue-500 text-white px-4 py-2 mt-2 rounded hover:bg-blue-600 transition"
                  >
                    New Game
                  </button>
                </div>
              )}
            </div>
          )}
        </Tetris>
      )}
    </div>
  );
};

export default ReactTetris;
