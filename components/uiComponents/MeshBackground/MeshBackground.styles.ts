import styled, { keyframes } from 'styled-components';

export const growInAnimation = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.85) translateY(30px);
    filter: blur(10px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0px);
    filter: blur(0px);
  }
`;

export const MeshBackgroundWrapper = styled.div<{ $zIndex?: number | string }>`
  position: relative;
  z-index: ${(props) => props.$zIndex ?? 2}; /* Dynamic z-index supporting custom overrides */
  width: 100vw;
  min-height: 100vh;
  min-height: 100dvh;
  background-color: #fdfcfc;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  user-select: none;
  font-family: inherit;

  background-image: 
    linear-gradient(to right, rgba(0, 0, 0, 0.03) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(0, 0, 0, 0.03) 1px, transparent 1px);
  background-size: 40px 40px;
`;

export const CenterContent = styled.div<{ $visible?: boolean }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, ${(props) => (props.$visible ?? true ? '-50%' : 'calc(-50% - 20px)')}) scale(${(props) => (props.$visible ?? true ? 1 : 0.9)});
  z-index: 5;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0 1.25rem;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  opacity: ${(props) => (props.$visible ?? true ? 1 : 0)};
  transition: opacity 0.7s ease, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
  pointer-events: ${(props) => (props.$visible ?? true ? 'auto' : 'none')};
`;

export const ClickHint = styled.div`
  position: absolute;
  bottom: 1.75rem;
  color: rgba(15, 23, 42, 0.45);
  font-size: clamp(0.75rem, 3vw, 0.85rem);
  letter-spacing: 0.04em;
  z-index: 10;
  text-align: center;
  padding: 0 1rem;
  pointer-events: none;
  display: none;

  @media (min-width: 768px) {
    display: block;
    bottom: 2.5rem;
  }
`;