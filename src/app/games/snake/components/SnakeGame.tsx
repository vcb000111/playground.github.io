'use client';

import { useEffect, useRef } from 'react';

interface SnakeGameProps {
  gridSize: number;
  speed: number;
  snakeColor: string;
  foodColor: string;
  backgroundColor: string;
  isPlaying: boolean;
  onScoreChange: (score: number) => void;
  shouldReset?: boolean;
}

export function SnakeGame({
  gridSize,
  speed,
  snakeColor,
  foodColor,
  backgroundColor,
  isPlaying,
  onScoreChange,
  shouldReset
}: SnakeGameProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameLoopRef = useRef<number>();
  const snakeRef = useRef<{ x: number; y: number }[]>([{ x: 10, y: 10 }]);
  const foodRef = useRef<{ x: number; y: number }>({ x: 5, y: 5 });
  const directionRef = useRef<{ x: number; y: number }>({ x: 1, y: 0 });
  const cellSize = useRef(20);

  // Reset game
  useEffect(() => {
    if (shouldReset) {
      // Reset snake position
      snakeRef.current = [{ x: 10, y: 10 }];
      // Reset direction
      directionRef.current = { x: 1, y: 0 };
      // Reset food position
      foodRef.current = {
        x: Math.floor(Math.random() * gridSize),
        y: Math.floor(Math.random() * gridSize)
      };
      // Reset score
      onScoreChange(0);
    }
  }, [shouldReset, gridSize, onScoreChange]);

  // Khởi tạo game
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    // Đặt kích thước canvas cố định một lần
    const size = gridSize * cellSize.current;
    canvas.width = size;
    canvas.height = size;
    
    // Để canvas responsive theo container
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.display = 'block';
    canvas.style.objectFit = 'contain';

    // Vẽ khung game
    const drawGame = () => {
      // Vẽ nền
      context.fillStyle = backgroundColor;
      context.fillRect(0, 0, canvas.width, canvas.height);

      // Vẽ rắn
      context.fillStyle = snakeColor;
      snakeRef.current.forEach(segment => {
        context.fillRect(
          segment.x * cellSize.current,
          segment.y * cellSize.current,
          cellSize.current - 1,
          cellSize.current - 1
        );
      });

      // Vẽ mồi
      context.fillStyle = foodColor;
      context.fillRect(
        foodRef.current.x * cellSize.current,
        foodRef.current.y * cellSize.current,
        cellSize.current - 1,
        cellSize.current - 1
      );
    };

    // Vẽ trạng thái ban đầu
    drawGame();

    // Game loop
    const gameLoop = () => {
      if (!isPlaying) return;

      // Di chuyển rắn
      const head = { ...snakeRef.current[0] };
      head.x += directionRef.current.x;
      head.y += directionRef.current.y;

      // Kiểm tra va chạm với tường
      if (head.x < 0) head.x = gridSize - 1;
      if (head.x >= gridSize) head.x = 0;
      if (head.y < 0) head.y = gridSize - 1;
      if (head.y >= gridSize) head.y = 0;

      // Kiểm tra va chạm với thân rắn
      const hasCollision = snakeRef.current.some(segment => 
        segment.x === head.x && segment.y === head.y
      );

      if (hasCollision) {
        // Game over
        if (gameLoopRef.current) {
          clearInterval(gameLoopRef.current);
        }
        onScoreChange(0);
        return;
      }

      // Thêm đầu mới
      snakeRef.current.unshift(head);

      // Kiểm tra ăn mồi
      if (head.x === foodRef.current.x && head.y === foodRef.current.y) {
        // Tăng điểm
        onScoreChange(snakeRef.current.length - 1);
        // Tạo mồi mới
        foodRef.current = {
          x: Math.floor(Math.random() * gridSize),
          y: Math.floor(Math.random() * gridSize)
        };
      } else {
        // Nếu không ăn mồi, xóa đuôi
        snakeRef.current.pop();
      }

      // Vẽ lại game
      drawGame();
    };

    // Xử lý phím
    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          if (directionRef.current.y !== 1) {
            directionRef.current = { x: 0, y: -1 };
          }
          break;
        case 'ArrowDown':
          if (directionRef.current.y !== -1) {
            directionRef.current = { x: 0, y: 1 };
          }
          break;
        case 'ArrowLeft':
          if (directionRef.current.x !== 1) {
            directionRef.current = { x: -1, y: 0 };
          }
          break;
        case 'ArrowRight':
          if (directionRef.current.x !== -1) {
            directionRef.current = { x: 1, y: 0 };
          }
          break;
      }
    };

    // Thêm event listener
    window.addEventListener('keydown', handleKeyPress);

    // Bắt đầu game loop
    if (isPlaying) {
      gameLoopRef.current = window.setInterval(gameLoop, speed);
    }

    // Cleanup
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }
    };
  }, [gridSize, speed, snakeColor, foodColor, backgroundColor, isPlaying, onScoreChange]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
    />
  );
} 