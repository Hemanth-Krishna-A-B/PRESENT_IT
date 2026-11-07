import React, { ElementType, MouseEventHandler } from 'react';
import * as S from './NavButton.styles';

export interface NavButtonProps {
  label: string;
  icon?: ElementType;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  variant?: 'ghost' | 'primary';
  className?: string;
}

export const NavButton: React.FC<NavButtonProps> = ({
  label,
  icon: Icon,
  onClick,
  variant = 'ghost',
  className,
}) => {
  return (
    <S.ButtonContainer $variant={variant} onClick={onClick} className={className}>
      {Icon && (
        <S.IconWrapper>
          <Icon />
        </S.IconWrapper>
      )}
      <span>{label}</span>
    </S.ButtonContainer>
  );
};

export default NavButton;