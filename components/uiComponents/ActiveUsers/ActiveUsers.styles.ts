import styled from 'styled-components';
import { motion } from 'framer-motion';

export const WrapperCard = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 16px;
  padding: 14px;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: visible; 
  box-sizing: border-box;
  border:1px solid black;
  min-width: 0;
  z-index: 10;
`;

export const HeaderBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  min-width: 0;
  color: Black;
  padding: 0 2px;
  flex-shrink: 0;
  box-sizing: border-box;
  margin-bottom: 6px;
`;

export const QuestionAlertButton = styled.button`
  background: #D0FF00;
  color: #111827;
  border: none;
  padding: 4px 10px;
  border-radius: 10px;
  font-size: 0.75rem;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  box-shadow: 0 2px 6px #6b7280;
  white-space: nowrap;
  transition:0.2s ease;
  

  &:hover {
    transform: scale(1.05);
    transform: translateY(-6px);
    background: #111827;
    color: #D0FF00; 
  }
`;

export const GridContainer = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(6, 1fr);
  gap: 8px;
  width: 100%;
  flex: 1;
  min-height: 0;
  justify-items: center;
  align-content: center;
  box-sizing: border-box;
  padding: 25px 4px 4px 4px; 
  overflow: visible;
`;

export const PaginationFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 6px 2px 0 2px;
  flex-shrink: 0;
  color: black;
  font-size: 0.75rem;
  font-weight: 600;
`;

export const NavButton = styled.button`
  background: rgba(0, 0, 0, 0.78);
  color: white;
  border: none;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 0.8rem;
  transition: background 0.2s;

  &:hover {
    background: rgba(0, 0, 0, 0.4);
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`;