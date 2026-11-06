'use client';

import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(4px) scale(0.98);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

const CardWrapper = styled.div`
  background: #ffffff;
  border: 1px solid #edf2f7;
  border-radius: 12px;
  padding: 20px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: 180px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
  transition: all 0.2s ease-in-out;
  cursor: pointer;

  &:hover {
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.05);
    transform: translateY(-2px);
  }
`;
const HoverPopup = styled.div`
  position: absolute;
  bottom: calc(100% + 12px); /* Places it nicely just above the card */
  left: 50%;
  transform: translateX(-50%);
  width: 220px;
  background: #1e293b;
  color: #ffffff;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 12px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 0.2s ease-out forwards;
  z-index: 50;
  pointer-events: none;
  text-align: left;

  /* Centered arrow pointing down at the card */
  &::after {
    content: '';
    position: absolute;
    top: 100%;
    // left: 10%;
    transform: translateX(-50%);
    border-width: 6px;
    border-style: solid;
    border-color: #1e293b transparent transparent transparent;
  }
`;
const TopRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  appearance: none;
  width: 18px;
  height: 18px;
  border: 2px solid #cbd5e1;
  border-radius: 50%;
  outline: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  &:checked {
    background-color: #3b82f6;
    border-color: #3b82f6;
  }

  &:checked::after {
    content: '';
    width: 6px;
    height: 10px;
    border: solid white;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }
`;

const MoreOptionsButton = styled.button`
  background: none;
  border: none;
  color: #94a3b8;
  cursor: pointer;
  font-size: 16px;
  padding: 0;
  letter-spacing: 2px;
`;

const FileIconContainer = styled.div<{ $fileType: 'doc' | 'xls' | 'pdf' }>`
  margin: 10px 0 16px 0;
  width: 44px;
  height: 52px;
  background-color: ${({ $fileType }) => 
    $fileType === 'doc' ? '#3b82f6' : 
    $fileType === 'xls' ? '#10b981' : '#ef4444'};
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: 11px;
  position: relative;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);

  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 12px;
    height: 12px;
    background: white;
    border-bottom-left-radius: 4px;
    opacity: 0.3;
  }
`;

const Title = styled.h4`
  font-size: 14px;
  font-weight: 500;
  color: #1e293b;
  margin: 0 0 16px 0;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
`;

const FooterInfo = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-size: 11px;
  color: #94a3b8;
  border-top: 1px solid #f1f5f9;
  padding-top: 10px;
`;

interface FileCardProps {
  title: string;
  fileType: 'doc' | 'xls' | 'pdf';
  size: string;
  date: string;
  selected?: boolean;
  onSelect?: () => void;
  onMoreClick?: () => void;
}

export function FileCard({ title, fileType, size, date, selected = false, onSelect, onMoreClick }: FileCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <CardWrapper 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered && (
        <HoverPopup>
          <strong>{title}</strong>
          <p style={{ margin: '4px 0 0 0', color: '#94a3b8' }}>Type: {fileType.toUpperCase()} | Size: {size}</p>
        </HoverPopup>
      )}

      <TopRow>
        <Checkbox checked={selected} onChange={onSelect || (() => {})} />
        <MoreOptionsButton onClick={onMoreClick}>⋮</MoreOptionsButton>
      </TopRow>
      
      <FileIconContainer $fileType={fileType}>
        {fileType.toUpperCase()}
      </FileIconContainer>

      <Title title={title}>{title}</Title>

      <FooterInfo>
        <span>{size}</span>
        <span>{date}</span>
      </FooterInfo>
    </CardWrapper>
  );
}