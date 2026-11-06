import { StepState } from '@/types/types';
import { useState, useRef, useEffect } from 'react';


interface StepNavigationOptions {
  maxSteps?: number;
  scrollDebounceMs?: number;
}

export function useStepNavigation(options: StepNavigationOptions = {}) {
  const { maxSteps = 2, scrollDebounceMs = 800 } = options;
  const [step, setStep] = useState<StepState>(0);
  const isScrolling = useRef(false);

  const nextStep = () => {
    setStep((prev) => (prev < maxSteps ? ((prev + 1) as StepState) : prev));
  };

  const prevStep = () => {
    setStep((prev) => (prev > 0 ? ((prev - 1) as StepState) : prev));
  };

  const handleContainerClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button, a')) return;
    nextStep();
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowDown', 'ArrowRight', ' '].includes(e.key)) {
        e.preventDefault();
        nextStep();
      } else if (['ArrowUp', 'ArrowLeft'].includes(e.key)) {
        e.preventDefault();
        prevStep();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [maxSteps]);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isScrolling.current) return;
      if (e.deltaY > 20) {
        isScrolling.current = true;
        nextStep();
        setTimeout(() => {
          isScrolling.current = false;
        }, scrollDebounceMs);
      } else if (e.deltaY < -20) {
        isScrolling.current = true;
        prevStep();
        setTimeout(() => {
          isScrolling.current = false;
        }, scrollDebounceMs);
      }
    };

    window.addEventListener('wheel', handleWheel);
    return () => window.removeEventListener('wheel', handleWheel);
  }, [maxSteps, scrollDebounceMs]);

  return { step, setStep, nextStep, prevStep, handleContainerClick };
}