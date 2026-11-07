import styled, { keyframes } from 'styled-components';

export const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const ModalTitle = styled.h3`
  font-size: 1.15rem;
  font-weight: 700;
  color: #0f172a;
  margin: 0 0 0.5rem 0;
`;

export const SessionBadge = styled.div`
  background: #e0e7ff;
  color: #4338ca;
  font-weight: 700;
  font-size: 0.9rem;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  margin-bottom: 1.5rem;
  letter-spacing: 0.05em;
`;

export const CirculatingWrapper = styled.div`
  position: relative;
  width: 110px;
  height: 110px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.25rem;
`;

export const CirculatingRing = styled.div`
  position: absolute;
  inset: 0;
  border: 4px solid #f1f5f9;
  border-top-color: #4f46e5;
  border-radius: 50%;
  animation: ${spin} 1.5s linear infinite;
`;

export const QrCenterIcon = styled.div`
  background: #f8fafc;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #4f46e5;
`;

export const ModalSubtitle = styled.p`
  font-size: 0.85rem;
  color: #64748b;
  text-align: center;
  margin: 0;
  line-height: 1.4;
`;