import styled from 'styled-components';
import { motion } from 'framer-motion';

export const ModalOverlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999999;
  padding: 16px;
`;

export const ModalContent = styled(motion.div)`
  background: #ffffff;
  color: #0f172a;
  width: 100%;
  max-width: 480px;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const ModalTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 700;
  color: #0f172a;
  margin: 0;
`;

export const StudentQuestionBox = styled.div`
  background: #f8fafc;
  border-left: 4px solid #ef4444;
  padding: 10px 14px;
  border-radius: 6px;
  font-size: 0.85rem;
  color: #334155;
`;

export const AnswerTextArea = styled.textarea`
  width: 100%;
  height: 120px;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
  font-family: inherit;
  font-size: 0.9rem;
  resize: none;
  outline: none;
  box-sizing: border-box;

  &:focus {
    border-color: #4f46e5;
    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.15);
  }
`;

export const ModalButtonsRow = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin-top: 4px;
`;

export const ButtonSecondary = styled.button`
  background: #e2e8f0;
  color: #334155;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.85rem;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #cbd5e1;
  }
`;

export const ButtonEveryone = styled.button`
  background: #0284c7;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.85rem;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #0284c7dd;
  }
`;

export const ButtonOnlyUser = styled.button`
  background: #16a34a;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.85rem;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #16a34add;
  }
`;