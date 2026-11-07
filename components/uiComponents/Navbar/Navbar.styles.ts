import styled from 'styled-components';

export const Header = styled.header`
  width: 100%;
  background-color: #ffffff;
  border-bottom: 1px solid #e5e7eb;
  padding: 12px 24px;
  box-sizing: border-box;
`;

export const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Logo = styled.div`
  font-weight: 700;
  font-size: 20px;
  color: #111827;
  cursor: pointer;
`;

export const NavGroup = styled.nav`
  display: flex;
  align-items: center;
  gap: 8px;
`;