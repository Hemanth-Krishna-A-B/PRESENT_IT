import React, { ElementType } from 'react';
import * as S from './Navbar.styles';
import { Presentation, Vote, HelpCircle, Zap } from 'lucide-react';
import NavButton from '../NavButton/NavButton';

interface NavItem {
  id: string;
  label: string;
  icon: ElementType;
  variant: 'ghost' | 'primary';
}

export const Navbar: React.FC = () => {
  const navItems: NavItem[] = [
    { id: 'presentations', label: 'Presentations', icon: Presentation, variant: 'ghost' },
    { id: 'polls', label: 'Polls', icon: Vote, variant: 'ghost' },
    { id: 'questions', label: 'Questions', icon: HelpCircle, variant: 'ghost' },
    { id: 'instant-ask', label: 'Instant Ask', icon: Zap, variant: 'primary' },
  ];

  const handleNavClick = (id: string): void => {
    console.log(`Clicked action: ${id}`);
  };

  return (
    <S.Header>
      <S.Container>
        {/* Brand / Logo */}
        <S.Logo>MyApp</S.Logo>

        {/* Top-Right Navigation Actions */}
        <S.NavGroup>
          {navItems.map((item) => (
            <NavButton
              key={item.id}
              label={item.label}
              icon={item.icon}
              variant={item.variant}
              onClick={() => handleNavClick(item.id)}
            />
          ))}
        </S.NavGroup>
      </S.Container>
    </S.Header>
  );
};

export default Navbar;