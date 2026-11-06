import styled from 'styled-components';

export const PageWrapper = styled.main`
  background-color: transparent;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem;
  overflow-x: hidden;
  font-family: inherit;
  box-sizing: border-box;
`;

export const CardContainer = styled.div<{ $visible?: boolean }>`
  background: #ffffff;
  width: 100%;
  max-width: 64rem;
  border-radius: 1.5rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  overflow: hidden;
  display: grid;
  grid-template-columns: 1fr;
  position: relative;
  box-sizing: border-box;

  opacity: ${(props) => (props.$visible !== false ? 1 : 0)};
  transform: translateY(${(props) => (props.$visible !== false ? '0px' : '40px')})
    scale(${(props) => (props.$visible !== false ? 1 : 0.95)});
  transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);

  @media (min-width: 1024px) {
    grid-template-columns: repeat(12, minmax(0, 1fr));
    height: 620px;
  }
`;

export const SlidingPanel = styled.div<{ $isShifted: boolean }>`
  position: relative;
  border-radius: 1rem;
  overflow: hidden;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: #ffffff;
  background-color: #020617;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  min-height: 200px;
  z-index: 20;

  @media (min-width: 1024px) {
    position: absolute;
    top: 0;
    left: 0;
    width: 41.666%;
    height: 100%;
    border-radius: 0;
    padding: 3rem 2rem;

    transform: translateX(${(props) => (props.$isShifted ? '0%' : '140%')});
    transition: transform 0.75s cubic-bezier(0.77, 0, 0.175, 1);
  }
`;

export const MainContentPanel = styled.div<{ $isShifted: boolean }>`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (min-width: 1024px) {
    grid-column: span 12 / span 12;
    height: 100%;
    box-sizing: border-box;
    padding: 3rem 4rem;
    padding-left: ${(props) => (props.$isShifted ? 'calc(41.666% + 3rem)' : '4rem')};
    padding-right: ${(props) => (props.$isShifted ? '4rem' : 'calc(41.666% + 3rem)')};
    transition: padding 0.75s cubic-bezier(0.77, 0, 0.175, 1);
  }
`;

export const FullScreenWrapper = styled.div<{ $bgColor?: string }>`
  min-height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ theme, $bgColor }) => $bgColor || theme?.colors?.background || '#0f172a'};
  padding: 1rem;
  box-sizing: border-box;
`;
export const FadeScaleContainer = styled.div<{ 
  $visible: boolean; 
  $transitionDuration?: string; 
  $maxWidth?: string; 
}>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(${props => (props.$visible ? 1 : 0.95)});
  z-index: 10;
  width: 90%;
  max-width: ${props => props.$maxWidth || '64rem'};
  pointer-events: ${props => (props.$visible ? 'auto' : 'none')};
  opacity: ${props => (props.$visible ? 1 : 0)};
  visibility: ${props => (props.$visible ? 'visible' : 'hidden')};
  transition: opacity ${props => props.$transitionDuration || '0.8s'} cubic-bezier(0.16, 1, 0.3, 1),
              transform ${props => props.$transitionDuration || '0.8s'} cubic-bezier(0.16, 1, 0.3, 1),
              visibility ${props => props.$transitionDuration || '0.8s'} ease;
`;