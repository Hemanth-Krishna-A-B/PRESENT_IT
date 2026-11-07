'use client';

import React from 'react';
import { HiQrCode } from 'react-icons/hi2';
import { Modal } from '../Modal/Modal';
import * as S from './QrModal.styles';

interface QrModalProps {
  isOpen: boolean;
  isClosing: boolean;
  sessionCode: string;
  onClose: () => void;
}

export function QrModal({ isOpen, isClosing, sessionCode, onClose }: QrModalProps) {
  return (
    <Modal isOpen={isOpen} isClosing={isClosing} onClose={onClose}>
      <S.ModalTitle>Session QR Code</S.ModalTitle>
      <S.SessionBadge>#{sessionCode}</S.SessionBadge>

      <S.CirculatingWrapper>
        <S.CirculatingRing />
        <S.QrCenterIcon>
          <HiQrCode size={40} />
        </S.QrCenterIcon>
      </S.CirculatingWrapper>

      <S.ModalSubtitle>
        Scan this circulating code to connect participants to session <b>#{sessionCode}</b> instantly.
      </S.ModalSubtitle>
    </Modal>
  );
}