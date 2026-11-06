'use client';

import React, { useState, useEffect } from 'react';
import { StyledWrapper } from './FadeTransition.styles';

interface FadeTransitionProps {
  children: React.ReactNode;
  show?: boolean;             
  triggerKey?: any;           
  duration?: string;          
  translateY?: string;        
  easing?: string;            
  onExited?: () => void;      
}

export function FadeTransition({
  children,
  show = true,
  triggerKey,
  duration = '0.4s',
  translateY = '8px',
  easing = 'ease-out',
  onExited,
}: FadeTransitionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(show);

  useEffect(() => {
    if (!show) {
      setIsVisible(false);
      const durationMs = duration.includes('ms') ? parseInt(duration) : parseFloat(duration) * 1000;
      const timer = setTimeout(() => {
        setShouldRender(false);
        if (onExited) onExited();
      }, durationMs);
      return () => clearTimeout(timer);
    }

    setShouldRender(true);
    setIsVisible(false); 

    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 20);

    return () => clearTimeout(timer);
  }, [show, triggerKey, duration, onExited]);

  if (!shouldRender) return null;

  return (
    <StyledWrapper
      $isVisible={isVisible}
      $duration={duration}
      $translateY={translateY}
      $easing={easing}
    >
      {children}
    </StyledWrapper>
  );
}