import styled from 'styled-components';
import { motion } from 'framer-motion';

export const SliderContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 16px;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
`;

export const SlideImageWrapper = styled(motion.div)`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  pointer-events: none;
`;

export const NavButton = styled(motion.button)<{ $disabled?: boolean }>`
  position: absolute;
  top: 50%;
  margin-top: -20px; /* Precise centering without Y transform hover collision */
  background: rgba(255, 255, 255, 0.9);
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: ${(props) => (props.$disabled ? 'not-allowed' : 'pointer')};
  color: ${(props) => (props.$disabled ? '#94a3b8' : '#0f172a')};
  font-size: 1.2rem;
  font-weight: 700;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.25);
  z-index: 10;
  backdrop-filter: blur(4px);
  user-select: none;
  pointer-events: ${(props) => (props.$disabled ? 'none' : 'auto')};

  &.prev {
    left: 14px;
  }

  &.next {
    right: 14px;
  }
`;

export const DotsContainer = styled.div<{ $disabled?: boolean }>`
  position: absolute;
  bottom: 14px;
  display: flex;
  gap: 6px;
  z-index: 10;
  background: rgba(0, 0, 0, 0.4);
  padding: 6px 12px;
  border-radius: 20px;
  backdrop-filter: blur(8px);
  pointer-events: ${(props) => (props.$disabled ? 'none' : 'auto')};
`;

export const Dot = styled(motion.button)<{ $active: boolean; $disabled?: boolean }>`
  width: ${(props) => (props.$active ? '20px' : '8px')};
  height: 8px;
  border-radius: 4px;
  border: none;
  background: ${(props) => (props.$active ? '#ffffff' : 'rgba(255, 255, 255, 0.5)')};
  cursor: ${(props) => (props.$disabled ? 'not-allowed' : 'pointer')};
`;

export const CaptionOverlay = styled(motion.div)`
  position: absolute;
  top: 14px;
  left: 14px;
  background: rgba(0, 0, 0, 0.6);
  color: #ffffff;
  padding: 6px 14px;
  border-radius: 10px;
  font-size: 0.85rem;
  font-weight: 600;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 10;
  backdrop-filter: blur(8px);
  pointer-events: none;
`;