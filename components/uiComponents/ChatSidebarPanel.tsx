'use client';

import React, { useState, useRef, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const popUp = keyframes`
  0% { opacity: 0; transform: translateY(8px) scale(0.95); }
  100% { opacity: 1; transform: translateY(0) scale(1); }
`;

/* 1/3 Screen Width Container */
const ChatContainer = styled.aside`
  flex: 0 0 33.333%;
  max-width: 33.333%;
  height: 100%;
  background-color: #ffffff;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.02);
  box-sizing: border-box;
  border: 1px solid #edf2f7;
`;

const ChatHeader = styled.div`
  padding: 16px 20px;
  border-bottom: 1px solid #f1f5f9;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #ffffff;
  flex-shrink: 0;

  .title {
    font-size: 14px;
    font-weight: 700;
    color: #111827;
    letter-spacing: -0.2px;
  }

  .status-badge {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 11px;
    font-weight: 500;
    color: #059669;
    background: #ecfdf5;
    padding: 4px 10px;
    border-radius: 20px;

    span {
      width: 6px;
      height: 6px;
      background-color: #10b981;
      border-radius: 50%;
    }
  }
`;

const MessageList = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
  background-color: #fafaf9;
`;

const MessageBubble = styled.div<{ $isUser?: boolean }>`
  max-width: 80%;
  padding: 10px 14px;
  border-radius: 14px;
  font-size: 13px;
  line-height: 1.4;
  align-self: ${({ $isUser }) => ($isUser ? 'flex-end' : 'flex-start')};
  background-color: ${({ $isUser }) => ($isUser ? '#111827' : '#ffffff')};
  color: ${({ $isUser }) => ($isUser ? '#ffffff' : '#1f2937')};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
  border: ${({ $isUser }) => ($isUser ? 'none' : '1px solid #f1f5f9')};

  .meta {
    font-size: 9px;
    opacity: 0.7;
    margin-top: 4px;
    display: flex;
    justify-content: flex-end;
    gap: 4px;
  }
`;

const ChatInputArea = styled.div`
  padding: 16px;
  background-color: #ffffff;
  border-top: 1px solid #f1f5f9;
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex-shrink: 0;
  position: relative;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 100px;
  padding: 6px 6px 6px 16px;
  transition: all 0.2s ease;

  &:focus-within {
    border-color: #111827;
    background: #ffffff;
    box-shadow: 0 0 0 3px rgba(17, 24, 39, 0.05);
  }

  input {
    flex: 1;
    border: none;
    background: transparent;
    outline: none;
    font-size: 13px;
    color: #111827;

    &::placeholder {
      color: #94a3b8;
    }
  }
`;

const SendButtonContainer = styled.div`
  position: relative;
`;

const MainSendButton = styled.button`
  background: #111827;
  color: #ffffff;
  border: none;
  border-radius: 50px;
  padding: 8px 16px;
  font-size: 12px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  transition: transform 0.15s ease, background-color 0.2s ease;

  &:hover {
    background-color: #1f2937;
    transform: scale(1.02);
  }

  svg {
    width: 12px;
    height: 12px;
    fill: currentColor;
    transition: transform 0.2s ease;
  }
`;

/* Share Options Popup Menu */
const DropdownMenu = styled.div`
  position: absolute;
  bottom: calc(100% + 8px);
  right: 0;
  width: 180px;
  background: #ffffff;
  border-radius: 14px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  border: 1px solid #e2e8f0;
  padding: 6px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  animation: ${popUp} 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  z-index: 50;

  button {
    display: flex;
    align-items: center;
    gap: 8px;
    width: 100%;
    padding: 8px 12px;
    border: none;
    background: transparent;
    border-radius: 8px;
    font-size: 12px;
    font-weight: 500;
    color: #334155;
    cursor: pointer;
    text-align: left;
    transition: background 0.15s ease, color 0.15s ease;

    &:hover {
      background: #f1f5f9;
      color: #111827;
    }

    svg {
      width: 14px;
      height: 14px;
      fill: #64748b;
    }
  }
`;

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'other';
  scope: 'all' | 'admin';
  timestamp: string;
}

export function ChatSidebarPanel() {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: 'Hey team, reviewing the layout structure.', sender: 'other', scope: 'all', timestamp: '10:00 AM' },
    { id: '2', text: 'Looks clean! Let me check the admin logs.', sender: 'user', scope: 'admin', timestamp: '10:02 AM' },
  ]);
  const [inputText, setInputText] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSend = (scope: 'all' | 'admin') => {
    if (!inputText.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      scope,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages([...messages, newMessage]);
    setInputText('');
    setShowMenu(false);
  };

  return (
    <ChatContainer>
      {/* Header */}
      <ChatHeader>
        <span className="title">Discussion & Chat</span>
        <div className="status-badge">
          <span />
          Live Channel
        </div>
      </ChatHeader>

      {/* Message Feed */}
      <MessageList>
        {messages.map((msg) => (
          <MessageBubble key={msg.id} $isUser={msg.sender === 'user'}>
            <div>{msg.text}</div>
            <div className="meta">
              <span>{msg.scope === 'admin' ? '🔒 Admin Only' : '🌍 Shared to All'}</span>
              <span>•</span>
              <span>{msg.timestamp}</span>
            </div>
          </MessageBubble>
        ))}
      </MessageList>

      {/* Input & Sending Actions */}
      <ChatInputArea>
        <InputWrapper>
          <input
            type="text"
            placeholder="Type a message..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && setShowMenu(true)}
          />

          <SendButtonContainer ref={menuRef}>
            <MainSendButton onClick={() => setShowMenu(!showMenu)}>
              Send
              <svg viewBox="0 0 24 24">
                <path d="M7 10l5 5 5-5z" />
              </svg>
            </MainSendButton>

            {/* Share Option Menu */}
            {showMenu && (
              <DropdownMenu>
                <button onClick={() => handleSend('all')}>
                  <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
                  Share to all
                </button>
                <button onClick={() => handleSend('admin')}>
                  <svg viewBox="0 0 24 24"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg>
                  Share to admin only
                </button>
              </DropdownMenu>
            )}
          </SendButtonContainer>
        </InputWrapper>
      </ChatInputArea>
    </ChatContainer>
  );
}