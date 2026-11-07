import styled from 'styled-components';

export const ToggleTrack = styled.button<{ $isActive: boolean }>`
  width: 170px;
  height: 52px;
  background: ${(props) => (props.$isActive ? '#0f172a' : '#e2e8f0')};
  border-radius: 9999px;
  padding: 4px;
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;
  border: none;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.08);
  transition: background 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  user-select: none;

  &:hover {
    background: ${(props) => (props.$isActive ? '#1e293b' : '#cbd5e1')};
  }

  &:focus-visible {
    outline: 2px solid #4f46e5;
    outline-offset: 2px;
  }
`;

export const ToggleThumb = styled.div<{ $isActive: boolean }>`
  height: 44px;
  background: #ffffff;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  /* Centers content when inactive, spreads content when active */
  justify-content: ${(props) => (props.$isActive ? 'space-between' : 'center')};
  padding: ${(props) => (props.$isActive ? '0 12px' : '0')};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  position: absolute;
  left: 4px;
  width: ${(props) => (props.$isActive ? '162px' : '72px')};
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  overflow: hidden;
`;

export const StartContent = styled.span`
  display: flex;
  align-items: center;
  justify-content: center; /* <-- Centers text & icon horizontally */
  width: 100%;
  gap: 0.5rem;
  color: #0f172a;
  font-weight: 700;
  font-size: 0.85rem;
  letter-spacing: 0.02em;
  padding-right: 4px; /* Tiny optical offset to account for the play icon */
`;

export const ActiveContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 0.5rem;
`;

export const NumberText = styled.span`
  font-weight: 700;
  font-size: 0.95rem;
  color: #0f172a;
  letter-spacing: 0.05em;
`;

export const QrIconButton = styled.span`
  background: #f1f5f9;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #0f172a;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #e2e8f0;
    transform: scale(1.08);
    color: #4f46e5;
  }
`;