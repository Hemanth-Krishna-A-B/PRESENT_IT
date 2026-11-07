'use client';

import React, { useState } from 'react';
import { FiPlay, FiAlertTriangle } from 'react-icons/fi';
import { ToggleButtonTrack } from '../../uiComponents/SessionButton/ToggleButtonTrack/ToggleButtonTrack';
import { ConfirmModal } from '../../uiComponents/SessionButton/ConfirmModal/ConfirmModal';
import { QrModal } from '../../uiComponents/SessionButton/QrModal/QrModal';
interface StylishToggleButtonProps {
  initialActive?: boolean;
  initialCode?: string;
  onStart?: (code: string) => void;
  onStop?: () => void;
}

export function StylishToggleButton({
  initialActive = false,
  initialCode = '8445',
  onStart,
  onStop,
}: StylishToggleButtonProps) {
  const [isActive, setIsActive] = useState(initialActive);
  const [sessionCode, setSessionCode] = useState(initialCode);

  const [activeModal, setActiveModal] = useState<'start' | 'qr' | 'confirm' | null>(null);
  const [isClosing, setIsClosing] = useState(false);

  const handleTrackClick = () => {
    if (!isActive) {
      openModal('start');
    } else {
      openModal('confirm');
    }
  };

  const openModal = (type: 'start' | 'qr' | 'confirm') => {
    setIsClosing(false);
    setActiveModal(type);
  };

  const handleCloseModals = () => {
    setIsClosing(true);
    setTimeout(() => {
      setActiveModal(null);
      setIsClosing(false);
    }, 250);
  };

  const handleConfirmStart = () => {
    const newCode = Math.floor(1000 + Math.random() * 9000).toString();
    setSessionCode(newCode);
    setIsActive(true);
    onStart?.(newCode);
    handleCloseModals();
  };

  const handleConfirmStop = () => {
    setIsActive(false);
    onStop?.();
    handleCloseModals();
  };

  return (
    <>
      <ToggleButtonTrack
        isActive={isActive}
        sessionCode={sessionCode}
        onToggle={handleTrackClick}
        onQrClick={() => openModal('qr')}
      />

      {/* Reusable Confirmation Modal for Starting */}
      <ConfirmModal
        isOpen={activeModal === 'start'}
        isClosing={isClosing}
        icon={<FiPlay size={24} fill="currentColor" />}
        title="Start a New Session?"
        subtitle="Are you ready to kick off this session? A unique session code will be generated instantly."
        confirmText="Start Session"
        confirmVariant="primary"
        onClose={handleCloseModals}
        onConfirm={handleConfirmStart}
      />

      <QrModal
        isOpen={activeModal === 'qr'}
        isClosing={isClosing}
        sessionCode={sessionCode}
        onClose={handleCloseModals}
      />

      {/* Reusable Confirmation Modal for Stopping */}
      <ConfirmModal
        isOpen={activeModal === 'confirm'}
        isClosing={isClosing}
        icon={<FiAlertTriangle size={26} />}
        title={`Stop Session #${sessionCode}?`}
        subtitle="Are you sure you want to end this active session? All live progress tracking will stop."
        confirmText="Stop Session"
        confirmVariant="danger"
        onClose={handleCloseModals}
        onConfirm={handleConfirmStop}
      />
    </>
  );
}