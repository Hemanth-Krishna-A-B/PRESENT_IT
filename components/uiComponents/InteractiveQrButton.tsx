'use client';

import React, { useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { FiPlay, FiX, FiAlertCircle } from 'react-icons/fi';
import { HiQrCode } from 'react-icons/hi2';

const Container = styled.div`
  display: inline-flex;
  align-items: center;
  position: relative;
`;

const buttonExpand = (isExpanded: boolean) => css`
  width: ${isExpanded ? '190px' : '90px'};
  border-radius: 9999px;
  padding: ${isExpanded ? '0.5rem 1rem' : '0.6rem 1.25rem'};
`;

const PillButton = styled.div<{ $isExpanded: boolean }>`
  height: 46px;
  background: #4f46e5;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.$isExpanded ? 'space-between' : 'center')};
  gap: ${(props) => (props.$isExpanded ? '0' : '0.5rem')};
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(79, 70, 229, 0.3);
  overflow: hidden;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  ${(props) => buttonExpand(props.$isExpanded)}

  &:hover {
    background: #4338ca;
    box-shadow: 0 6px 18px rgba(79, 70, 229, 0.4);
  }
`;

const StartLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  letter-spacing: 0.02em;
`;

const ContentWrapper = styled.div<{ $isExpanded: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  opacity: ${(props) => (props.$isExpanded ? 1 : 0)};
  visibility: ${(props) => (props.$isExpanded ? 'visible' : 'hidden')};
  transition: opacity 0.2s ease-in-out 0.1s;
`;

const RandomNumberText = styled.span`
  font-weight: 700;
  font-size: 0.95rem;
  letter-spacing: 0.05em;
  color: #e0e7ff;
`;

const QrIconButton = styled.button`
  background: rgba(255, 255, 255, 0.15);
  border: none;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: scale(1.08);
  }
`;

/* Modal Animations */
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;

const scaleUp = keyframes`
  from { opacity: 0; transform: scale(0.9) translateY(10px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
`;

const scaleDown = keyframes`
  from { opacity: 1; transform: scale(1) translateY(0); }
  to { opacity: 0; transform: scale(0.9) translateY(10px); }
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

const ModalCard = styled.div<{ $isClosing: boolean }>`
  background: #ffffff;
  width: 100%;
  max-width: 360px;
  border-radius: 1.5rem;
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
  align-items: center;
  padding: 2rem 1.5rem;
  position: relative;
`;

const CloseButton = styled.button`
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

const ModalTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 700;
  color: #0f172a;
  margin: 0 0 1rem 0;
  text-align: center;
`;

const SessionBadge = styled.div`
  background: #e0e7ff;
  color: #4338ca;
  font-weight: 700;
  font-size: 0.95rem;
  padding: 0.3rem 0.8rem;
  border-radius: 9999px;
  margin-bottom: 1.25rem;
  letter-spacing: 0.05em;
`;

/* Circulating / Spinning Animation Ring */
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const CirculatingWrapper = styled.div`
  position: relative;
  width: 110px;
  height: 110px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.25rem;
`;

const CirculatingRing = styled.div`
  position: absolute;
  inset: 0;
  border: 4px solid #f1f5f9;
  border-top-color: #4f46e5;
  border-radius: 50%;
  animation: ${spin} 1.5s linear infinite;
`;

const QrCenterIcon = styled.div`
  background: #f8fafc;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #4f46e5;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.04);
`;

const ModalSubtitle = styled.p`
  font-size: 0.85rem;
  color: #64748b;
  text-align: center;
  margin: 0;
  line-height: 1.4;
`;

export function InteractiveStartButton() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [randomNumber, setRandomNumber] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const handleMainClick = () => {
    if (!isExpanded) {
      // Step 1: Start session -> Generate random 4-digit number and expand
      setRandomNumber(Math.floor(1000 + Math.random() * 9000));
      setIsExpanded(true);
    } else {
      // Step 3: Already expanded, clicking it again asks for confirmation to stop session
      const confirmStop = window.confirm(`Are you sure you want to stop session #${randomNumber}?`);
      if (confirmStop) {
        setIsExpanded(false);
        setRandomNumber(null);
      }
    }
  };

  const handleOpenModal = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevents triggering the stop confirmation click on the parent pill
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
      <Container>
        <PillButton $isExpanded={isExpanded} onClick={handleMainClick}>
          {!isExpanded ? (
            <StartLabel>
              <FiPlay size={15} fill="currentColor" /> Start
            </StartLabel>
          ) : (
            <ContentWrapper $isExpanded={isExpanded}>
              <RandomNumberText title="Click to stop session">#{randomNumber}</RandomNumberText>
              <QrIconButton onClick={handleOpenModal} title="View Session QR Code">
                <HiQrCode size={19} />
              </QrIconButton>
            </ContentWrapper>
          )}
        </PillButton>
      </Container>

      {/* Circulating Animated QR Modal */}
      {isModalOpen && (
        <ModalOverlay $isClosing={isClosing} onClick={handleCloseModal}>
          <ModalCard $isClosing={isClosing} onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={handleCloseModal} aria-label="Close modal">
              <FiX size={18} />
            </CloseButton>

            <ModalTitle>Active Session QR</ModalTitle>
            <SessionBadge>#{randomNumber}</SessionBadge>

            <CirculatingWrapper>
              <CirculatingRing />
              <QrCenterIcon>
                <HiQrCode size={38} />
              </QrCenterIcon>
            </CirculatingWrapper>

            <ModalSubtitle>
              Scan this circulating code to connect students to session <b>#{randomNumber}</b> instantly.
            </ModalSubtitle>
          </ModalCard>
        </ModalOverlay>
      )}
    </>
  );
}