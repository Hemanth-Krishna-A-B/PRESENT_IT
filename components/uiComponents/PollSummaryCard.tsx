'use client';

import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { FiMoreVertical, FiX, FiUsers, FiCheckCircle } from 'react-icons/fi';

const CardWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 1rem;
  padding: 1.25rem 1.5rem;
  width: 100%;
  max-width: 58rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
  transition: all 0.2s ease;
  box-sizing: border-box;

  &:hover {
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
    border-color: #cbd5e1;
  }
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  min-width: 240px;
`;

const IconBadge = styled.div<{ $bgColor?: string }>`
  width: 48px;
  height: 48px;
  border-radius: 1rem;
  background: ${(props) => props.$bgColor || '#0f172a'};
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  flex-shrink: 0;
  cursor: pointer;
  box-shadow: 0 4px 10px ${(props) => (props.$bgColor ? `${props.$bgColor}40` : 'rgba(15, 23, 42, 0.25)')};
  transition: transform 0.2s ease, filter 0.2s ease;

  &:hover {
    transform: scale(1.05);
    filter: brightness(1.1);
  }
`;

const PollInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const PollTitle = styled.span`
  font-weight: 700;
  font-size: 1rem;
  color: #0f172a;
  line-height: 1.2;
`;

const PollSubtitle = styled.span`
  font-size: 0.75rem;
  color: #64748b;
  margin-top: 0.25rem;
  display: flex;
  align-items: center;
  gap: 0.35rem;
`;

const CenterSection = styled.div`
  flex: 1;
  max-width: 320px;
  margin: 0 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

const ProgressMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.8rem;
`;

const ProgressLabel = styled.span`
  font-weight: 500;
  color: #475569;
`;

const ProgressStats = styled.span`
  font-weight: 600;
  color: #0f172a;
`;

const fillAnimation = (targetWidth: number) => keyframes`
  from { width: 0%; }
  to { width: ${targetWidth}%; }
`;

const PixelProgressBar = styled.div<{ $percentage: number }>`
  width: 100%;
  height: 14px;
  background: #f1f5f9;
  border-radius: 2px;
  overflow: hidden;
  position: relative;
  background-image: repeating-linear-gradient(
    90deg, #f1f5f9, #f1f5f9 4px, #ffffff 4px, #ffffff 6px
  );

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    background: #0f172a;
    background-image: repeating-linear-gradient(
      90deg, #0f172a, #0f172a 6px, #334155 6px, #334155 8px
    );
    border-radius: 2px;
    animation: ${(props) => fillAnimation(props.$percentage)} 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }
`;

const RightSection = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const MenuButton = styled.button`
  background: transparent;
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #64748b;
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease;

  &:hover {
    background: #f1f5f9;
    color: #0f172a;
  }
