'use client';

import React from 'react';
import { FiPlay } from 'react-icons/fi';
import { HiQrCode } from 'react-icons/hi2';
import * as S from './ToggleButtonTrack.styles';

interface ToggleButtonTrackProps {
  isActive: boolean;
  sessionCode?: string;
  onToggle: () => void;
  onQrClick: (e: React.MouseEvent) => void;
}

export function ToggleButtonTrack({
  isActive,
  sessionCode,
  onToggle,
  onQrClick,
}: ToggleButtonTrackProps) {
  return (
    <S.ToggleTrack
      $isActive={isActive}
      onClick={onToggle}
      aria-label={isActive ? `Session active ${sessionCode}` : 'Start session'}
    >
      <S.ToggleThumb $isActive={isActive}>
        {!isActive ? (
          <S.StartContent>
            <FiPlay size={14} fill="currentColor" /> Start
          </S.StartContent>
        ) : (
          <S.ActiveContent>
            <S.NumberText>#{sessionCode}</S.NumberText>
            <S.QrIconButton
              onClick={(e) => {
                e.stopPropagation();
                onQrClick(e);
              }}
              aria-label="View QR Code"
              role="button"
            >
              <HiQrCode size={18} />
            </S.QrIconButton>
          </S.ActiveContent>
        )}
      </S.ToggleThumb>
    </S.ToggleTrack>
  );
}