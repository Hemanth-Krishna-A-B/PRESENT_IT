'use client';

import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';


import {
  WrapperCard,
  HeaderBar,
  QuestionAlertButton,
  GridContainer,
  PaginationFooter,
  NavButton,
} from './ActiveUsers.styles';
import { AvatarPopup, UserData } from '../AvatarPopup/AvatarPopup';
import { AnswerModal } from '../AnswerModal/AnswerModal';

const USERS_PER_PAGE = 30;

interface ActiveUsersProps {
  users?: UserData[];
  onAnswerSubmit?: (user: UserData, answerText: string, mode: 'everyone' | 'userOnly') => void;
}

export default function ActiveUsers({ 
  users: externalUsers, 
  onAnswerSubmit 
}: ActiveUsersProps) {
  const [internalUsers, setInternalUsers] = useState<UserData[]>(() => {
    const colors = ['#4f46e5', '#0284c7', '#0d9488', '#16a34a', '#ca8a04', '#dc2626', '#9333ea', '#db2777'];
    return Array.from({ length: 35 }, (_, index) => ({
      id: index + 1,
      name: `Student ${index + 1}`,
      rollNumber: `CS-2026-${(index + 1).toString().padStart(3, '0')}`,
      bgColor: colors[index % colors.length],
      hasQuestion: index === 2 || index === 5,
      questionText: index === 2 ? "Can you explain useEffect dependency arrays?" : index === 5 ? "Is this on the exam?" : undefined,
      questionTimestamp: index === 2 || index === 5 ? Date.now() : undefined,
    }));
  });

  const users = externalUsers || internalUsers;
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [selectedUserForAnswer, setSelectedUserForAnswer] = useState<UserData | null>(null);

  const sortedUsers = [...users].sort((a, b) => {
    if (a.hasQuestion && b.hasQuestion) {
      return (a.questionTimestamp || 0) - (b.questionTimestamp || 0);
    }
    if (a.hasQuestion) return -1;
    if (b.hasQuestion) return 1;
    return typeof a.id === 'number' && typeof b.id === 'number' ? a.id - b.id : 0;
  });

  const pendingQuestions = sortedUsers.filter((u) => u.hasQuestion);
  const totalPages = Math.ceil(sortedUsers.length / USERS_PER_PAGE) || 1;
  const startIndex = currentPage * USERS_PER_PAGE;
  const currentSlideUsers = sortedUsers.slice(startIndex, startIndex + USERS_PER_PAGE);

  const jumpToFirstPending = () => {
    if (pendingQuestions.length === 0) return;
    const targetStudent = pendingQuestions[0];
    const targetIndex = sortedUsers.findIndex((u) => u.id === targetStudent.id);
    const targetPage = Math.floor(targetIndex / USERS_PER_PAGE);
    setCurrentPage(targetPage);
  };

  const handleSendAnswer = (answerText: string, mode: 'everyone' | 'userOnly') => {
    if (!selectedUserForAnswer) return;

    if (onAnswerSubmit) {
      onAnswerSubmit(selectedUserForAnswer, answerText, mode);
    } else {
      setInternalUsers((prev) =>
        prev.map((u) =>
          u.id === selectedUserForAnswer.id
            ? { ...u, hasQuestion: false, questionText: undefined, questionTimestamp: undefined }
            : u
        )
      );
    }

    setSelectedUserForAnswer(null);
  };

  return (
    <WrapperCard>
      <HeaderBar>
        <span style={{ marginLeft:"1.5rem", fontWeight: 700, fontSize: '0.85rem' }}>
          Active Listenres : {users.length}
        </span>

        {pendingQuestions.length > 0 && (
          <QuestionAlertButton onClick={jumpToFirstPending}>
            <span>{pendingQuestions.length}{(pendingQuestions.length > 1) ? " New Question" : " New Questions"}</span>
          </QuestionAlertButton>
        )}
      </HeaderBar>

      <AnimatePresence mode="wait">
        <GridContainer
          key={currentPage}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.15 }}
        >
          {currentSlideUsers.map((user, index) => {
            const isTopRow = index < 5;
            const isLastColumn = index % 5 === 4;

            return (
              <AvatarPopup
                key={user.id}
                user={user}
                isTopRow={isTopRow}
                isLastColumn={isLastColumn}
                onAnswerClick={(targetUser) => setSelectedUserForAnswer(targetUser)}
              />
            );
          })}
        </GridContainer>
      </AnimatePresence>

      <PaginationFooter>
        <NavButton
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
          disabled={currentPage === 0}
        >
          ‹
        </NavButton>
        <span>
          Page {currentPage + 1} of {totalPages}
        </span>
        <NavButton
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))}
          disabled={currentPage === totalPages - 1}
        >
          ›
        </NavButton>
      </PaginationFooter>

      <AnswerModal
        user={selectedUserForAnswer}
        onClose={() => setSelectedUserForAnswer(null)}
        onSend={handleSendAnswer}
      />
    </WrapperCard>
  );
}