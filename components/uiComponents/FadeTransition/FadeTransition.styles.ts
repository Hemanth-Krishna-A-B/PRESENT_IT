import styled from 'styled-components';

interface StyledWrapperProps {
  $isVisible: boolean;
  $duration: string;
  $easing: string;
  $translateY: string;
}

export const StyledWrapper = styled.div<StyledWrapperProps>`
  opacity: ${(props) => (props.$isVisible ? 1 : 0)};
  transform: translateY(${(props) => (props.$isVisible ? '0px' : props.$translateY)});
  transition: opacity ${(props) => props.$duration} ${(props) => props.$easing},
              transform ${(props) => props.$duration} ${(props) => props.$easing};
  width: 100%;
  height: 100%;
`;