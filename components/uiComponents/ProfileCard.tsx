'use client';

import React from 'react';
import styled, { keyframes } from 'styled-components';

// -----------------------------------------------------------------------------
// Keyframe Animations
// -----------------------------------------------------------------------------
const blobAnimation = keyframes`
  0% { transform: translate(0px, 0px) scale(1); }
  33% { transform: translate(30px, -40px) scale(1.15); }
  66% { transform: translate(-25px, 20px) scale(0.85); }
  100% { transform: translate(0px, 0px) scale(1); }
`;

const glassWiggle = keyframes`
  0% { transform: translate(0, 0) rotate(0deg); }
  50% { transform: translate(-4px, 4px) rotate(1deg); }
  100% { transform: translate(0, 0) rotate(0deg); }
`;

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

// -----------------------------------------------------------------------------
// Styled Components
// -----------------------------------------------------------------------------
const CardWrapper = styled.div`
  background: #ffffff;
  width: 100%;
  max-width: 380px;
  border-radius: 2rem;
  box-shadow: 0 24px 48px -12px rgba(0, 0, 0, 0.18), 0 8px 16px -4px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  position: relative;
  box-sizing: border-box;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
`;

/* Animated Banner Header */
const BannerContainer = styled.div`
  position: relative;
  width: 100%;
  height: 180px;
  background: #0033cc;
  overflow: hidden;
`;

const BlobContainer = styled.div`
  position: absolute;
  inset: 0;
  filter: blur(35px);
  overflow: hidden;
`;

const Blob1 = styled.div`
  position: absolute;
  top: -20%;
  left: 10%;
  width: 220px;
  height: 220px;
  background: linear-gradient(135deg, #60a5fa, #2563eb);
  border-radius: 50%;
  opacity: 0.85;
  animation: ${blobAnimation} 8s ease-in-out infinite alternate;
`;

const Blob2 = styled.div`
  position: absolute;
  bottom: -30%;
  right: -10%;
  width: 240px;
  height: 240px;
  background: linear-gradient(135deg, #38bdf8, #1d4ed8);
  border-radius: 50%;
  opacity: 0.9;
  animation: ${blobAnimation} 11s ease-in-out -4s infinite alternate;
`;

const Blob3 = styled.div`
  position: absolute;
  top: 30%;
  left: 30%;
  width: 160px;
  height: 160px;
  background: linear-gradient(135deg, #93c5fd, #3b82f6);
  border-radius: 50%;
  opacity: 0.75;
  animation: ${blobAnimation} 9s ease-in-out -2s infinite alternate;
`;

/* Glass Wiggle Overlay */
const GlassOverlay = styled.div`
  position: absolute;
  inset: 0;
  backdrop-filter: blur(12px) saturate(140%);
  -webkit-backdrop-filter: blur(12px) saturate(140%);
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.15) 0%,
    rgba(255, 255, 255, 0.03) 100%
  );
  border-bottom: 1px solid rgba(255, 255, 255, 0.25);
  box-shadow: inset 0 0 20px rgba(255, 255, 255, 0.15);
  animation: ${glassWiggle} 7s ease-in-out infinite;
  pointer-events: none;
`;

/* Vertical Line Texture Overlay (recreating the source image texture) */
const TextureOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    90deg,
    transparent,
    transparent 4px,
    rgba(255, 255, 255, 0.05) 4px,
    rgba(255, 255, 255, 0.05) 8px
  );
  pointer-events: none;
`;

/* Overlapping Avatar & Action Button */
const AvatarOverlapContainer = styled.div`
  padding: 0 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: -50px;
  position: relative;
  z-index: 10;
`;

const AvatarCircle = styled.div`
  width: 96px;
  height: 96px;
  border-radius: 50%;
  background: #3b82f6;
  border: 4px solid #ffffff;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.2rem;
  font-weight: 700;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.12);
  user-select: none;
`;

const FollowButton = styled.button`
  background: #000000;
  color: #ffffff;
  border: none;
  padding: 0.55rem 1.6rem;
  border-radius: 9999px;
  font-weight: 600;
  font-size: 0.85rem;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  margin-bottom: 0.25rem;

  &:hover {
    background: #1e293b;
    transform: scale(1.04);
  }

  &:active {
    transform: scale(0.96);
  }
`;

/* Content Area */
const ContentBody = styled.div`
  padding: 1.25rem 1.5rem 1.75rem 1.5rem;
  display: flex;
  flex-direction: column;
`;

const MainGrid = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
`;

const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const Name = styled.h2`
  font-size: 1.6rem;
  font-weight: 700;
  color: #0f172a;
  margin: 0;
  line-height: 1.15;
  letter-spacing: -0.02em;
`;

const Handle = styled.span`
  font-size: 0.95rem;
  color: #94a3b8;
  margin-top: 0.15rem;
  font-weight: 400;
`;

const Bio = styled.p`
  font-size: 0.9rem;
  color: #1e293b;
  margin: 0.85rem 0 1.25rem 0;
  line-height: 1.35;
  max-width: 220px;
`;

