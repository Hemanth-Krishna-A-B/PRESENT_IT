'use client';

import React from 'react';
import {
  NavContainer,
  BrandLogo,
  NavGroup,
  NavIconButton,
  UserAvatar,
  NavIconButtonWrapper,
} from './SideNavbar.styles';

export interface NavItem {
  id: string;
  icon: React.ReactNode;
  label: string;
}

export interface SideNavbarProps {
  mainItems: NavItem[];
  secondaryItems?: NavItem[];
  activeId: string;
  onSelect: (id: string) => void;
  brandName?: string;
  userAvatarUrl?: string;
}

export function SideNavbar({
  mainItems,
  secondaryItems = [],
  activeId,
  onSelect,
  brandName = 'Present iT',
  userAvatarUrl = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
}: SideNavbarProps) {
  return (
    <NavContainer>
      {/* 1. Brand Logo */}
      <BrandLogo onClick={() => mainItems[0] && onSelect(mainItems[0].id)}>
        <div className="logo-icon">
            <img src="./favicon.ico" alt={brandName}/>
        </div>
      </BrandLogo>

      {/* 2. Main Navigation Items */}
      <NavGroup>
        {mainItems.map((item) => (
          <NavIconButtonWrapper key={item.id} data-tooltip={item.label}>
            <NavIconButton
              $active={activeId === item.id}
              onClick={() => onSelect(item.id)}
              title={item.label}
            >
              {item.icon}
            </NavIconButton>
          </NavIconButtonWrapper>
        ))}
      </NavGroup>

      {/* 3. Secondary Navigation Items */}
      {secondaryItems.length > 0 && (
        <NavGroup>
          {secondaryItems.map((item) => (
            <NavIconButtonWrapper key={item.id} data-tooltip={item.label}>
              <NavIconButton
                $active={activeId === item.id}
                onClick={() => onSelect(item.id)}
                title={item.label}
              >
                {item.icon}
              </NavIconButton>
            </NavIconButtonWrapper>
          ))}
        </NavGroup>
      )}

      {/* 4. User Profile Avatar */}
      <NavGroup style={{ marginTop: 'auto' }}>
        <NavIconButtonWrapper data-tooltip="Profile">
          <UserAvatar onClick={() => onSelect('profile')} title="Profile">
            <img src={userAvatarUrl} alt="User Profile" />
          </UserAvatar>
        </NavIconButtonWrapper>
      </NavGroup>
    </NavContainer>
  );
}