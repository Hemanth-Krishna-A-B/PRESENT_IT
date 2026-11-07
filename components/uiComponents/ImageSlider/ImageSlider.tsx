'use client';

import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, Variants } from 'framer-motion';
import {
  SliderContainer,
  SlideImageWrapper,
  StyledImage,
  NavButton,
  DotsContainer,
  Dot,
  CaptionOverlay,
} from './ImageSlider.styles';

export interface SlideItem {
  id: string | number;
  url: string;
  caption?: string;
}

interface ImageSliderProps {
  slides?: SlideItem[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  canChangeSlide?: boolean;
}

const DEFAULT_SLIDES: SlideItem[] = [
  { id: 1, url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200', caption: 'Interactive Learning Platform' },
  { id: 2, url: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=1200', caption: 'Live Session Analytics' },
  { id: 3, url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200', caption: 'Student Engagement' },
];

const slideVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    transition: {
      x: { type: 'spring', stiffness: 220, damping: 25 },
      opacity: { duration: 0.3 },
    },
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? '100%' : '-100%',
    opacity: 0,
    transition: {
      x: { type: 'spring', stiffness: 220, damping: 25 },
      opacity: { duration: 0.3 },
    },
  }),
};

export default function ImageSlider({
  slides = DEFAULT_SLIDES,
  autoPlay = true,
  autoPlayInterval = 5000,
  canChangeSlide = true,
}: ImageSliderProps) {
  const [[page, direction], setPage] = useState([0, 0]);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const slideIndex = ((page % slides.length) + slides.length) % slides.length;

  const paginate = (newDirection: number) => {
    if (!canChangeSlide) return;
    setPage([page + newDirection, newDirection]);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable full-screen mode: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  // Sync fullscreen state
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  // Google Slides style Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!canChangeSlide) return;

      // Only handle keyboard navigation if container is focused OR if we are currently in fullscreen mode
      const isFocused = containerRef.current?.contains(document.activeElement);
      if (!isFocused && !isFullscreen) return;

      switch (e.key) {
        case 'ArrowRight':
        case 'PageDown':
        case ' ': // Spacebar
        case 'ArrowDown':
          e.preventDefault(); // Prevent page scrolling on spacebar/arrows
          paginate(1);
          break;
        case 'ArrowLeft':
        case 'PageUp':
        case 'ArrowUp':
          e.preventDefault();
          paginate(-1);
          break;
        case 'f':
        case 'F':
          // Optional shortcut 'f' to toggle fullscreen
          if (!isFullscreen && !document.fullscreenElement) {
            toggleFullscreen();
          }
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [canChangeSlide, isFullscreen, page]);

  useEffect(() => {
    if (!autoPlay || isFullscreen) return;
    const timer = setInterval(() => {
      setPage((prev) => [prev[0] + 1, 1]);
    }, autoPlayInterval);
    return () => clearInterval(timer);
  }, [autoPlay, autoPlayInterval, isFullscreen]);

  if (!slides || slides.length === 0) return null;

  return (
    <SliderContainer 
      ref={containerRef} 
      tabIndex={0} // Makes the container focusable via click or navigation
      style={
        isFullscreen 
          ? { background: '#000', width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', outline: 'none' } 
          : { outline: 'none' }
      }
    >
      <button
        onClick={toggleFullscreen}
        title={isFullscreen ? "Exit Fullscreen (Esc)" : "Fullscreen (F)"}
        style={{
          position: 'absolute',
          top: '16px',
          right: '16px',
          zIndex: 10,
          background: 'rgba(0, 0, 0, 0.6)',
          border: 'none',
          borderRadius: '4px',
          color: '#fff',
          padding: '8px 12px',
          cursor: 'pointer',
          fontSize: '14px',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
        }}
      >
        {isFullscreen ? '✕ Exit' : '⛶ Fullscreen'}
      </button>

      {slides[slideIndex]?.caption && (
        <AnimatePresence mode="wait">
          <CaptionOverlay
            key={slideIndex}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
          >
            {slides[slideIndex].caption}
          </CaptionOverlay>
        </AnimatePresence>
      )}

      <AnimatePresence initial={false} custom={direction} mode="sync">
        <SlideImageWrapper
          key={page}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          style={{ willChange: 'transform, opacity', position: 'absolute', inset: 0 }}
        >
          <StyledImage 
            src={slides[slideIndex].url} 
            alt={slides[slideIndex].caption || 'Slide image'} 
            style={isFullscreen ? { objectFit: 'contain', width: '100%', height: '100%' } : undefined}
          />
        </SlideImageWrapper>
      </AnimatePresence>

      <NavButton
        className="prev"
        onClick={() => paginate(-1)}
        $disabled={!canChangeSlide}
        whileHover={canChangeSlide ? { scale: 1.08 } : {}}
        whileTap={canChangeSlide ? { scale: 0.95 } : {}}
      >
        ‹
      </NavButton>

      <NavButton
        className="next"
        onClick={() => paginate(1)}
        $disabled={!canChangeSlide}
        whileHover={canChangeSlide ? { scale: 1.08 } : {}}
        whileTap={canChangeSlide ? { scale: 0.95 } : {}}
      >
        ›
      </NavButton>

      <DotsContainer $disabled={!canChangeSlide}>
        {slides.map((slide, idx) => (
          <Dot
            key={slide.id}
            $active={idx === slideIndex}
            $disabled={!canChangeSlide}
            onClick={() => {
              if (!canChangeSlide) return;
              const dir = idx > slideIndex ? 1 : -1;
              setPage([idx, dir]);
            }}
          />
        ))}
      </DotsContainer>
    </SliderContainer>
  );
}