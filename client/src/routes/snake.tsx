import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/snake")({
  component: Snake,
});

export default function Snake() {
  const GAME_PIXEL_COUNT = 40;
  const SQUARE_OF_GAME_PIXEL_COUNT = Math.pow(GAME_PIXEL_COUNT, 2);

  const [totalFoodAte, setTotalFoodAte] = useState(0);
  const [totalDistanceTravelled, setTotalDistanceTravelled] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  // Constants for directions
  const LEFT_DIR = 37;
  const UP_DIR = 38;
  const RIGHT_DIR = 39;
  const DOWN_DIR = 40;

  const [snakeCurrentDirection, setSnakeCurrentDirection] = useState(RIGHT_DIR);

  const [snakeLength, setSnakeLength] = useState(1000);

  const gameContainerRef = useRef<HTMLDivElement | null>(null);
  const currentSnakeHeadPositionRef = useRef(SQUARE_OF_GAME_PIXEL_COUNT / 2);
  const currentFoodPositionRef = useRef(0);
  const gameBoardPixelsRef = useRef<HTMLDivElement[]>([]);
  const moveSnakeIntervalRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const gameContainer = gameContainerRef.current;
    if (!gameContainer) return;

    let gamePixelDivs = "";
    for (let i = 1; i <= SQUARE_OF_GAME_PIXEL_COUNT; ++i) {
      gamePixelDivs += `<div class="gameBoardPixel" id="pixel${i}"></div>`;
    }
    gameContainer.innerHTML = gamePixelDivs;

    gameBoardPixelsRef.current = Array.from(
      document.getElementsByClassName("gameBoardPixel")
    ) as HTMLDivElement[];

    createFood();
    startGame();

    return () => {
      if (moveSnakeIntervalRef.current) {
        clearInterval(moveSnakeIntervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      e.preventDefault();

      switch (e.key) {
        case "ArrowLeft":
          changeDirection(LEFT_DIR);
          break;
        case "ArrowUp":
          changeDirection(UP_DIR);
          break;
        case "ArrowRight":
          changeDirection(RIGHT_DIR);
          break;
        case "ArrowDown":
          changeDirection(DOWN_DIR);
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [snakeCurrentDirection]);

  useEffect(() => {
    if (moveSnakeIntervalRef.current) {
      clearInterval(moveSnakeIntervalRef.current);
    }
    moveSnakeIntervalRef.current = setInterval(moveSnake, 80);

    return () => clearInterval(moveSnakeIntervalRef.current);
  }, [snakeCurrentDirection]);

  const createFood = () => {
    const gameBoardPixels = gameBoardPixelsRef.current;
    if (gameBoardPixels[currentFoodPositionRef.current]) {
      gameBoardPixels[currentFoodPositionRef.current].classList.remove("food");
    }

    const newFoodPosition = Math.floor(
      Math.random() * SQUARE_OF_GAME_PIXEL_COUNT
    );
    gameBoardPixels[newFoodPosition].classList.add("food");
    currentFoodPositionRef.current = newFoodPosition;
  };

  // Change snake direction
  const changeDirection = (newDirectionCode: number) => {
    setSnakeCurrentDirection((prev) => {
      if (
        (newDirectionCode === LEFT_DIR && prev !== RIGHT_DIR) ||
        (newDirectionCode === UP_DIR && prev !== DOWN_DIR) ||
        (newDirectionCode === RIGHT_DIR && prev !== LEFT_DIR) ||
        (newDirectionCode === DOWN_DIR && prev !== UP_DIR)
      ) {
        return newDirectionCode;
      }
      return prev;
    });
  };

  // Move snake
  const moveSnake = () => {
    const gameBoardPixels = gameBoardPixelsRef.current;
    let currentSnakeHeadPosition = currentSnakeHeadPositionRef.current;

    // Calculate new head position based on direction
    switch (snakeCurrentDirection) {
      case LEFT_DIR: {
        --currentSnakeHeadPosition;
        const isSnakeHeadAtLastGameBoardPixelTowardsLeft =
          currentSnakeHeadPosition % GAME_PIXEL_COUNT ===
            GAME_PIXEL_COUNT - 1 || currentSnakeHeadPosition < 0;
        if (isSnakeHeadAtLastGameBoardPixelTowardsLeft) {
          currentSnakeHeadPosition =
            currentSnakeHeadPosition + GAME_PIXEL_COUNT;
        }
        break;
      }
      case UP_DIR: {
        currentSnakeHeadPosition = currentSnakeHeadPosition - GAME_PIXEL_COUNT;
        const isSnakeHeadAtLastGameBoardPixelTowardsUp =
          currentSnakeHeadPosition < 0;
        if (isSnakeHeadAtLastGameBoardPixelTowardsUp) {
          currentSnakeHeadPosition =
            currentSnakeHeadPosition + SQUARE_OF_GAME_PIXEL_COUNT;
        }
        break;
      }
      case RIGHT_DIR: {
        ++currentSnakeHeadPosition;
        const isSnakeHeadAtLastGameBoardPixelTowardsRight =
          currentSnakeHeadPosition % GAME_PIXEL_COUNT === 0;
        if (isSnakeHeadAtLastGameBoardPixelTowardsRight) {
          currentSnakeHeadPosition =
            currentSnakeHeadPosition - GAME_PIXEL_COUNT;
        }
        break;
      }
      case DOWN_DIR: {
        currentSnakeHeadPosition = currentSnakeHeadPosition + GAME_PIXEL_COUNT;
        const isSnakeHeadAtLastGameBoardPixelTowardsDown =
          currentSnakeHeadPosition > SQUARE_OF_GAME_PIXEL_COUNT - 1;
        if (isSnakeHeadAtLastGameBoardPixelTowardsDown) {
          currentSnakeHeadPosition =
            currentSnakeHeadPosition - SQUARE_OF_GAME_PIXEL_COUNT;
        }
        break;
      }
      default:
        break;
    }

    // Get next snake head pixel
    const nextSnakeHeadPixel = gameBoardPixels[currentSnakeHeadPosition];

    // Check if snake collided with itself
    if (nextSnakeHeadPixel.classList.contains("snakeBodyPixel")) {
      clearInterval(moveSnakeIntervalRef.current);
      setGameOver(true);
      alert(
        `You have ate ${totalFoodAte} food by travelling ${totalDistanceTravelled} blocks.`
      );
      return;
    }

    // Add new head
    nextSnakeHeadPixel.classList.add("snakeBodyPixel");

    // Remove tail after delay
    setTimeout(() => {
      nextSnakeHeadPixel.classList.remove("snakeBodyPixel");
    }, snakeLength);

    // Update distance travelled
    setTotalDistanceTravelled((prev) => prev + 1);

    // Check if snake ate food
    if (currentSnakeHeadPosition === currentFoodPositionRef.current) {
      setTotalFoodAte((prev) => prev + 1);

      // Increase snake length
      setSnakeLength((prev) => prev + 100);

      // Create new food
      createFood();
    }

    // Update snake head position
    currentSnakeHeadPositionRef.current = currentSnakeHeadPosition;
  };

  // Start the game
  const startGame = () => {
    moveSnakeIntervalRef.current = setInterval(moveSnake, 80);
  };

  const resetGame = () => {
    const gameBoardPixels = gameBoardPixelsRef.current;
    for (let i = 0; i < gameBoardPixels.length; i++) {
      gameBoardPixels[i].classList.remove("snakeBodyPixel");
      gameBoardPixels[i].classList.remove("food");
    }

    setTotalFoodAte(0);
    setTotalDistanceTravelled(0);
    setSnakeLength(1000);
    setSnakeCurrentDirection(RIGHT_DIR);
    setGameOver(false);

    currentSnakeHeadPositionRef.current = SQUARE_OF_GAME_PIXEL_COUNT / 2;

    createFood();

    startGame();
  };

  return (
    <div className="flex flex-col items-center">
      <div
        ref={gameContainerRef}
        id="gameContainer"
        className="w-[40vw] h-[40vw] bg-indigo-600 border-8 border-slate-500 rounded-lg shadow-lg grid grid-cols-40"
        style={{
          gridTemplateColumns: `repeat(${GAME_PIXEL_COUNT}, 1fr)`,
          gridTemplateRows: `repeat(${GAME_PIXEL_COUNT}, 1fr)`,
        }}
      ></div>

      <div className="w-2/5 flex justify-around mt-4">
        <div className="border-4 border-slate-500 text-gray-300 bg-gray-900 p-4 w-2/5 rounded-lg shadow-lg">
          Food: <span id="pointsEarned">{totalFoodAte}</span>
        </div>
        <div className="border-4 border-slate-500 text-gray-300 bg-gray-900 p-4 w-2/5 rounded-lg shadow-lg">
          Blocks: <span id="blocksTravelled">{totalDistanceTravelled}</span>
        </div>
      </div>

      <div className="w-4/5 mt-8 flex justify-evenly items-center">
        <button
          id="leftButton"
          className="text-5xl"
          onClick={() => changeDirection(LEFT_DIR)}
        >
          ◀️
        </button>
        <div className="flex flex-col">
          <button
            id="upButton"
            className="text-5xl"
            onClick={() => changeDirection(UP_DIR)}
          >
            🔼
          </button>
          <button
            id="downButton"
            className="text-5xl"
            onClick={() => changeDirection(DOWN_DIR)}
          >
            🔽
          </button>
        </div>
        <button
          id="rightButton"
          className="text-5xl"
          onClick={() => changeDirection(RIGHT_DIR)}
        >
          ▶️
        </button>
      </div>

      {gameOver && (
        <button
          className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
          onClick={resetGame}
        >
          Play Again
        </button>
      )}
      <style>{`
        .gameBoardPixel {
          width: 100%;
          height: 100%;
        }
        
        .snakeBodyPixel {
          background-color: #50C878;
          box-shadow: 0 0 5px #50C878;
          border-radius: 20%;
        }
        
        .food {
          background-color: #FF0800;
          border-radius: 50%;
        }
      `}</style>
    </div>
  );
}
