import { useState, useEffect, useCallback, useRef } from 'react';

type Point = { x: number; y: number };

const GRID_SIZE = 22;
const INITIAL_SNAKE = [{ x: 10, y: 10 }, { x: 10, y: 11 }, { x: 10, y: 12 }];
const INITIAL_DIRECTION = { x: 0, y: -1 };
const TICK_RATE = 110;

export function SnakeGame() {
  const [snake, setSnake] = useState<Point[]>(INITIAL_SNAKE);
  const [direction, setDirection] = useState<Point>(INITIAL_DIRECTION);
  const [food, setFood] = useState<Point>({ x: 5, y: 5 });
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  
  const directionRef = useRef(direction);

  useEffect(() => {
    directionRef.current = direction;
  }, [direction]);

  const generateFood = useCallback((currentSnake: Point[]) => {
    let newFood: Point;
    while (true) {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE)
      };
      const isOnSnake = currentSnake.some(segment => segment.x === newFood.x && segment.y === newFood.y);
      if (!isOnSnake) break;
    }
    return newFood;
  }, []);

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setScore(0);
    setGameOver(false);
    setFood(generateFood(INITIAL_SNAKE));
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent default scrolling for game keys
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", 'w', 'a', 's', 'd'].includes(e.key)) {
        e.preventDefault();
      }

      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          if (directionRef.current.y === 0) setDirection({ x: 0, y: -1 });
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          if (directionRef.current.y === 0) setDirection({ x: 0, y: 1 });
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          if (directionRef.current.x === 0) setDirection({ x: -1, y: 0 });
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          if (directionRef.current.x === 0) setDirection({ x: 1, y: 0 });
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown, { passive: false });
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (gameOver) return;

    const moveSnake = () => {
      setSnake((prev) => {
        const head = prev[0];
        const newHead = { x: head.x + directionRef.current.x, y: head.y + directionRef.current.y };

        // Wall collision
        if (newHead.x < 0 || newHead.x >= GRID_SIZE || newHead.y < 0 || newHead.y >= GRID_SIZE) {
          setGameOver(true);
          return prev;
        }

        // Self collision
        if (prev.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
          setGameOver(true);
          return prev;
        }

        const newSnake = [newHead, ...prev];

        // Food consumption
        if (newHead.x === food.x && newHead.y === food.y) {
          setScore(s => s + 100); // 100 pts per item for retro aesthetic
          setFood(generateFood(newSnake));
        } else {
          newSnake.pop(); // Remove tail if no food eaten
        }

        return newSnake;
      });
    };

    const interval = setInterval(moveSnake, TICK_RATE);
    return () => clearInterval(interval);
  }, [gameOver, food, generateFood]);

  const grid = Array.from({ length: GRID_SIZE }, () => Array.from({ length: GRID_SIZE }, () => 0));

  return (
    <div className="flex flex-col items-center justify-center p-6 border-2 border-[#0ff] shadow-[0_0_25px_rgba(0,255,255,0.2)] bg-[#050505] relative w-full max-w-lg">
      <div className="absolute top-0 left-0 -mt-[14px] bg-black border border-[#0ff] px-2 text-[#0ff] text-xs">
        MOD: SERPENT
      </div>
      
      <div className="w-full flex justify-between items-end mb-4 border-b-2 border-[#f0f] pb-2">
        <span className="text-[#0ff] text-2xl" data-text="SCORE">
          PTS: {score.toString().padStart(6, '0')}
        </span>
        <span className="text-[#f0f] text-2xl glitch-text" data-text="SERPENT_SYS">
          SERPENT_SYS
        </span>
      </div>

      <div 
        className="grid bg-[#020202] border border-[#f0f] shadow-[0_0_20px_rgba(255,0,255,0.2)] crt-flicker relative"
        style={{
          gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
          width: '100%',
          aspectRatio: '1/1'
        }}
      >
        {grid.map((row, y) =>
          row.map((_, x) => {
            const isSnake = snake.some(s => s.x === x && s.y === y);
            const isHead = snake[0].x === x && snake[0].y === y;
            const isFood = food.x === x && food.y === y;

            return (
              <div
                key={`${x}-${y}`}
                className={`
                  w-full h-full border-[0.5px] border-[#0a0a0a]
                  ${isHead ? 'bg-white shadow-[0_0_12px_#fff] z-10' :
                    isSnake ? 'bg-[#f0f] shadow-[0_0_6px_#f0f]' :
                    isFood ? 'bg-[#0ff] shadow-[0_0_12px_#0ff] animate-pulse' : ''}
                `}
              />
            );
          })
        )}

        {gameOver && (
          <div className="absolute inset-0 bg-[#000]/90 backdrop-blur-sm flex flex-col items-center justify-center z-20">
            <h2 className="text-4xl text-red-500 mb-2 glitch-text tracking-widest" data-text="FATAL_ERROR">
              FATAL_ERROR
            </h2>
            <p className="text-[#0ff] mb-8 text-xl">END_SCORE: {score.toString().padStart(6, '0')}</p>
            <button
              onClick={resetGame}
              className="px-6 py-3 border-2 border-[#0ff] text-[#0ff] hover:bg-[#0ff] hover:text-black hover:shadow-[0_0_20px_#0ff] font-bold tracking-widest transition-all text-xl focus:outline-none"
            >
              [ REBOOT_GRID ]
            </button>
          </div>
        )}
      </div>

      <div className="w-full mt-4 flex justify-between text-xs text-[#0ff]/50">
        <span>CTRL_MODE: WASD / ARROWS</span>
        <span>SYS_STATUS: {gameOver ? 'HALTED' : 'RUNNING'}</span>
      </div>
    </div>
  );
}
