'use client';

import React, { useState } from 'react';
import { 
  FiHelpCircle, 
  FiBarChart2, 
  FiMonitor, 
  FiCheckCircle, 
  FiShare2, 
  FiSquare 
} from 'react-icons/fi';
import {
  CardWrapper,
  LeftSection,
  CircleAvatar,
  ItemInfo,
  ItemTitle,
  ItemSubtitle,
  CenterSection,
  ProgressMeta,
  ProgressLabel,
  ProgressStats,
  PixelProgressBar,
  RightSection,
  ToggleButton,
} from '../../uiComponents/ActivitySessionCard/ActivitySessionCard.styles';
import { ActivityType } from '../ActivitySessionCard';
import { ActivitySessionModal } from '../../appComponents/ActivitySession/ActivitySessionCard';




interface ActivitySessionCardProps {
  type: ActivityType;
  title: string;
  completedCount: number;
  totalCount: number;
  bgColor?: string;
}

export function ActivitySessionCard({
  type,
  title,
  completedCount,
  totalCount,
  bgColor,
}: ActivitySessionCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isShared, setIsShared] = useState(false);

  const percentage = Math.min(Math.max((completedCount / totalCount) * 100, 0), 100);

  const renderIcon = () => {
    switch (type) {
      case 'QA':
        return <FiHelpCircle />;
      case 'Poll':
        return <FiBarChart2 />;
      case 'Present':
        return <FiMonitor />;
      default:
        return <FiBarChart2 />;
    }
  };

  const handleOpenModal = () => {
    setIsClosing(false);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setIsClosing(false);
    }, 200);
  };

  return (
    <>
      <CardWrapper>
        {/* Left side: Clickable Icon Avatar opens modal */}
        <LeftSection>
          <CircleAvatar 
            $bgColor={bgColor} 
            onClick={handleOpenModal}
            title={`View ${type} details`}
          >
            {renderIcon()}
          </CircleAvatar>
          <ItemInfo>
            <ItemTitle>{title}</ItemTitle>
            <ItemSubtitle>
              <FiCheckCircle size={13} color="#10b981" />
              {completedCount} of {totalCount} completed
            </ItemSubtitle>
          </ItemInfo>
        </LeftSection>

        {/* Center: Pixelated progress bar */}
        <CenterSection>
          <ProgressMeta>
            <ProgressLabel>Status Progress</ProgressLabel>
            <ProgressStats>{Math.round(percentage)}%</ProgressStats>
          </ProgressMeta>
          <PixelProgressBar $percentage={percentage} $color={bgColor} />
        </CenterSection>

        {/* Right side: Share & Stop Toggle Button */}
        <RightSection>
          <ToggleButton 
            $isShared={isShared} 
            onClick={() => setIsShared(!isShared)}
          >
            {isShared ? (
              <>
                <FiSquare size={14} /> Stop
              </>
            ) : (
              <>
                <FiShare2 size={14} /> Share
              </>
            )}
          </ToggleButton>
        </RightSection>
      </CardWrapper>

      {/* Modal Popup Component */}
      <ActivitySessionModal
        isOpen={isModalOpen}
        isClosing={isClosing}
        type={type}
        title={title}
        onClose={handleCloseModal}
      />
    </>
  );
}