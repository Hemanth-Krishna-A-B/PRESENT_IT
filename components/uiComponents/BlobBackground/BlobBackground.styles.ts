import styled, { keyframes } from 'styled-components';
import { BlobProps } from '@/types/types';

export const dynamicFloat = keyframes`
  0% { transform: translate(0px, 0px) scale(1) rotate(0deg); }
  33% { transform: translate(var(--rand-x1), var(--rand-y1)) scale(1.2) rotate(120deg); }
  66% { transform: translate(var(--rand-x2), var(--rand-y2)) scale(0.85) rotate(240deg); }
  100% { transform: translate(var(--rand-x3), var(--rand-y3)) scale(1) rotate(360deg); }
`;

export const StyledBlob = styled.div<BlobProps>`
  position: absolute;
  top: 50%;
  left: 50%;
  width: clamp(280px, 60vw, 550px);
  height: clamp(280px, 60vw, 550px);
  margin-top: -225px;
  margin-left: -225px;
  border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%;
  background: linear-gradient(135deg, ${(props) => props.color1}, ${(props) => props.color2});
  filter: blur(${(props) => props.$blur || '50px'});
  opacity: 0.75;
  pointer-events: none;
  z-index: 1;
  animation: ${dynamicFloat} ${(props) => props.$duration || '16s'} ease-in-out infinite alternate;

  @media (min-width: 768px) {
    filter: blur(${(props) => props.$blur || '50px'});
  }
`;

export const BlobContainer = styled.div<{ $visible?: boolean; $zIndex?: number | string }>`
  position: absolute;
  inset: 0;
  z-index: ${(props) => props.$zIndex ?? 0}; /* Dynamic z-index supporting custom overrides */
  opacity: ${(props) => (props.$visible ?? true ? 1 : 0)};
  transition: opacity 0.8s ease-in-out;
  pointer-events: none;
  overflow: hidden;
`;