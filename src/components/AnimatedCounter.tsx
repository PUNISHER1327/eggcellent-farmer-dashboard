
import React, { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';

type AnimatedCounterProps = {
  title: string;
  targetValue: number;
  unit: string;
  icon: React.ReactNode;
  className?: string;
};

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ 
  title, 
  targetValue, 
  unit, 
  icon,
  className = '' 
}) => {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const options = {
      threshold: 0.1
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          
          let startTime: number;
          const duration = 2000; // 2 seconds animation

          const animateCount = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const currentCount = Math.floor(progress * targetValue);
            
            setCount(currentCount);
            
            if (progress < 1) {
              requestAnimationFrame(animateCount);
            } else {
              setCount(targetValue);
            }
          };

          requestAnimationFrame(animateCount);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, options);
    
    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => {
      if (countRef.current) {
        observer.unobserve(countRef.current);
      }
    };
  }, [targetValue]);

  return (
    <Card className={`glass-morphism p-4 flex flex-col items-center justify-center text-center sensor-card-hover ${className}`}>
      <div className="p-3 bg-secondary/50 rounded-full mb-2">{icon}</div>
      <h3 className="text-sm text-muted-foreground mb-1">{title}</h3>
      <div className="font-bold text-2xl flex items-baseline" ref={countRef}>
        <span>{count}</span>
        <span className="text-sm ml-1 text-muted-foreground">{unit}</span>
      </div>
    </Card>
  );
};

export default AnimatedCounter;
