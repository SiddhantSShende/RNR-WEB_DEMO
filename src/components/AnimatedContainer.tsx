import React, { ReactNode } from 'react';

interface AnimatedContainerProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

const AnimatedContainer: React.FC<AnimatedContainerProps> = ({ 
  children, 
  className = '', 
  delay = 0 
}) => {
  return (
    <div 
      className={`animate-fade-in-up ${className}`}
      style={{ 
        animationDelay: `${delay}ms`,
        animationFillMode: 'both'
      }}
    >
      {children}
    </div>
  );
};

export default AnimatedContainer;
