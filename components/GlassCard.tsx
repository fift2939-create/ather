
import React, { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hoverEffect?: boolean;
  onClick?: () => void;
}

const GlassCard: React.FC<GlassCardProps> = ({ children, className = '', hoverEffect = false, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className={`
        bg-white/60 dark:bg-white/10 backdrop-blur-md border border-white/40 dark:border-white/20 shadow-xl rounded-2xl p-6
        transform transition-all duration-300 ease-out backface-hidden will-change-transform
        ${hoverEffect ? 'hover:bg-white/80 dark:hover:bg-white/15 hover:scale-[1.02] hover:shadow-2xl hover:-translate-y-1 active:scale-[0.98] active:translate-y-0 active:brightness-95 active:shadow-md cursor-pointer' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default GlassCard;
