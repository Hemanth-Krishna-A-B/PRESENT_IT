'use client';

import React, { useState } from 'react';
import { 
  AvatarContainer, 
  CircleAvatar, 
  QuestionBadge, 
  PopupCard, 
  Name, 
  RollNumber, 
  QuestionText, 
  AnswerActionButton 
} from './AvatarPopup.styles';

export interface UserData {
  id: number | string;
  name: string;
  rollNumber: string;
  bgColor?: string;
  hasQuestion?: boolean;
  questionText?: string;
  questionTimestamp?: number;
}

interface AvatarPopupProps {
  user: UserData;
  isTopRow: boolean;
  isLastColumn: boolean;
  onAnswerClick: (user: UserData) => void;
}

export function AvatarPopup({ user, isTopRow, isLastColumn, onAnswerClick }: AvatarPopupProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutId) clearTimeout(timeoutId);
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    const id = setTimeout(() => {
      setIsHovered(false);
    }, 150);
    setTimeoutId(id);
  };

  return (
    <AvatarContainer
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      layout
    >
      <CircleAvatar $bgColor={user.bgColor} $hasQuestion={user.hasQuestion}>
        {user.id}
        {user.hasQuestion && <QuestionBadge>?</QuestionBadge>}
      </CircleAvatar>

      <PopupCard $isVisible={isHovered} $isTopRow={isTopRow} $isLastColumn={isLastColumn}>
        <Name>{user.name}</Name>
        <RollNumber>Roll: {user.rollNumber}</RollNumber>
        {user.hasQuestion && (
          <>
            <QuestionText>
              ❓ "{user.questionText || 'Has a question pending'}"
            </QuestionText>
            <AnswerActionButton onClick={() => onAnswerClick(user)}>
              Answer Question
            </AnswerActionButton>
          </>
        )}
      </PopupCard>
    </AvatarContainer>
  );
}