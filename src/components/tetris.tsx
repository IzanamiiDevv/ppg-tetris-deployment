import { createContext, useContext, useEffect, useRef, useState } from "react";
import Tetris from "react-tetris";
import "../tetris-game.css";

// Create context for Tetris game state and configuration
export const TetrisContext = createContext({
  level: 1,
  gameTime: 0,
  gameStarted: false,
  controller: null,
  gameState: null,
  resetGame: () => {},
  startGame: () => {},
  speedModifier: 1,
});

export const useTetris = () => useContext(TetrisContext);

const TetrisGame = ({
  // Props with default values for easy customization
  initialLevel = 1,
  speedIncreaseInterval = 60000, // 1 minute in milliseconds
  speedIncreaseFactor = 0.9, // 10% speed increase
  maxLevel = 10,
  showHoldPiece = false,
  nextPiecesCount = 2,
  boardBackgroundColor = "#e8f4f8",
  showOpponent = false,
  // Callback functions for extensibility
  onGameStart = () => {},
  onGameOver = () => {},
  onLevelUp = () => {},
  onLineCleared = () => {},
}) => {
  const [gameStarted, setGameStarted] = useState(false);
  const [level, setLevel] = useState(initialLevel);
  const [gameTime, setGameTime] = useState(0);
  const [speedModifier, setSpeedModifier] = useState(1);

  // Refs to store controller and state
  const gameControllerRef = useRef(null);
  const gameStateRef = useRef(null);
  useEffect(() => {
    const styleElement = document.createElement("style");
    styleElement.textContent = `
      .game-board {
        background-color: ${boardBackgroundColor} !important;
      }
      .game-block {
        box-sizing: border-box;
      }
    `;
    document.head.appendChild(styleElement);

    return () => {
      document.head.removeChild(styleElement);
    };
  }, [boardBackgroundColor]);

  // Game timer and speed increase logic
  useEffect(() => {
    if (!gameStarted) return;

    const timer = setInterval(() => {
      setGameTime((prevTime) => {
        const newTime = prevTime + 1;

        // Increase speed every minute (60 seconds)
        if (newTime > 0 && newTime % (speedIncreaseInterval / 1000) === 0) {
          // Check if we haven't reached max level
          if (level < maxLevel) {
            const newLevel = level + 1;
            setLevel(newLevel);
            setSpeedModifier((prevSpeed) => prevSpeed * speedIncreaseFactor);

            // Call the levelUp callback
            onLevelUp();
          }
        }

        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [
    gameStarted,
    level,
    maxLevel,
    speedIncreaseInterval,
    speedIncreaseFactor,
    onLevelUp,
  ]);

  // Format time display
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  // Reset game
  const resetGame = () => {
    setGameStarted(false);
    setLevel(initialLevel);
    setGameTime(0);
    setSpeedModifier(1);
  };

  // Start game
  const startGame = () => {
    setGameStarted(true);
    onGameStart();
  };

  // Customize the PieceQueue to show only the specified number of next pieces
  const CustomPieceQueue = ({ pieces }: { pieces: React.ComponentType[] }) => {
    // Only show the first n pieces
    const visiblePieces = pieces.slice(0, nextPiecesCount);

    return (
      <div className="custom-piece-queue">
        {visiblePieces.map((Piece, i) => (
          <div key={i} className="next-piece-container">
            <Piece />
          </div>
        ))}
      </div>
    );
  };

  // Create a placeholder for opponent's game
  const OpponentPlaceholder = () => (
    <div className="opponent-placeholder">
      <div className="opponent-board-placeholder">
        <h3>Opponent</h3>
      </div>
      <div className="opponent-stats">
        <div className="opponent-score">
          <span>Score:</span>
          <span>0000</span>
        </div>
        <div className="opponent-lines">
          <span>Lines:</span>
          <span>0000</span>
        </div>
      </div>
    </div>
  );

  return (
    <TetrisContext.Provider
      value={{
        level,
        gameTime,
        gameStarted,
        controller: gameControllerRef.current,
        gameState: gameStateRef.current,
        resetGame,
        startGame,
        speedModifier,
      }}
    >
      <div className="tetris-game">
        <h1 className="tetris-title">Tetris</h1>

        {!gameStarted ? (
          <button onClick={startGame} className="start-button">
            Start Game
          </button>
        ) : (
          <div className="game-container">
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
                pieces,
              }) => {
                // Store controller and state in refs for access from context

                // Handle game over

                return (
                  <div className="game-layout">
                    {/* Left side - Opponent or empty placeholder */}
                    <div className="left-panel">
                      {showOpponent ? (
                        <OpponentPlaceholder />
                      ) : (
                        showHoldPiece && (
                          <div className="hold-piece-container">
                            <h3>Hold</h3>
                            <HeldPiece />
                          </div>
                        )
                      )}
                    </div>

                    {/* Center - Game board */}
                    <div className="center-panel">
                      <Gameboard />
                      {state === "LOST" && (
                        <div className="game-over-overlay">
                          <h2>Game Over</h2>
                          <button
                            onClick={() => {
                              controller.restart();
                              resetGame();
                              startGame();
                            }}
                          >
                            New Game
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Right side - Stats and next pieces */}
                    <div className="right-panel">
                      <div className="stats-container">
                        <div className="stat-row">
                          <span>Score:</span>
                          <span>{points.toString().padStart(4, "0")}</span>
                        </div>
                        <div className="stat-row">
                          <span>Lines:</span>
                          <span>
                            {linesCleared.toString().padStart(4, "0")}
                          </span>
                        </div>
                        <div className="stat-row">
                          <span>Level:</span>
                          <span>{level}</span>
                        </div>
                        <div className="stat-row">
                          <span>Time:</span>
                          <span>{formatTime(gameTime)}</span>
                        </div>
                      </div>

                      <div className="next-pieces">
                        <h3>Next</h3>
                        <CustomPieceQueue pieces={pieces} />
                      </div>
                    </div>
                  </div>
                );
              }}
            </Tetris>
          </div>
        )}
      </div>
    </TetrisContext.Provider>
  );
};

export default TetrisGame;
