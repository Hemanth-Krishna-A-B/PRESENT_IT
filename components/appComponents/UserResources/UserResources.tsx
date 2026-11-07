import { ElementType } from "react";
import { FlexBox } from "../../layout/FlexBox";
import { Presentation, Vote, HelpCircle, Zap } from 'lucide-react';
import * as S from "../../uiComponents/Navbar/Navbar.styles"
import NavButton from "../../uiComponents/NavButton/NavButton";


interface NavItem {
  id: string;
  label: string;
  icon: ElementType;
  variant: 'ghost' | 'primary';
}

export default function UserResources(){
    const navItems: NavItem[] = [
    { id: 'presentations', label: 'Presentations', icon: Presentation, variant: 'ghost' },
    { id: 'polls', label: 'Polls', icon: Vote, variant: 'ghost' },
    { id: 'questions', label: 'Questions', icon: HelpCircle, variant: 'ghost' },
    { id: 'instant-ask', label: 'Instant Ask', icon: Zap, variant: 'primary' },
  ];
  const handleNavClick = (id: string): void => {
    console.log(`Clicked action: ${id}`);
  };
    return(
        <FlexBox background="#454545" width="100%" height="100%" radius="16px" overflow="hidden" direction="column">
            <FlexBox  background="#d00000" width="100%" height="10%"></FlexBox>
            
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
    
            <FlexBox background="#3700d0" width="100%" height="90%"></FlexBox>
        </FlexBox>
    )
}