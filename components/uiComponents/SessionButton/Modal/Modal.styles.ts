import styled, { keyframes, css } from 'styled-components';

export const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(12px) scale(0.96); }
  to { opacity: 1; transform: translateY(0) scale(1); }
`;

export const fadeOut = keyframes`
  from { opacity: 1; transform: translateY(0) scale(1); }
  to { opacity: 0; transform: translateY(12px) scale(0.96); }
`;

export const ModalOverlay = styled.div<{ $isClosing?: boolean }>`
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.5);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  padding: 1rem;
  animation: ${fadeIn} 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;

  ${(props) =>
    props.$isClosing &&
    css`
      animation: ${fadeOut} 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    `}
`;

export const ModalCard = styled.div<{ $isClosing?: boolean }>`
  background: #ffffff;
  width: 100%;
  max-width: 380px;
  border-radius: 1.5rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
  padding: 2rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  animation: ${fadeIn} 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;

  ${(props) =>
    props.$isClosing &&
    css`
      animation: ${fadeOut} 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    `}
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: #f1f5f9;
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #64748b;
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease;

  &:hover {
    background: #e2e8f0;
    color: #0f172a;
  }
`;