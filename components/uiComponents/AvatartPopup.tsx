'use client';

import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover .popup-card {
    opacity: 1;
    visibility: visible;
    transform: translateX(-50%) translateY(0) scale(1);
  }
`;

const CircleAvatar = styled.div<{ $bgColor?: string }>`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: ${(props) => props.$bgColor || '#4f46e5'};
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.95rem;
  box-shadow: 0 4px 12px ${(props) => (props.$bgColor ? `${props.$bgColor}40` : 'rgba(79, 70, 229, 0.25)')};
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: scale(1.08);
    box-shadow: 0 6px 16px ${(props) => (props.$bgColor ? `${props.$bgColor}60` : 'rgba(79, 70, 229, 0.35)')};
  }
`;

const PopupCard = styled.div`
  position: absolute;
  bottom: calc(100% + 12px);
  left: 50%;
  transform: translateX(-50%) translateY(8px) scale(0.95);
  background: #ffffff;
  color: #0f172a;
  padding: 0.6rem 0.85rem;
  border-radius: 0.75rem;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.12), 0 8px 10px -6px rgba(0, 0, 0, 0.08);
  white-space: nowrap;
  z-index: 50;
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  border: 1px solid #e2e8f0;

  /* Little arrow pointing down to the avatar */
  &::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border-width: 6px;
    border-style: solid;
    border-color: #ffffff transparent transparent transparent;
  }

  /* Arrow border layer */
  &::before {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border-width: 7px;
    border-style: solid;
    border-color: #e2e8f0 transparent transparent transparent;
  }
`;

const Name = styled.div`
  font-weight: 600;
  font-size: 0.85rem;
  color: #0f172a;
  margin-bottom: 0.1rem;
`;

const RollNumber = styled.div`
  font-size: 0.75rem;
  color: #64748b;
`;

interface AvatarPopupProps {
  number: string | number;
  name: string;
  rollNumber: string;
  bgColor?: string; // Optional custom background color prop
}

export function AvatarPopup({ number, name, rollNumber, bgColor }: AvatarPopupProps) {
  return (
    <Container>
      <CircleAvatar $bgColor={bgColor}>{number}</CircleAvatar>
      
      <PopupCard className="popup-card">
        <Name>{name}</Name>
        <RollNumber>Roll: {rollNumber}</RollNumber>
      </PopupCard>
    </Container>
  );
}