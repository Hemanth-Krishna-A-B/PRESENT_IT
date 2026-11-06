'use client';

import React, { useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { FiPlay, FiX, FiAlertTriangle } from 'react-icons/fi';
import { HiQrCode } from 'react-icons/hi2';

/* Animations */
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(12px) scale(0.96); }
  to { opacity: 1; transform: translateY(0) scale(1); }
`;

const fadeOut = keyframes`
  from { opacity: 1; transform: translateY(0) scale(1); }
  to { opacity: 0; transform: translateY(12px) scale(0.96); }
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

/* Styled Components */
const ToggleTrack = styled.div<{ $isActive: boolean }>`
  width: 170px;
  height: 52px;
  background: ${(props) => (props.$isActive ? '#0f172a' : '#e2e8f0')};
  border-radius: 9999px;
  padding: 4px;
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.08);
  transition: background 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  user-select: none;

  &:hover {
    background: ${(props) => (props.$isActive ? '#1e293b' : '#cbd5e1')};
  }
`;

const ToggleThumb = styled.div<{ $isActive: boolean }>`
  height: 44px;
  background: #ffffff;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.$isActive ? 'space-between' : 'center')};
  padding: ${(props) => (props.$isActive ? '0 12px' : '0')};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  position: absolute;
  left: 4px;
  width: ${(props) => (props.$isActive ? '162px' : '64px')};
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  overflow: hidden;
`;

const StartContent = styled.div`
  display: flex;
  align-items: center;
  gap: 0.35rem;
  color: #0f172a;
  font-weight: 700;
  font-size: 0.85rem;
  letter-spacing: 0.02em;
`;

const ActiveContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 0.5rem;
`;

const NumberText = styled.span`
  font-weight: 700;
  font-size: 0.95rem;
  color: #0f172a;
  letter-spacing: 0.05em;
`;

const QrIconButton = styled.button`
  background: #f1f5f9;
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #0f172a;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #e2e8f0;
    transform: scale(1.08);
    color: #4f46e5;
  }
`;

/* Modal Styles with Slide & Fade Animation */
const ModalOverlay = styled.div<{ $isClosing: boolean }>`
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.5);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  animation: ${fadeIn} 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;

  ${(props) =>
    props.$isClosing &&
    css`
      animation: ${fadeOut} 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    `}
  padding: 1rem;
`;

const ModalCard = styled.div<{ $isClosing: boolean }>`
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

const CloseXButton = styled.button`
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
  transition: background 0.2s ease;

  &:hover {
    background: #e2e8f0;
    color: #0f172a;
  }
`;

const ModalTitle = styled.h3`
  font-size: 1.15rem;
  font-weight: 700;
  color: #0f172a;
  margin: 0 0 0.5rem 0;
`;

const SessionBadge = styled.div`
  background: #e0e7ff;
  color: #4338ca;
  font-weight: 700;
  font-size: 0.9rem;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  margin-bottom: 1.5rem;
  letter-spacing: 0.05em;
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
`;

const ModalSubtitle = styled.p`
  font-size: 0.85rem;
  color: #64748b;
  text-align: center;
  margin: 0;
  line-height: 1.4;
`;

/* Confirmation Modal Content Specifics */
const WarningIconBox = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: #fee2e2;
  color: #dc2626;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
`;

const ModalButtonGroup = styled.div`
  display: flex;
  gap: 0.75rem;
  width: 100%;
  margin-top: 1.5rem;
`;

const Button = styled.button<{ $variant?: 'danger' | 'secondary' }>`
  flex: 1;
  padding: 0.75rem;
  border-radius: 0.75rem;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  border: none;
  transition: background 0.2s ease, transform 0.1s ease;

  background: ${(props) => (props.$variant === 'danger' ? '#dc2626' : '#f1f5f9')};
  color: ${(props) => (props.$variant === 'danger' ? '#ffffff' : '#475569')};

  &:hover {
    background: ${(props) => (props.$variant === 'danger' ? '#b91c1c' : '#e2e8f0')};
  }

  &:active {
    transform: scale(0.98);
  }
`;

export function StylishToggleButton() {
  const [isActive, setIsActive] = useState(false);
  const [sessionCode, setSessionCode] = useState('8445');
  
  // Modals state
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const handleTrackClick = () => {
    if (!isActive) {
      // Turn on & generate random 4-digit code
      const randomNum = Math.floor(1000 + Math.random() * 9000).toString();
      setSessionCode(randomNum);
      setIsActive(true);
    } else {
      // Already active -> Click triggers confirmation modal to stop session
      openConfirmModal();
    }
  };

  const openQrModal = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent toggling the track container
    setIsClosing(false);
    setIsQrModalOpen(true);
  };

  const openConfirmModal = () => {
    setIsClosing(false);
    setIsConfirmModalOpen(true);
  };

  const handleCloseModals = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsQrModalOpen(false);
      setIsConfirmModalOpen(false);
      setIsClosing(false);
    }, 250);
  };

  const handleConfirmStop = () => {
    setIsActive(false);
    handleCloseModals();
  };

  return (
    <>
      {/* Toggle Button */}
      <ToggleTrack $isActive={isActive} onClick={handleTrackClick}>
        <ToggleThumb $isActive={isActive}>
          {!isActive ? (
            <StartContent>
              <FiPlay size={14} fill="currentColor" /> Start
            </StartContent>
          ) : (
            <ActiveContent>
              <NumberText>#{sessionCode}</NumberText>
              <QrIconButton onClick={openQrModal} title="View QR Code">
                <HiQrCode size={18} />
              </QrIconButton>
            </ActiveContent>
          )}
        </ToggleThumb>
      </ToggleTrack>

      {/* QR Code Modal */}
      {isQrModalOpen && (
        <ModalOverlay $isClosing={isClosing} onClick={handleCloseModals}>
          <ModalCard $isClosing={isClosing} onClick={(e) => e.stopPropagation()}>
            <CloseXButton onClick={handleCloseModals}>
              <FiX size={18} />
            </CloseXButton>

            <ModalTitle>Session QR Code</ModalTitle>
            <SessionBadge>#{sessionCode}</SessionBadge>

            <CirculatingWrapper>
              <CirculatingRing />
              <QrCenterIcon>
                <HiQrCode size={40} />
              </QrCenterIcon>
            </CirculatingWrapper>

            <ModalSubtitle>
              Scan this circulating code to connect participants to session <b>#{sessionCode}</b> instantly.
            </ModalSubtitle>
          </ModalCard>
        </ModalOverlay>
      )}

      {/* Stop Session Confirmation Modal */}
      {isConfirmModalOpen && (
        <ModalOverlay $isClosing={isClosing} onClick={handleCloseModals}>
          <ModalCard $isClosing={isClosing} onClick={(e) => e.stopPropagation()}>
            <WarningIconBox>
              <FiAlertTriangle size={26} />
            </WarningIconBox>

            <ModalTitle>Stop Session #{sessionCode}?</ModalTitle>
            <ModalSubtitle style={{ marginBottom: '0.5rem' }}>
              Are you sure you want to end this active session? All live progress tracking will stop.
            </ModalSubtitle>

            <ModalButtonGroup>
              <Button $variant="secondary" onClick={handleCloseModals}>
                Cancel
              </Button>
              <Button $variant="danger" onClick={handleConfirmStop}>
                Stop Session
              </Button>
            </ModalButtonGroup>
          </ModalCard>
        </ModalOverlay>
      )}
    </>
  );
}