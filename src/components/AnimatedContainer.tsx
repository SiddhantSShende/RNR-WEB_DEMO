import React, { forwardRef } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface AnimatedContainerProps {
  children: React.ReactNode;
  className?: string;
  animation?: 'fadeIn' | 'slideUp' | 'slideLeft' | 'slideRight' | 'scaleIn' | 'bounceIn';
  delay?: number;
  duration?: number;
  threshold?: number;
}

const AnimatedContainer = forwardRef<HTMLDivElement, AnimatedContainerProps>(
  ({ 
    children, 
    className = '', 
    animation = 'fadeIn', 
    delay = 0, 
    duration = 600,
    threshold = 0.1 
  }, ref) => {
    const { elementRef, isVisible } = useScrollAnimation({ threshold });

    const getAnimationClasses = () => {
      const baseClasses = `transition-all duration-${duration} ease-out`;
      const delayClass = delay > 0 ? `delay-${delay}` : '';
      
      switch (animation) {
        case 'fadeIn':
          return `${baseClasses} ${delayClass} ${
            isVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-4'
          }`;
        case 'slideUp':
          return `${baseClasses} ${delayClass} ${
            isVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`;
        case 'slideLeft':
          return `${baseClasses} ${delayClass} ${
            isVisible 
              ? 'opacity-100 translate-x-0' 
              : 'opacity-0 translate-x-8'
          }`;
        case 'slideRight':
          return `${baseClasses} ${delayClass} ${
            isVisible 
              ? 'opacity-100 translate-x-0' 
              : 'opacity-0 -translate-x-8'
          }`;
        case 'scaleIn':
          return `${baseClasses} ${delayClass} ${
            isVisible 
              ? 'opacity-100 scale-100' 
              : 'opacity-0 scale-95'
          }`;
        case 'bounceIn':
          return `${baseClasses} ${delayClass} ${
            isVisible 
              ? 'opacity-100 scale-100 animate-bounce-in' 
              : 'opacity-0 scale-95'
          }`;
        default:
          return baseClasses;
      }
    };

    return (
      <div
        ref={ref || elementRef}
        className={`${getAnimationClasses()} ${className}`}
      >
        {children}
      </div>
    );
  }
);

AnimatedContainer.displayName = 'AnimatedContainer';

export default AnimatedContainer;
