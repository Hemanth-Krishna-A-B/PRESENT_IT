'use client';

import React, { useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { FiMoreVertical, FiX } from 'react-icons/fi';

const CardWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 1rem;
  padding: 1rem 1.5rem;
  width: 100%;
  max-width: 54rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
  transition: all 0.2s ease;
  box-sizing: border-box;

  &:hover {
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
    border-color: #cbd5e1;
  }
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  min-width: 200px;
`;

const CircleAvatar = styled.div<{ $bgColor?: string }>`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: ${(props) => props.$bgColor || '#4f46e5'};
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1rem;
  flex-shrink: 0;
  box-shadow: 0 4px 10px ${(props) => (props.$bgColor ? `${props.$bgColor}40` : 'rgba(79, 70, 229, 0.25)')};
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const Name = styled.span`
  font-weight: 600;
  font-size: 0.95rem;
  color: #0f172a;
  line-height: 1.2;
`;

const RegisterNumber = styled.span`
  font-size: 0.75rem;
  color: #64748b;
  margin-top: 0.2rem;
`;

const CenterSection = styled.div`
  flex: 1;
  max-width: 300px;
  margin: 0 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

const ProgressMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.8rem;
`;

const ProgressLabel = styled.span`
  font-weight: 500;
  color: #475569;
`;

const ProgressStats = styled.span`
  font-weight: 600;
  color: #0f172a;
`;

const fillAnimation = (targetWidth: number) => keyframes`
  from { width: 0%; }
  to { width: ${targetWidth}%; }
`;

const PixelProgressBar = styled.div<{ $percentage: number }>`
  width: 100%;
  height: 14px;
  background: #f1f5f9;
  border-radius: 2px;
  overflow: hidden;
  position: relative;
  background-image: repeating-linear-gradient(
    90deg, #f1f5f9, #f1f5f9 4px, #ffffff 4px, #ffffff 6px
  );

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    background: #4f46e5;
    background-image: repeating-linear-gradient(
      90deg, #4f46e5, #4f46e5 6px, #4338ca 6px, #4338ca 8px
    );
    border-radius: 2px;
    animation: ${(props) => fillAnimation(props.$percentage)} 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }
`;

const RightSection = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const MenuButton = styled.button`
  background: transparent;
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #64748b;
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease;

  &:hover {
    background: #f1f5f9;
    color: #0f172a;
  }
`;

/* Modal Styles with Animations */
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const scaleUp = keyframes`
  from { opacity: 0; transform: scale(0.95) translateY(10px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
`;

const ModalOverlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.5);
  backdrop-filter: blur(4px);
  display: ${(props) => (props.$isOpen ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  z-index: 100;
  animation: ${fadeIn} 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  padding: 1rem;
`;

const ModalContent = styled.div`
  background: #ffffff;
  width: 100%;
  max-width: 480px;
  border-radius: 1.25rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  animation: ${scaleUp} 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  display: flex;
  flex-direction: column;
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid #e2e8f0;
`;

const ModalTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 700;
  color: #0f172a;
  margin: 0;
`;

const CloseButton = styled.button`
  background: transparent;
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
    background: #f1f5f9;
    color: #0f172a;
  }
`;

const ModalBody = styled.div`
  padding: 2rem 1.5rem;
  min-height: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #94a3b8;
  font-size: 0.9rem;
  font-style: italic;
  text-align: center;
  background: #f8fafc;
`;

interface ProgressCardProps {
  number: string | number;
  name: string;
  registerNumber: string;
  currentAnswered: number;
  totalQuestions: number;
  bgColor?: string;
}

export function ProgressCard({
  number,
  name,
  registerNumber,
  currentAnswered,
  totalQuestions,
  bgColor,
}: ProgressCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const percentage = Math.min(Math.max((currentAnswered / totalQuestions) * 100, 0), 100);

  return (
    <>
      <CardWrapper>
        <LeftSection>
          <CircleAvatar $bgColor={bgColor}>{number}</CircleAvatar>
          <UserInfo>
            <Name>{name}</Name>
            <RegisterNumber>{registerNumber}</RegisterNumber>
          </UserInfo>
        </LeftSection>

        <CenterSection>
          <ProgressMeta>
            <ProgressLabel>Progress</ProgressLabel>
            <ProgressStats>
              Answered {currentAnswered}/{totalQuestions}
            </ProgressStats>
          </ProgressMeta>
          <PixelProgressBar $percentage={percentage} />
        </CenterSection>

        <RightSection>
          <MenuButton onClick={() => setIsModalOpen(true)} aria-label="Open options menu">
            <FiMoreVertical size={18} />
          </MenuButton>
        </RightSection>
      </CardWrapper>

      {/* Animated Modal Popup */}
      <ModalOverlay $isOpen={isModalOpen} onClick={() => setIsModalOpen(false)}>
        <ModalContent onClick={(e) => e.stopPropagation()}>
          <ModalHeader>
            <ModalTitle>Details for {name}</ModalTitle>
            <CloseButton onClick={() => setIsModalOpen(false)} aria-label="Close modal">
              <FiX size={20} />
            </CloseButton>
          </ModalHeader>
          <ModalBody>
            Content will be designed here later...
          </ModalBody>
        </ModalContent>
      </ModalOverlay>
    </>
  );
}