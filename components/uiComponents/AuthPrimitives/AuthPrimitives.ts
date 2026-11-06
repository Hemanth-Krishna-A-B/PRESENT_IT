import styled from 'styled-components';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.15rem;
  width: 100%;
`;

export const FormGroup = styled.div`
  width: 100%;
`;

export const CollapsibleFormGroup = styled.div<{ $isVisible: boolean }>`
  max-height: ${(props) => (props.$isVisible ? '80px' : '0px')};
  opacity: ${(props) => (props.$isVisible ? 1 : 0)};
  overflow: hidden;
  pointer-events: ${(props) => (props.$isVisible ? 'auto' : 'none')};
  transition: max-height 0.4s cubic-bezier(0.77, 0, 0.175, 1),
              opacity 0.3s ease-in-out;
`;

export const Label = styled.label`
  display: block;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #475569;
  margin-bottom: 0.3rem;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: 0.75rem;
  border: 1px solid #cbd5e1;
  color: #1e293b;
  font-size: 0.875rem;
  outline: none;
  transition: all 0.2s ease;
  box-sizing: border-box;

  &:focus {
    border-color: transparent;
    box-shadow: 0 0 0 2px #4f46e5;
  }
`;

export const InputIconWrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const IconButton = styled.button`
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  color: #94a3b8;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: #475569;
  }
`;

export const Button = styled.button<{ $variant?: 'primary' | 'secondary' }>`
  width: 100%;
  padding: 0.875rem 1rem;
  background-color: ${(props) => (props.$variant === 'secondary' ? '#64748b' : '#4f46e5')};
  color: #ffffff;
  font-weight: 500;
  border-radius: 0.75rem;
  border: none;
  box-shadow: ${(props) =>
    props.$variant === 'secondary'
      ? '0 10px 15px -3px rgba(100, 116, 139, 0.3)'
      : '0 10px 15px -3px rgba(79, 70, 229, 0.3)'};
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.1s ease;
  font-size: 0.875rem;

  &:hover {
    background-color: ${(props) => (props.$variant === 'secondary' ? '#475569' : '#4338ca')};
  }
  &:active {
    transform: scale(0.98);
  }
`;

export const Divider = styled.div<{ $color?: string }>`
  position: relative;
  margin: 1.25rem 0;
  text-align: center;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    border-top: 1px solid #e2e8f0;
  }

  span {
    position: relative;
    background: #ffffff;
    padding: 0 1rem;
    font-size: 0.75rem;
    color: ${(props) => props.$color || '#94a3b8'};
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }
`;

export const SectionHeader = styled.div<{ $isAnimating?: boolean }>`
  margin-bottom: 1.25rem;
  opacity: ${(props) => (props.$isAnimating ? 0 : 1)};
  transform: translateY(${(props) => (props.$isAnimating ? '8px' : '0px')});
  transition: opacity 0.25s ease-in-out, transform 0.25s ease-in-out;

  h2 {
    font-size: 1.5rem;
    font-weight: 700;
    color: #0f172a;
    margin: 0 0 0.25rem 0;

    @media (min-width: 1024px) {
      font-size: 1.75rem;
    }
  }

  p {
    font-size: 0.8125rem;
    color: #64748b;
    margin: 0;
    line-height: 1.4;

    @media (min-width: 1024px) {
      font-size: 0.875rem;
    }
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  padding: 1rem;
  backdrop-filter: blur(4px);
`;

export const ModalCard = styled.div<{ $maxWidth?: string }>`
  background: #ffffff;
  padding: 24px;
  border-radius: 20px;
  width: 100%;
  max-width: ${(props) => props.$maxWidth || '380px'};
  text-align: center;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.2);
  position: relative;
`;

export const CloseModalButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: #f1f5f9;
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  font-size: 14px;
  cursor: pointer;
  color: #64748b;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s ease;
  z-index: 10;

  &:hover {
    background: #e2e8f0;
    color: #0f172a;
  }
`;

export const ModalTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 1rem;
`;

export const CameraContainer = styled.div<{ $height?: string }>`
  width: 100%;
  height: ${(props) => props.$height || '240px'};
  background: #0f172a;
  border-radius: 14px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
  position: relative;
  overflow: hidden;
`;

export const StyledVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const CameraErrorWrapper = styled.div`
  color: #f87171;
  padding: 1rem;
  font-size: 0.85rem;
  text-align: center;

  p {
    margin-top: 8px;
    line-height: 1.4;
  }
`;

export const ModalFooterText = styled.p`
  font-size: 0.75rem;
  color: #64748b;
  line-height: 1.4;
`;