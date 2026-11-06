import styled from 'styled-components';

export const NavContainer = styled.nav`
  /* --- DESKTOP SIDEBAR STYLES (Fluid & Flex-friendly) --- */
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;       /* Fill the FlexBox sidebar wrapper */
  height: 100%;      /* Fill the FlexBox sidebar wrapper */
  background: "transparent"
  border-right: 1px solid #e5e7eb;
  padding: 16px 8px;
  gap: 16px;
  box-sizing: border-box;

  /* --- MOBILE BOTTOM NAV STYLES (Keeps fixed positioning ONLY on mobile) --- */
  @media (max-width: 768px) {
    flex-direction: row;
    width: 100vw;
    height: 64px;
    position: fixed;
    bottom: 0;
    left: 0;
    top: auto;
    border-right: none;
    border-top: 1px solid #e5e7eb;
    background: "transparent"
    padding: 0 12px;
    justify-content: space-around;
    align-items: center;
    gap: 4px;
    box-shadow: 0 -4px 16px rgba(0, 0, 0, 0.04);
    z-index: 1000;
  }
`;

export const BrandLogo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  margin-bottom: 8px;

  .logo-icon {
    width: 36px;
    height: 36px;
    background: #111827;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 12px;
    font-weight: bold;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

export const NavGroup = styled.div`
  background: #c5c561;
  border-radius: 100px;
  padding: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  width: 100%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
  border: 1px solid #f3f4f6;
  box-sizing: border-box;

  @media (max-width: 768px) {
    flex-direction: row;
    background: transparent;
    border: none;
    box-shadow: none;
    padding: 0;
    width: auto;
    gap: 4px;
  }
`;

export const NavIconButton = styled.button<{ $active?: boolean }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background-color: ${({ $active }) => ($active ? '#111827' : 'transparent')};
  color: ${({ $active }) => ($active ? '#ffffff' : '#9ca3af')};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ $active }) => ($active ? '#111827' : '#f3f4f6')};
    color: ${({ $active }) => ($active ? '#ffffff' : '#4b5563')};
  }

  svg {
    width: 20px;
    height: 20px;
    fill: currentColor;
  }
`;

export const UserAvatar = styled.div`
  width: 34px;
  height: 34px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;

export const NavIconButtonWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  &::after {
    content: attr(data-tooltip);
    position: absolute;
    left: calc(100% + 14px);
    top: 50%;
    transform: translateY(-50%) scale(0.85);
    background: #111827;
    color: #ffffff;
    padding: 6px 12px;
    border-radius: 20px;
    font-size: 11px;
    font-weight: 600;
    white-space: nowrap;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.2s ease, transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    box-shadow: 0 4px 12px rgba(17, 24, 39, 0.15);
    z-index: 100;
  }

  &::before {
    content: '';
    position: absolute;
    left: calc(100% + 8px);
    top: 50%;
    transform: translateY(-50%) scale(0.85);
    border-width: 5px 6px 5px 0;
    border-style: solid;
    border-color: transparent #111827 transparent transparent;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.2s ease, transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    z-index: 101;
  }

  @media (min-width: 769px) {
    &:hover::after,
    &:hover::before {
      opacity: 1;
      transform: translateY(-50%) scale(1);
    }
  }
`;