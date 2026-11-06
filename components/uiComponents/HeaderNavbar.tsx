'use client';
import styled from 'styled-components';
import { NavLinkItem } from '@/types/types';

const NavbarContainer = styled.nav<{ $visible: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  padding: 1.25rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 20;
  opacity: ${(props) => (props.$visible ? 1 : 0)};
  transform: translateY(${(props) => (props.$visible ? '0' : '-20px')});
  transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  pointer-events: ${(props) => (props.$visible ? 'auto' : 'none')};

  @media (min-width: 768px) {
    padding: 1.5rem 4rem;
  }
`;

const NavBrand = styled.h1`
  font-size: clamp(1.2rem, 4vw, 1.5rem);
  font-weight: 800;
  color: #0f172a;
  letter-spacing: -0.04em;
  margin: 0;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1.25rem;
  align-items: center;

  @media (min-width: 768px) {
    gap: 2rem;
  }

  a {
    color: #475569;
    text-decoration: none;
    font-size: 0.95rem;
    font-weight: 500;
    transition: color 0.2s ease;

    &:hover {
      color: #0f172a;
    }

    @media (min-width: 768px) {
      font-size: 1rem;
    }
  }
`;

const NavButton = styled.button`
  background: #D0FF00;
  color: #111827;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: transform 0.2s ease, background 0.2s ease;

  &:hover {
    transform: scale(1.05);
    background: #8116E0;
    color: #D0FF00;
  }

  @media (min-width: 768px) {
    padding: 0.6rem 1.2rem;
    font-size: 0.9rem;
  }
`;

interface HeaderNavbarProps {
  sessionBtn:string
  brandName?: string;
  links?: NavLinkItem[];
  visible: boolean;
  onCtaClick?: () => void;
}

const DEFAULT_LINKS: NavLinkItem[] = [
  { label: 'Features', href: '/join-session' },
  { label: 'Demo', href: '/dashboard' },
];

export function HeaderNavbar({
  sessionBtn,
  brandName = 'Present iT',
  links = DEFAULT_LINKS,
  visible,
  onCtaClick,
}: HeaderNavbarProps) {
  return (
    <NavbarContainer $visible={visible}>
      <NavBrand>{brandName}</NavBrand>

      <NavLinks>
        {links.map((link) => (
          <a key={link.href} href={link.href}>
            {link.label}
          </a>
        ))}
        <NavButton onClick={onCtaClick}>
         {sessionBtn}
        </NavButton>
      </NavLinks>
    </NavbarContainer>
  );
}