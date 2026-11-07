import styled, { css } from 'styled-components';

export interface ButtonContainerProps {
  $variant?: 'ghost' | 'primary';
}

export const ButtonContainer = styled.button<ButtonContainerProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  border: none;
  cursor: pointer;
  outline: none;
  transition: all 0.2s ease-in-out;

  &:focus-visible {
    box-shadow: 0 0 0 2px #3b82f6;
  }

  ${(props) =>
    props.$variant === 'primary'
      ? css`
          background-color: #2563eb;
          color: #ffffff;
          box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);

          &:hover {
            background-color: #1d4ed8;
          }

          &:active {
            transform: scale(0.97);
          }
        `
      : css`
          background-color: transparent;
          color: #4b5563;

          &:hover {
            background-color: #f3f4f6;
            color: #111827;
          }
        `}
`;

export const IconWrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
`;