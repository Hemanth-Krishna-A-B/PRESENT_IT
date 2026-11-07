'use client';

import { useState, useEffect } from 'react';

import {
  ModalOverlay,
  ModalContent,
  ModalTitle,
  StudentQuestionBox,
  AnswerTextArea,
  ModalButtonsRow,
  ButtonSecondary,
  ButtonEveryone,
  ButtonOnlyUser,
} from './AnswerModal.styles';
import { UserData } from '../AvatarPopup/AvatarPopup';

interface AnswerModalProps {
  user: UserData | null;
  onClose: () => void;
  onSend: (answerText: string, mode: 'everyone' | 'userOnly') => void;
}

export function AnswerModal({ user, onClose, onSend }: AnswerModalProps) {
  const [answerText, setAnswerText] = useState('');

  useEffect(() => {
    setAnswerText('');
  }, [user]);

  if (!user) return null;

  return (
    <ModalOverlay
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <ModalContent
        initial={{ scale: 0.95, y: 10 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 10 }}
      >
        <ModalTitle>
          Answer Question — {user.name} ({user.rollNumber})
        </ModalTitle>

        <StudentQuestionBox>
          <strong>Student's Question:</strong>
          <p style={{ margin: '4px 0 0 0' }}>"{user.questionText}"</p>
        </StudentQuestionBox>

        <AnswerTextArea
          placeholder="Type your answer here..."
          value={answerText}
          onChange={(e) => setAnswerText(e.target.value)}
          autoFocus
        />

        <ModalButtonsRow>
          <ButtonSecondary onClick={onClose}>Cancel</ButtonSecondary>
          <ButtonOnlyUser onClick={() => onSend(answerText, 'userOnly')}>
            Send to User Only
          </ButtonOnlyUser>
          <ButtonEveryone onClick={() => onSend(answerText, 'everyone')}>
            Send to Everyone
          </ButtonEveryone>
        </ModalButtonsRow>
      </ModalContent>
    </ModalOverlay>
  );
}