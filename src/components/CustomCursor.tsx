
import React, { useEffect, useState } from 'react';
import { egg } from 'lucide-react';

type Position = {
  x: number;
  y: number;
};

type EggState = Position & {
  active: boolean;
  id: number;
};

const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [isClicking, setIsClicking] = useState<boolean>(false);
  const [eggs, setEggs] = useState<EggState[]>([]);
  const [nextId, setNextId] = useState<number>(0);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => {
      setIsClicking(true);
      
      // Create a new egg
      const newEgg: EggState = {
        x: position.x,
        y: position.y,
        active: true,
        id: nextId,
      };
      
      setEggs((prevEggs) => [...prevEggs, newEgg]);
      setNextId((prevId) => prevId + 1);
      
      // Remove the egg after animation completes
      setTimeout(() => {
        setEggs((prevEggs) => prevEggs.filter((egg) => egg.id !== newEgg.id));
      }, 1000);
    };

    const handleMouseUp = () => {
      setIsClicking(false);
    };

    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [position, nextId]);

  return (
    <>
      <div
        className={`fixed pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center ${
          isClicking ? 'animate-lay-egg' : 'animate-bounce'
        }`}
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10,20 C10,24.4183 13.5817,28 18,28 C22.4183,28 26,24.4183 26,20 C26,15.5817 22.4183,8 18,8 C13.5817,8 10,15.5817 10,20 Z"
            fill="#FF9800"
            stroke="#FFC107"
            strokeWidth="1"
          />
          <circle cx="14" cy="18" r="1" fill="#8B4513" />
          <circle cx="22" cy="18" r="1" fill="#8B4513" />
          <path d="M18 22 C16.5 22, 15 21, 15 19" stroke="#8B4513" strokeWidth="1" strokeLinecap="round" />
          <path d="M21 14 L25 10" stroke="#FF9800" strokeWidth="1" strokeLinecap="round" />
          <path d="M15 14 L11 10" stroke="#FF9800" strokeWidth="1" strokeLinecap="round" />
        </svg>
      </div>
      
      {eggs.map((egg) => (
        <div
          key={egg.id}
          className="fixed pointer-events-none z-40 animate-egg-drop"
          style={{ left: `${egg.x}px`, top: `${egg.y}px` }}
        >
          <div className="w-4 h-5 bg-yellow-100 rounded-full" />
        </div>
      ))}
    </>
  );
};

export default CustomCursor;
