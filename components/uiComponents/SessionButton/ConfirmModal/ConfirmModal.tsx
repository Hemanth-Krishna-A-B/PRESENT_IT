'use client';

import React from 'react';
import { Modal } from '../Modal/Modal';
import * as S from './ConfirmModal.styles';

interface ConfirmModalProps {
  isOpen: boolean;
  isClosing: boolean;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  confirmText: string;
  confirmVariant?: 'primary' | 'danger';
  onClose: () => void;
  onConfirm: () => void;
}

export function ConfirmModal({
  isOpen,
  isClosing,
  icon,
  title,
  subtitle,
  confirmText,
  confirmVariant = 'primary',
  onClose,
  onConfirm,
}: ConfirmModalProps) {
  return (
    <Modal isOpen={isOpen} isClosing={isClosing} onClose={onClose}>
      <S.IconBox $variant={confirmVariant}>{icon}</S.IconBox>

      <S.ModalTitle>{title}</S.ModalTitle>
      <S.ModalSubtitle>{subtitle}</S.ModalSubtitle>

      <S.ModalButtonGroup>
        <S.ActionButton $variant="secondary" onClick={onClose}>
          Cancel
        </S.ActionButton>
        <S.ActionButton $variant={confirmVariant} onClick={onConfirm}>
          {confirmText}
        </S.ActionButton>
      </S.ModalButtonGroup>
    </Modal>
  );
}