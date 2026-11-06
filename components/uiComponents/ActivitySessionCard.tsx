'use client';

import React, { useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { 
  FiHelpCircle, 
  FiBarChart2, 
  FiMonitor, 
  FiX, 
  FiCheckCircle, 
  FiShare2, 
  FiSquare 
} from 'react-icons/fi';

const CardWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 1rem;
  padding: 1.25rem 1.5rem;
  width: 100%;
  max-width: 58rem;
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
  min-width: 240px;
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
  font-size: 1.25rem;
  flex-shrink: 0;
  cursor: pointer;
  box-shadow: 0 4px 10px ${(props) => (props.$bgColor ? `${props.$bgColor}40` : 'rgba(79, 70, 229, 0.25)')};
  transition: transform 0.2s ease, filter 0.2s ease;

  &:hover {
    transform: scale(1.08);
    filter: brightness(1.1);
  }
`;

const ItemInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const ItemTitle = styled.span`
  font-weight: 700;
  font-size: 1rem;
  color: #0f172a;
  line-height: 1.2;
`;

const ItemSubtitle = styled.span`
  font-size: 0.75rem;
  color: #64748b;
  margin-top: 0.25rem;
  display: flex;
  align-items: center;
  gap: 0.35rem;
`;

const CenterSection = styled.div`
  flex: 1;
  max-width: 320px;
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

const PixelProgressBar = styled.div<{ $percentage: number; $color?: string }>`
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
    background: ${(props) => props.$color || '#4f46e5'};
    background-image: repeating-linear-gradient(
      90deg, 
      ${(props) => props.$color || '#4f46e5'}, 
      ${(props) => props.$color || '#4f46e5'} 6px, 
      rgba(0,0,0,0.15) 6px, 
      rgba(0,0,0,0.15) 8px
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

/* Animated Share / Stop Toggle Button */
const ToggleButton = styled.button<{ $isShared: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: ${(props) => (props.$isShared ? '#fee2e2' : '#f8fafc')};
  color: ${(props) => (props.$isShared ? '#dc2626' : '#0f172a')};
  border: 1px solid ${(props) => (props.$isShared ? '#fecaca' : '#cbd5e1')};
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  font-weight: 600;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);

  &:hover {
    background: ${(props) => (props.$isShared ? '#fecaca' : '#f1f5f9')};
    transform: scale(1.03);
  }

  &:active {
    transform: scale(0.97);
  }
`;

/* Modal Styles with Smooth Entrance & Exit Animations */
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;

const scaleUp = keyframes`
  from { opacity: 0; transform: scale(0.95) translateY(10px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
`;

const scaleDown = keyframes`
  from { opacity: 1; transform: scale(1) translateY(0); }
  to { opacity: 0; transform: scale(0.95) translateY(10px); }
`;

const ModalOverlay = styled.div<{ $isClosing: boolean }>`
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.5);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  animation: ${fadeIn} 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;

  ${(props) =>
    props.$isClosing &&
    css`
      animation: ${fadeOut} 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    `}
  padding: 1rem;
`;

const ModalContent = styled.div<{ $isClosing: boolean }>`
  background: #ffffff;
  width: 100%;
  max-width: 520px;
  border-radius: 1.25rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  animation: ${scaleUp} 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;

  ${(props) =>
    props.$isClosing &&
    css`
      animation: ${scaleDown} 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    `}
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
  padding: 2.5rem 1.5rem;
  min-height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #94a3b8;
  font-size: 0.9rem;
  font-style: italic;
  text-align: center;
  background: #f8fafc;
`;

export type ActivityType = 'QA' | 'Poll' | 'Present';

interface ActivitySessionCardProps {
  type: ActivityType;
  title: string;
  completedCount: number;
  totalCount: number;
  bgColor?: string;
}

export function ActivitySessionCard({
  type,
  title,
  completedCount,
  totalCount,
  bgColor,
}: ActivitySessionCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isShared, setIsShared] = useState(false);

  const percentage = Math.min(Math.max((completedCount / totalCount) * 100, 0), 100);

  const renderIcon = () => {
    switch (type) {
      case 'QA':
        return <FiHelpCircle />;
      case 'Poll':
        return <FiBarChart2 />;
      case 'Present':
        return <FiMonitor />;
      default:
        return <FiBarChart2 />;
    }
  };

  const handleOpenModal = () => {
    setIsClosing(false);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setIsClosing(false);
    }, 200);
  };

  return (
    <>
      <CardWrapper>
        {/* Left side: Clickable Icon Avatar opens modal */}
        <LeftSection>
          <CircleAvatar 
            $bgColor={bgColor} 
            onClick={handleOpenModal}
            title={`View ${type} details`}
          >
            {renderIcon()}
          </CircleAvatar>
          <ItemInfo>
            <ItemTitle>{title}</ItemTitle>
            <ItemSubtitle>
              <FiCheckCircle size={13} color="#10b981" />
              {completedCount} of {totalCount} completed
            </ItemSubtitle>
          </ItemInfo>
        </LeftSection>

        {/* Center: Pixelated progress bar */}
        <CenterSection>
          <ProgressMeta>
            <ProgressLabel>Status Progress</ProgressLabel>
            <ProgressStats>{Math.round(percentage)}%</ProgressStats>
          </ProgressMeta>
          <PixelProgressBar $percentage={percentage} $color={bgColor} />
        </CenterSection>

        {/* Right side: Share & Stop Toggle Button */}
        <RightSection>
          <ToggleButton 
            $isShared={isShared} 
            onClick={() => setIsShared(!isShared)}
          >
            {isShared ? (
              <>
                <FiSquare size={14} /> Stop
              </>
            ) : (
              <>
                <FiShare2 size={14} /> Share
              </>
            )}
          </ToggleButton>
        </RightSection>
      </CardWrapper>

      {/* Animated Modal Popup with Smooth Open/Close */}
      {isModalOpen && (
        <ModalOverlay $isClosing={isClosing} onClick={handleCloseModal}>
          <ModalContent $isClosing={isClosing} onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>{type} Details: {title}</ModalTitle>
              <CloseButton onClick={handleCloseModal} aria-label="Close modal">
                <FiX size={20} />
              </CloseButton>
            </ModalHeader>
            <ModalBody>
              Modal content for {type} will be designed here later...
            </ModalBody>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
}