const QrBox = styled.div`
  width: 90px;
  height: 90px;
  background: #ffffff;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
`;

/* Stats Row */
const StatsRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 1.25rem;
`;

const StatItem = styled.div`
  display: flex;
  align-items: baseline;
  gap: 0.35rem;
`;

const StatCount = styled.span`
  font-weight: 700;
  font-size: 0.85rem;
  color: #0f172a;
`;

const StatLabel = styled.span`
  font-size: 0.85rem;
  color: #475569;
  font-weight: 400;
`;

const FooterHandle = styled.span`
  font-size: 0.85rem;
  color: #0f172a;
  font-weight: 500;
`;

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------
export function ProfileCard() {
  return (
    <CardWrapper>
      {/* Top Banner with Animated Blobs, Glass Refraction & Vertical Texture Overlay */}
      <BannerContainer>
        <BlobContainer>
          <Blob1 />
          <Blob2 />
          <Blob3 />
        </BlobContainer>
        <TextureOverlay />
        <GlassOverlay />
      </BannerContainer>

      {/* Overlapping Avatar & Follow Button */}
      <AvatarOverlapContainer>
        <AvatarCircle>
          {/* Arc / Crescent Logo Shape */}
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round">
            <path d="M12 4a8 8 0 0 1 8 8 8 8 0 0 1-8 8" />
          </svg>
        </AvatarCircle>
        <FollowButton>Suivre</FollowButton>
      </AvatarOverlapContainer>

      {/* Content Body */}
      <ContentBody>
        <MainGrid>
          <InfoSection>
            <Name>Odyssée</Name>
            <Handle>@odysse.1</Handle>
            <Bio>
              Tout ce qu&apos;il y a à savoir sur le monde.[cite: 2]
            </Bio>
          </InfoSection>

          {/* Styled QR Code Box */}
          <QrBox>
            <svg width="80" height="80" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Corner Position Markers */}
              <rect x="5" y="5" width="26" height="26" rx="6" stroke="#2563eb" strokeWidth="4" />
              <rect x="12" y="12" width="12" height="12" rx="3" fill="#2563eb" />
              
              <rect x="69" y="5" width="26" height="26" rx="6" stroke="#2563eb" strokeWidth="4" />
              <rect x="76" y="12" width="12" height="12" rx="3" fill="#2563eb" />

              <rect x="5" y="69" width="26" height="26" rx="6" stroke="#2563eb" strokeWidth="4" />
              <rect x="12" y="76" width="12" height="12" rx="3" fill="#2563eb" />

              {/* Center Social Icon Badge */}
              <circle cx="50" cy="50" r="14" fill="#ffffff" stroke="#2563eb" strokeWidth="3" />
              <rect x="43" y="43" width="14" height="14" rx="4" stroke="#2563eb" strokeWidth="2.5" />
              <circle cx="50" cy="50" r="3" stroke="#2563eb" strokeWidth="2" />
              <circle cx="54" cy="46" r="1" fill="#2563eb" />

              {/* Data Pattern Dots */}
              <circle cx="42" cy="12" r="2.5" fill="#2563eb" />
              <circle cx="50" cy="12" r="2.5" fill="#2563eb" />
              <circle cx="58" cy="12" r="2.5" fill="#2563eb" />
              <circle cx="42" cy="24" r="2.5" fill="#2563eb" />
              <circle cx="58" cy="24" r="2.5" fill="#2563eb" />

              <circle cx="12" cy="42" r="2.5" fill="#2563eb" />
              <circle cx="24" cy="42" r="2.5" fill="#2563eb" />
              <circle cx="12" cy="58" r="2.5" fill="#2563eb" />
              <circle cx="24" cy="58" r="2.5" fill="#2563eb" />

              <circle cx="76" cy="42" r="2.5" fill="#2563eb" />
              <circle cx="88" cy="42" r="2.5" fill="#2563eb" />
              <circle cx="76" cy="58" r="2.5" fill="#2563eb" />
              <circle cx="88" cy="58" r="2.5" fill="#2563eb" />

              <circle cx="42" cy="76" r="2.5" fill="#2563eb" />
              <circle cx="58" cy="76" r="2.5" fill="#2563eb" />
              <circle cx="42" cy="88" r="2.5" fill="#2563eb" />
              <circle cx="50" cy="88" r="2.5" fill="#2563eb" />
              <circle cx="58" cy="88" r="2.5" fill="#2563eb" />
            </svg>
          </QrBox>
        </MainGrid>

        {/* Stats Row */}
        <StatsRow>
          <StatItem>
            <StatCount>1504</StatCount>
            <StatLabel>Followers</StatLabel>
          </StatItem>
          <StatItem>
            <StatCount>439</StatCount>
            <StatLabel>Suivie(s)</StatLabel>
          </StatItem>
        </StatsRow>

        <FooterHandle>odysse.1</FooterHandle>
      </ContentBody>
    </CardWrapper>
  );
}