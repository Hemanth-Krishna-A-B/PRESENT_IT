import styled from 'styled-components';

export const IconBox = styled.div<{ $variant?: 'primary' | 'danger' }>`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: ${(props) => (props.$variant === 'danger' ? '#fee2e2' : '#e0e7ff')};
  color: ${(props) => (props.$variant === 'danger' ? '#dc2626' : '#4f46e5')};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
`;

export const ModalTitle = styled.h3`
  font-size: 1.15rem;
  font-weight: 700;
  color: #0f172a;
  margin: 0 0 0.5rem 0;
  text-align: center;
`;

export const ModalSubtitle = styled.p`
  font-size: 0.85rem;
  color: #64748b;
  text-align: center;
  margin: 0;
  line-height: 1.4;
`;

export const ModalButtonGroup = styled.div`
  display: flex;
  gap: 0.75rem;
  width: 100%;
  margin-top: 1.5rem;
`;

export const ActionButton = styled.button<{ $variant?: 'primary' | 'danger' | 'secondary' }>`
  flex: 1;
  padding: 0.75rem;
  border-radius: 0.75rem;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  border: none;
  transition: background 0.2s ease, transform 0.1s ease;

  background: ${(props) => {
    if (props.$variant === 'danger') return '#dc2626';
    if (props.$variant === 'primary') return '#4f46e5';
    return '#f1f5f9';
  }};

  color: ${(props) => (props.$variant === 'secondary' ? '#475569' : '#ffffff')};

  &:hover {
    background: ${(props) => {
      if (props.$variant === 'danger') return '#b91c1c';
      if (props.$variant === 'primary') return '#4338ca';
      return '#e2e8f0';
    }};
  }

  &:active {
    transform: scale(0.98);
  }
`;