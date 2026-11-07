'use client';

import React, { useEffect } from 'react';
import { FiX } from 'react-icons/fi';
import * as S from './Modal.styles';

interface ModalProps {
  isOpen: boolean;
  isClosing?: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function Modal({ isOpen, isClosing, onClose, children }: ModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <S.ModalOverlay $isClosing={isClosing} onClick={onClose} role="dialog" aria-modal="true">
      <S.ModalCard $isClosing={isClosing} onClick={(e) => e.stopPropagation()}>
        <S.CloseButton onClick={onClose} aria-label="Close dialog">
          <FiX size={18} />
        </S.CloseButton>
        {children}
      </S.ModalCard>
    </S.ModalOverlay>
  );
}