`;

/* Modal Styles with Animations */
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const scaleUp = keyframes`
  from { opacity: 0; transform: scale(0.95) translateY(10px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
`;

const ModalOverlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.5);
  backdrop-filter: blur(4px);
  display: ${(props) => (props.$isOpen ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  z-index: 100;
  animation: ${fadeIn} 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  padding: 1rem;
`;

const ModalContent = styled.div`
  background: #ffffff;
  width: 100%;
  max-width: 580px;
  border-radius: 1.25rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  animation: ${scaleUp} 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  display: flex;
  flex-direction: column;
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid #e2e8f0;
`;

const ModalTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 700;
  color: #0f172a;
  margin: 0;
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #64748b;
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease;

  &:hover {
    background: #f1f5f9;
    color: #0f172a;
  }
`;

const ModalBody = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  background: #f8fafc;
  max-height: 70vh;
  overflow-y: auto;
`;

const OptionGraphCard = styled.div`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 0.75rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const OptionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.875rem;
`;

const OptionText = styled.span`
  font-weight: 600;
  color: #0f172a;
`;

const OptionVotesCount = styled.span`
  font-weight: 600;
  color: #64748b;
`;

const BarTrack = styled.div`
  width: 100%;
  height: 8px;
  background: #f1f5f9;
  border-radius: 9999px;
  overflow: hidden;
`;

const BarFill = styled.div<{ $percentage: number; $color?: string }>`
  height: 100%;
  background: ${(props) => props.$color || '#4f46e5'};
  border-radius: 9999px;
  width: ${(props) => props.$percentage}%;
  transition: width 0.6s cubic-bezier(0.16, 1, 0.3, 1);
`;

const StudentList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.25rem;
`;

const StudentBadge = styled.span`
  background: #f1f5f9;
  color: #334155;
  font-size: 0.75rem;
  font-weight: 500;
  padding: 0.25rem 0.6rem;
  border-radius: 9999px;
  border: 1px solid #e2e8f0;
`;

export interface StudentVote {
  name: string;
  registerNumber: string;
}

export interface PollOptionWithStudents {
  label: string;
  votes: number;
  students: StudentVote[];
}

interface PollSummaryCardProps {
  pollTitle: string;
  totalStudents: number;
  options: PollOptionWithStudents[];
  bgColor?: string;
}

export function PollSummaryCard({
  pollTitle,
  totalStudents,
  options,
  bgColor,
}: PollSummaryCardProps) {
  const [isGraphModalOpen, setIsGraphModalOpen] = useState(false);
  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);

  const totalParticipated = options.reduce((acc, curr) => acc + curr.votes, 0);
  const participationPercentage = Math.min(
    Math.max((totalParticipated / totalStudents) * 100, 0),
    100
  );

  return (
    <>
      <CardWrapper>
        {/* Left side: Clickable Icon badge opens student breakdown modal */}
        <LeftSection>
          <IconBadge 
            $bgColor={bgColor} 
            onClick={() => setIsStudentModalOpen(true)}
            title="Click to view student responses"
          >
            <FiUsers />
          </IconBadge>
          <PollInfo>
            <PollTitle>{pollTitle}</PollTitle>
            <PollSubtitle>
              <FiCheckCircle size={13} color="#10b981" />
              {totalParticipated} of {totalStudents} students responded
            </PollSubtitle>
          </PollInfo>
        </LeftSection>

        {/* Center: Aggregate pixelated progress bar */}
        <CenterSection>
          <ProgressMeta>
            <ProgressLabel>Participation Rate</ProgressLabel>
            <ProgressStats>{Math.round(participationPercentage)}%</ProgressStats>
          </ProgressMeta>
          <PixelProgressBar $percentage={participationPercentage} />
        </CenterSection>

        {/* Right side: 3-dot menu button opens graph summary modal */}
        <RightSection>
          <MenuButton onClick={() => setIsGraphModalOpen(true)} aria-label="Open poll graph menu">
            <FiMoreVertical size={18} />
          </MenuButton>
        </RightSection>
      </CardWrapper>

      {/* Modal 1: Student Breakdown Modal (Triggered by Left Icon click) */}
      <ModalOverlay $isOpen={isStudentModalOpen} onClick={() => setIsStudentModalOpen(false)}>
        <ModalContent onClick={(e) => e.stopPropagation()}>
          <ModalHeader>
            <ModalTitle>{pollTitle} — Student Responses</ModalTitle>
            <CloseButton onClick={() => setIsStudentModalOpen(false)} aria-label="Close modal">
              <FiX size={20} />
            </CloseButton>
          </ModalHeader>

          <ModalBody>
            {options.map((opt, index) => (
              <OptionGraphCard key={index}>
                <OptionHeader>
                  <OptionText>{opt.label}</OptionText>
                  <OptionVotesCount>{opt.votes} students</OptionVotesCount>
                </OptionHeader>
                <StudentList>
                  {opt.students && opt.students.length > 0 ? (
                    opt.students.map((student, sIdx) => (
                      <StudentBadge key={sIdx}>
                        {student.name} ({student.registerNumber})
                      </StudentBadge>
                    ))
                  ) : (
                    <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontStyle: 'italic' }}>
                      No students selected this option.
                    </span>
                  )}
                </StudentList>
              </OptionGraphCard>
            ))}
          </ModalBody>
        </ModalContent>
      </ModalOverlay>

      {/* Modal 2: Summary Graph Modal (Triggered by 3-Dot menu click) */}
      <ModalOverlay $isOpen={isGraphModalOpen} onClick={() => setIsGraphModalOpen(false)}>
        <ModalContent onClick={(e) => e.stopPropagation()}>
          <ModalHeader>
            <ModalTitle>{pollTitle} — Summary Graph</ModalTitle>
            <CloseButton onClick={() => setIsGraphModalOpen(false)} aria-label="Close modal">
              <FiX size={20} />
            </CloseButton>
          </ModalHeader>

          <ModalBody>
            {options.map((opt, index) => {
              const optionPercentage =
                totalParticipated > 0 ? Math.round((opt.votes / totalParticipated) * 100) : 0;

              return (
                <OptionGraphCard key={index}>
                  <OptionHeader>
                    <OptionText>{opt.label}</OptionText>
                    <OptionVotesCount>
                      {opt.votes} votes ({optionPercentage}%)
                    </OptionVotesCount>
                  </OptionHeader>
                  <BarTrack>
                    <BarFill $percentage={optionPercentage} $color={bgColor} />
                  </BarTrack>
                </OptionGraphCard>
              );
            })}
          </ModalBody>
        </ModalContent>
      </ModalOverlay>
    </>
  );
}