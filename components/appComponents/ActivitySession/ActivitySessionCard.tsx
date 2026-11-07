'use client';

import React, { useState } from 'react';
import { FiX, FiCheckCircle } from 'react-icons/fi';
import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalTitle,
  CloseButton,
  ModalBody,
} from '../../uiComponents/ActivitySessionCard/ActivitySessionCard.styles';

export type ActivityType = 'QA' | 'Poll' | 'Present';

export interface QuestionItem {
  id: string | number;
  questionText: string;
  author?: string;
  votes?: number;
  isResolved?: boolean;
}

interface ActivitySessionModalProps {
  isOpen?: boolean;
  isClosing?: boolean;
  type?: ActivityType;
  title?: string;
  onClose?: () => void;
  initialQuestions?: QuestionItem[];
}

export function ActivitySessionModal({
  isOpen = true, // Defaults to true if uncontrolled
  isClosing = false,
  type = 'QA',
  title = 'Default Session Title',
  onClose = () => {},
  initialQuestions = [
    { id: 1, questionText: 'How do we configure custom server actions in Next.js?', author: 'Alex Chen', votes: 12, isResolved: true },
    { id: 2, questionText: 'Can we use styled-components with Server Components?', author: 'Sarah Jenkins', votes: 8, isResolved: false },
  ],
}: ActivitySessionModalProps) {
  const [questions] = useState<QuestionItem[]>(initialQuestions);
  const [internalIsOpen, setInternalIsOpen] = useState(isOpen);

  // Handle closing either via prop or internal state
  const handleClose = () => {
    setInternalIsOpen(false);
    onClose();
  };

  if (!internalIsOpen) return null;

  return (
    <ModalOverlay $isClosing={isClosing} onClick={handleClose}>
      <ModalContent $isClosing={isClosing} onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>
            {type} Details: {title}
          </ModalTitle>
          <CloseButton onClick={handleClose} aria-label="Close modal">
            <FiX size={20} />
          </CloseButton>
        </ModalHeader>
        
        <ModalBody style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', justifyContent: 'flex-start', maxHeight: '60vh', overflowY: 'auto', padding: '1.5rem', gap: '1rem', fontStyle: 'normal', color: '#334155' }}>
          <h4 style={{ fontSize: '0.95rem', fontWeight: 600, color: '#0f172a', margin: 0 }}>
            Submitted Questions ({questions.length})
          </h4>

          {questions.map((q) => (
            <div 
              key={q.id} 
              style={{ 
                background: '#ffffff', 
                border: '1px solid #e2e8f0', 
                borderRadius: '0.75rem', 
                padding: '1rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
                boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <span style={{ fontWeight: 600, fontSize: '0.9rem', color: '#1e293b' }}>
                  {q.questionText}
                </span>
                {q.isResolved && (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', color: '#10b981', background: '#ecfdf5', padding: '2px 8px', borderRadius: '999px', fontWeight: 500 }}>
                    <FiCheckCircle size={12} /> Resolved
                  </span>
                )}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#64748b', marginTop: '0.25rem' }}>
                <span>Asked by: <strong>{q.author}</strong></span>
                <span>👍 {q.votes} upvotes</span>
              </div>
            </div>
          ))}
        </ModalBody>
      </ModalContent>
    </ModalOverlay>
  );
}