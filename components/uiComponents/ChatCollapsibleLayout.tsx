'use client';

import React, { useState, useRef, useLayoutEffect } from 'react';
import styled, { css } from 'styled-components';

/* Main Page Container */
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100dvh;
  background-color: #f4f1ea;
  overflow: hidden;
  box-sizing: border-box;
`;

/* Top Navigation Bar */
const Navbar = styled.nav`
  height: 60px;
  background-color: #ffffff;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
  z-index: 20;

  .brand {
    font-weight: 700;
    font-size: 16px;
    color: #0f172a;
  }
`;

const NavButton = styled.button<{ $active?: boolean }>`
  background: ${({ $active }) => ($active ? '#1e293b' : '#f1f5f9')};
  color: ${({ $active }) => ($active ? '#ffffff' : '#334155')};
  border: 1px solid ${({ $active }) => ($active ? '#1e293b' : '#cbd5e1')};
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);

  &:hover {
    background: #0f172a;
    color: #ffffff;
    border-color: #0f172a;
  }
`;

/* Flexible Body Layout holding Workspace & Drawer */
const WorkspaceLayout = styled.div`
  flex: 1;
  display: flex;
  padding: 12px;
  gap: 12px;
  overflow: hidden;
  position: relative;
`;

/* Main Workspace Canvas */
const MainWorkspace = styled.main`
  flex: 1;
  background-color: #ffffff;
  border-radius: 16px;
  padding: 32px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.02);
  border: 1px solid #edf2f7;
  text-align: center;
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);

  h2 {
    font-size: 22px;
    font-weight: 700;
    color: #0f172a;
    margin-bottom: 8px;
  }

  p {
    font-size: 14px;
    color: #64748b;
    max-width: 440px;
    line-height: 1.5;
  }
`;

/* Dynamic Sliding Chat Panel */
const ChatPanel = styled.aside<{
  $isOpen: boolean;
  $side: 'left' | 'right';
  $translateX: number;
  $isAnimating: boolean;
}>`
  width: 340px;
  max-width: 90vw;
  height: calc(100% - 24px);
  position: absolute;
  top: 12px;
  ${({ $side }) => ($side === 'left' ? 'left: 12px;' : 'right: 12px;')}
  background-color: #ffffff;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  border: 1px solid #edf2f7;
  box-sizing: border-box;
  z-index: 10;

  /* Smooth Transform Transition across screen */
  transition: ${({ $isAnimating }) =>
    $isAnimating
      ? 'none'
      : 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease'};

  transform: translateX(${({ $translateX }) => $translateX}px);

  ${({ $isOpen, $side }) =>
    !$isOpen &&
    css`
      transform: translateX(${$side === 'left' ? '-120%' : '120%'});
      opacity: 0;
      pointer-events: none;
    `}
`;

/* Chat Header with Top Controls */
const ChatHeader = styled.div`
  padding: 14px 18px;
  background-color: #ffffff;
  border-bottom: 1px solid #f1f5f9;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .title {
    font-weight: 700;
    font-size: 14px;
    color: #0f172a;
  }

  .controls {
    display: flex;
    align-items: center;
    gap: 6px;
  }
`;

const HeaderIconButton = styled.button`
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  color: #475569;
  padding: 6px 10px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  transition: all 0.2s ease;

  &:hover {
    background: #f1f5f9;
    color: #0f172a;
    border-color: #cbd5e1;
  }
`;

const ChatBody = styled.div`
  flex: 1;
  padding: 16px;
  background-color: #fafaf9;
  font-size: 13px;
  color: #4b5563;
  overflow-y: auto;
`;

export function CollapsibleChatDemo() {
  const [isOpen, setIsOpen] = useState(true);
  const [side, setSide] = useState<'left' | 'right'>('right');
  const [translateX, setTranslateX] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const toggleSide = () => {
    if (!containerRef.current || !panelRef.current) return;

    const containerWidth = containerRef.current.clientWidth;
    const panelWidth = panelRef.current.clientWidth;
    const travelDistance = containerWidth - panelWidth - 24;

    // Start sliding animation across the container width
    setIsAnimating(false);
    if (side === 'right') {
      setTranslateX(-travelDistance);
    } else {
      setTranslateX(travelDistance);
    }

    // Reset layout side cleanly after animation finishes
    setTimeout(() => {
      setIsAnimating(true);
      setSide((prev) => (prev === 'right' ? 'left' : 'right'));
      setTranslateX(0);
      requestAnimationFrame(() => {
        setIsAnimating(false);
      });
    }, 500);
  };

  return (
    <PageContainer>
      {/* 1. Navbar */}
      <Navbar>
        <div className="brand">Dashboard</div>
        <NavButton $active={isOpen} onClick={() => setIsOpen(!isOpen)}>
          💬 {isOpen ? 'Close Chat' : 'Open Chat'}
        </NavButton>
      </Navbar>

      {/* 2. Workspace Layout */}
      <WorkspaceLayout ref={containerRef}>
        <MainWorkspace
          style={{
            marginRight: isOpen && side === 'right' ? '352px' : '0px',
            marginLeft: isOpen && side === 'left' ? '352px' : '0px',
          }}
        >
          <h2>Workspace Canvas</h2>
          <p>
            Click <strong>Dock Left / Dock Right</strong> inside the chat header to see the panel smoothly slide across the screen.
          </p>
        </MainWorkspace>

        {/* 3. Smooth Sliding Chat Panel */}
        <ChatPanel
          ref={panelRef}
          $isOpen={isOpen}
          $side={side}
          $translateX={translateX}
          $isAnimating={isAnimating}
        >
          <ChatHeader>
            <span className="title">Discussion</span>
            <div className="controls">
              <HeaderIconButton
                onClick={toggleSide}
                title={`Dock to ${side === 'right' ? 'Left' : 'Right'}`}
              >
                ⇄ {side === 'right' ? 'Dock Left' : 'Dock Right'}
              </HeaderIconButton>

              <HeaderIconButton onClick={() => setIsOpen(false)} title="Close Panel">
                ✕
              </HeaderIconButton>
            </div>
          </ChatHeader>

          <ChatBody>
            <p>
              The chat panel now calculates container distance and smoothly translates across the screen before re-docking.
            </p>
          </ChatBody>
        </ChatPanel>
      </WorkspaceLayout>
    </PageContainer>
  );
}