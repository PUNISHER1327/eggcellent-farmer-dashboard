
import React, { useEffect, useState } from 'react';
import { useTheme } from '@/hooks/useTheme';

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
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const { theme } = useTheme();

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

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'BUTTON' || target.tagName === 'A' || target.closest('button') || target.closest('a')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [position, nextId]);

  const fillColor = theme === 'light' ? '#FF9800' : '#FFC107';
  const strokeColor = theme === 'light' ? '#F57C00' : '#FFD54F';

  return (
    <>
      <div
        className={`fixed pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center transition-transform duration-300 ${
          isClicking ? 'animate-lay-egg scale-90' : isHovering ? 'scale-125' : 'animate-bounce scale-100'
        }`}
        style={{ 
          left: `${position.x}px`, 
          top: `${position.y}px`,
          filter: isHovering ? 'drop-shadow(0 0 8px rgba(255,193,7,0.7))' : 'none'
        }}
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-all duration-300"
        >
          <path
            d="M10,20 C10,24.4183 13.5817,28 18,28 C22.4183,28 26,24.4183 26,20 C26,15.5817 22.4183,8 18,8 C13.5817,8 10,15.5817 10,20 Z"
            fill={fillColor}
            stroke={strokeColor}
            strokeWidth="1"
          />
          <circle cx="14" cy="18" r="1" fill="#8B4513" />
          <circle cx="22" cy="18" r="1" fill="#8B4513" />
          <path d="M18 22 C16.5 22, 15 21, 15 19" stroke="#8B4513" strokeWidth="1" strokeLinecap="round" />
          <path d="M21 14 L25 10" stroke={fillColor} strokeWidth="1" strokeLinecap="round" />
          <path d="M15 14 L11 10" stroke={fillColor} strokeWidth="1" strokeLinecap="round" />
        </svg>
      </div>
      
      {eggs.map((egg) => (
        <div
          key={egg.id}
          className="fixed pointer-events-none z-40 animate-egg-drop"
          style={{ left: `${egg.x}px`, top: `${egg.y}px` }}
        >
          <div className={`w-4 h-5 ${theme === 'light' ? 'bg-farm-orange/90' : 'bg-yellow-100'} rounded-full`} />
        </div>
      ))}
    </>
  );
};

export default CustomCursor;
