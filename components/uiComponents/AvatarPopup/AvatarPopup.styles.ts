import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';

export const pulse = keyframes`
  0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7); }
  70% { transform: scale(1.05); box-shadow: 0 0 0 8px rgba(239, 68, 68, 0); }
  100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
`;

export const AvatarContainer = styled(motion.div)`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export const CircleAvatar = styled.div<{ $bgColor?: string; $hasQuestion?: boolean }>`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: ${(props) => props.$bgColor || '#4f46e5'};
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.85rem;
  box-shadow: 0 3px 10px ${(props) => (props.$bgColor ? `${props.$bgColor}40` : 'rgba(79, 70, 229, 0.25)')};
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  border: ${(props) => (props.$hasQuestion ? '2.5px solid #ef4444' : 'none')};

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 5px 14px ${(props) => (props.$bgColor ? `${props.$bgColor}60` : 'rgba(79, 70, 229, 0.35)')};
  }
`;

export const QuestionBadge = styled.div`
  position: absolute;
  top: -3px;
  right: -3px;
  background: #ef4444;
  color: white;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 9px;
  font-weight: 800;
  box-shadow: 0 2px 5px rgba(239, 68, 68, 0.4);
  animation: ${pulse} 2s infinite;
  z-index: 2;
`;

export const PopupCard = styled.div<{ $isVisible: boolean; $isTopRow: boolean; $isLastColumn: boolean }>`
  position: absolute;
  ${(props) => (props.$isTopRow ? 'top: calc(100% + 10px);' : 'bottom: calc(100% + 10px);')}
  ${(props) =>
    props.$isLastColumn
      ? 'right: 0; transform-origin: top right;'
      : 'left: 50%; transform: translateX(-50%);'}

  background: #ffffff;
  color: #0f172a;
  padding: 0.75rem 1rem;
  border-radius: 0.65rem;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.35);
  
  /* UPDATED: Changed fixed height to auto/min-height constraints */
  min-width: 220px;
  max-width: 380px;
  height: auto; 
  min-height: unset;

  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  z-index: 99999;
  opacity: ${(props) => (props.$isVisible ? 1 : 0)};
  visibility: ${(props) => (props.$isVisible ? 'visible' : 'hidden')};
  pointer-events: ${(props) => (props.$isVisible ? 'auto' : 'none')};
  transition: opacity 0.15s ease, transform 0.15s ease, visibility 0.15s ease;
  border: 1px solid #cbd5e1;

  &::after {
    content: '';
    position: absolute;
    border-width: 6px;
    border-style: solid;
    ${(props) => {
      if (props.$isTopRow) {
        return props.$isLastColumn
          ? 'bottom: 100%; right: 16px; border-color: transparent transparent #ffffff transparent;'
          : 'bottom: 100%; left: 50%; transform: translateX(-50%); border-color: transparent transparent #ffffff transparent;';
      } else {
        return props.$isLastColumn
          ? 'top: 100%; right: 16px; border-color: #ffffff transparent transparent transparent;'
          : 'top: 100%; left: 50%; transform: translateX(-50%); border-color: #ffffff transparent transparent transparent;';
      }
    }}
  }
`;

export const Name = styled.div`
  font-weight: 600;
  font-size: 0.9rem;
  color: #0f172a;
  flex-shrink: 0;
  white-space: nowrap;
`;

export const RollNumber = styled.div`
  font-size: 0.75rem;
  color: #64748b;
  margin-bottom: 0px; /* Removed extra spacing */
  flex-shrink: 0;
`;

export const QuestionText = styled.div`
  font-size: 0.78rem;
  color: #ef4444;
  font-weight: 600;
  margin-top: 6px;
  padding-top: 6px;
  border-top: 1px solid #f1f5f9;
  line-height: 1.3;
  max-height: 80px;
  overflow-y: auto;
`;

export const AnswerActionButton = styled.button`
  background: #4f46e5;
  color: white;
  border: none;
  width: 100%;
  padding: 5px 8px;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 700;
  cursor: pointer;
  margin-top: 6px;
  flex-shrink: 0;
  transition: background 0.2s;

  &:hover {
    background: #4338ca;
  }
`;