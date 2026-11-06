import React, { useState, ChangeEvent } from 'react';
import styled, { keyframes } from 'styled-components';

// ==========================================
// Types
// ==========================================
export interface QuestionItem {
  id: string;
  questionText: string;
  options: string[];
  correctAnswerIndex: number;
  image?: File | null;
  imagePreviewUrl?: string;
}

export interface QuestionBuilderProps {
  onSaveAll?: (questions: QuestionItem[]) => void;
}

// ==========================================
// Animations
// ==========================================
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(12px) scale(0.98);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

// ==========================================
// Styled Components
// ==========================================
const Container = styled.div`
  width: 100%;
  max-width: 680px;
  margin: 0 auto;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, sans-serif;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const QuestionCard = styled.div`
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px -1px rgba(0, 0, 0, 0.02);
  animation: ${fadeIn} 0.35s ease-out forwards;
  display: flex;
  flex-direction: column;
  gap: 16px;
  position: relative;
  transition: box-shadow 0.2s ease;

  &:hover {
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05);
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const QuestionNumber = styled.span`
  font-size: 14px;
  font-weight: 700;
  color: #4f46e5;
  background-color: #e0e7ff;
  padding: 4px 10px;
  border-radius: 20px;
  letter-spacing: 0.3px;
`;

const RemoveButton = styled.button`
  background: transparent;
  border: none;
  color: #94a3b8;
  cursor: pointer;
  padding: 6px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    background-color: #fee2e2;
    color: #ef4444;
  }

  svg {
    width: 18px;
    height: 18px;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Label = styled.label`
  font-size: 13px;
  font-weight: 600;
  color: #334155;
`;

const Textarea = styled.textarea`
  width: 100%;
  min-height: 80px;
  max-height: 200px;
  padding: 10px 14px;
  font-size: 14px;
  font-family: inherit;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  outline: none;
  box-sizing: border-box;
  resize: vertical;
  line-height: 1.5;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:focus {
    border-color: #4f46e5;
    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
  }
`;

const OptionsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;

  @media (max-width: 540px) {
    grid-template-columns: 1fr;
  }
`;

const OptionWrapper = styled.div<{ $isCorrect: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: ${(props) => (props.$isCorrect ? '#f0fdf4' : '#f8fafc')};
  border: 1px solid ${(props) => (props.$isCorrect ? '#10b981' : '#cbd5e1')};
  border-radius: 8px;
  padding: 6px 12px;
  transition: all 0.2s ease;

  &:focus-within {
    border-color: ${(props) => (props.$isCorrect ? '#059669' : '#4f46e5')};
    box-shadow: 0 0 0 3px ${(props) => (props.$isCorrect ? 'rgba(16, 185, 129, 0.1)' : 'rgba(79, 70, 229, 0.1)')};
  }
`;

const RadioInput = styled.input`
  accent-color: #10b981;
  cursor: pointer;
  width: 16px;
  height: 16px;
`;

const OptionInput = styled.input`
  flex: 1;
  border: none;
  background: transparent;
  font-size: 14px;
  outline: none;
  color: #1e293b;
  padding: 4px 0;
`;

const ImageUploadSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const UploadImageButton = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  background-color: #f1f5f9;
  color: #475569;
  font-size: 13px;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  border: 1px dashed #cbd5e1;
  transition: all 0.2s ease;

  &:hover {
    background-color: #e2e8f0;
    color: #1e293b;
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const ImagePreviewContainer = styled.div`
  position: relative;
  width: 50px;
  height: 50px;
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid #cbd5e1;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const RemoveImageButton = styled.button`
  position: absolute;
  top: 2px;
  right: 2px;
  background: rgba(0, 0, 0, 0.6);
  color: #ffffff;
  border: none;
  border-radius: 50%;
  width: 16px;
  height: 16px;
  font-size: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    background: rgba(239, 68, 68, 0.9);
  }
`;

const ActionsBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
`;

const AddMoreButton = styled.button`
  background-color: #ffffff;
  color: #4f46e5;
  border: 1px solid #4f46e5;
  font-size: 14px;
  font-weight: 600;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f5f3ff;
  }

  svg {
    width: 18px;
    height: 18px;
  }
`;

const UploadAllButton = styled.button`
  background-color: #4f46e5;
  color: #ffffff;
  font-size: 14px;
  font-weight: 600;
  padding: 10px 24px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 4px 6px -1px rgba(79, 70, 229, 0.2);
  transition: background-color 0.2s ease, transform 0.15s ease, box-shadow 0.2s ease;

  &:hover {
    background-color: #4338ca;
    transform: translateY(-1px);
    box-shadow: 0 6px 12px -2px rgba(79, 70, 229, 0.3);
  }

  &:active {
    transform: translateY(0);
  }

  svg {
    width: 18px;
    height: 18px;
  }
`;

