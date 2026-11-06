import styled, { keyframes, css } from 'styled-components';

export const growInAnimation = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.85) translateY(30px);
    filter: blur(10px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0px);
    filter: blur(0px);
  }
`;

export const fadeInAnimation = keyframes`
  0% {
    opacity: 0;
    transform: translateY(15px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

interface StyledTextProps {
  $size?: string;
  $weight?: string | number;
  $color?: string;
  $align?: 'left' | 'center' | 'right' | 'justify';
  $lineHeight?: string;
  $margin?: string;
  $animation?: 'grow' | 'fade' | 'none';
  $animationDuration?: string;
}

export const StyledText = styled.div<StyledTextProps>`
  font-size: ${(props) => props.$size || 'clamp(1rem, 2vw, 1.5rem)'};
  font-weight: ${(props) => props.$weight || 600};
  color: ${(props) => props.$color || '#00070c'};
  text-align: ${(props) => props.$align || 'center'};
  line-height: ${(props) => props.$lineHeight || '1.2'};
  margin: ${(props) => props.$margin || '0 0 1rem 0'};
  letter-spacing: -0.03em;
  font-family: inherit;
  box-sizing: border-box;

  ${(props) => {
    if (props.$animation === 'grow') {
      return css`
        animation: ${growInAnimation} ${props.$animationDuration || '3s'} cubic-bezier(0.16, 1, 0.3, 1) forwards;
      `;
    }
    if (props.$animation === 'fade') {
      return css`
        animation: ${fadeInAnimation} ${props.$animationDuration || '1.5s'} ease-out forwards;
      `;
    }
    return '';
  }}
`;