// ==========================================
// Component
// ==========================================
export const QuestionBuilderComponent: React.FC<QuestionBuilderProps> = ({
  onSaveAll,
}) => {
  const [questions, setQuestions] = useState<QuestionItem[]>([
    {
      id: Math.random().toString(36).substr(2, 9),
      questionText: '',
      options: ['', '', '', ''],
      correctAnswerIndex: 0,
      image: null,
      imagePreviewUrl: '',
    },
  ]);

  const handleAddQuestion = () => {
    setQuestions((prev) => [
      ...prev,
      {
        id: Math.random().toString(36).substr(2, 9),
        questionText: '',
        options: ['', '', '', ''],
        correctAnswerIndex: 0,
        image: null,
        imagePreviewUrl: '',
      },
    ]);
  };

  const handleRemoveQuestion = (id: string) => {
    if (questions.length === 1) return;
    setQuestions((prev) => prev.filter((q) => q.id !== id));
  };

  const handleQuestionChange = (id: string, text: string) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, questionText: text } : q))
    );
  };

  const handleOptionChange = (qId: string, optionIndex: number, text: string) => {
    setQuestions((prev) =>
      prev.map((q) => {
        if (q.id === qId) {
          const newOptions = [...q.options];
          newOptions[optionIndex] = text;
          return { ...q, options: newOptions };
        }
        return q;
      })
    );
  };

  const handleCorrectAnswerChange = (qId: string, optionIndex: number) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === qId ? { ...q, correctAnswerIndex: optionIndex } : q))
    );
  };

  const handleImageChange = (qId: string, e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const previewUrl = URL.createObjectURL(file);
      setQuestions((prev) =>
        prev.map((q) =>
          q.id === qId ? { ...q, image: file, imagePreviewUrl: previewUrl } : q
        )
      );
    }
  };

  const handleRemoveImage = (qId: string) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === qId ? { ...q, image: null, imagePreviewUrl: '' } : q
      )
    );
  };

  const handleSaveAllClick = () => {
    if (onSaveAll) {
      onSaveAll(questions);
    }
  };

  return (
    <Container>
      {questions.map((q, index) => (
        <QuestionCard key={q.id}>
          <CardHeader>
            <QuestionNumber>Question {index + 1}</QuestionNumber>
            {questions.length > 1 && (
              <RemoveButton
                type="button"
                onClick={() => handleRemoveQuestion(q.id)}
                title="Remove Question"
              >
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </RemoveButton>
            )}
          </CardHeader>

          <FormGroup>
            <Label>Question Statement</Label>
            <Textarea
              placeholder="Type your multi-line question statement here..."
              value={q.questionText}
              onChange={(e) => handleQuestionChange(q.id, e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <Label>Options (Select the radio button for the correct answer)</Label>
            <OptionsGrid>
              {q.options.map((option, optIdx) => (
                <OptionWrapper key={optIdx} $isCorrect={q.correctAnswerIndex === optIdx}>
                  <RadioInput
                    type="radio"
                    name={`correct-answer-${q.id}`}
                    checked={q.correctAnswerIndex === optIdx}
                    onChange={() => handleCorrectAnswerChange(q.id, optIdx)}
                    title="Mark as correct answer"
                  />
                  <OptionInput
                    type="text"
                    placeholder={`Option ${optIdx + 1}`}
                    value={option}
                    onChange={(e) => handleOptionChange(q.id, optIdx, e.target.value)}
                  />
                </OptionWrapper>
              ))}
            </OptionsGrid>
          </FormGroup>

          <FormGroup>
            <Label>Optional Image</Label>
            <ImageUploadSection>
              <UploadImageButton htmlFor={`file-upload-${q.id}`}>
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                {q.image ? 'Change Image' : 'Upload Image'}
              </UploadImageButton>
              <HiddenFileInput
                id={`file-upload-${q.id}`}
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(q.id, e)}
              />

              {q.imagePreviewUrl && (
                <ImagePreviewContainer>
                  <img src={q.imagePreviewUrl} alt="Preview" />
                  <RemoveImageButton
                    type="button"
                    onClick={() => handleRemoveImage(q.id)}
                    title="Remove image"
                  >
                    ✕
                  </RemoveImageButton>
                </ImagePreviewContainer>
              )}
            </ImageUploadSection>
          </FormGroup>
        </QuestionCard>
      ))}

      <ActionsBar>
        <AddMoreButton type="button" onClick={handleAddQuestion}>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 4v16m8-8H4"
            />
          </svg>
          Add Another Question
        </AddMoreButton>

        <UploadAllButton type="button" onClick={handleSaveAllClick}>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
            />
          </svg>
          Upload All Questions
        </UploadAllButton>
      </ActionsBar>
    </Container>
  );
};

export default QuestionBuilderComponent;