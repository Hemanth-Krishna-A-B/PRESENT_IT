'use client';

import React, { useState, useRef, useEffect } from 'react';
import { FaQrcode, FaTimes, FaUser, FaKey, FaCamera } from 'react-icons/fa';
import jsQR from 'jsqr';
import { theme } from '@/app/theme';
import { BlobConfig } from '@/types/types';
import { MeshBackgroundWrapper } from '../../uiComponents/MeshBackground/MeshBackground.styles';
import { CardContainer, MainContentPanel, SlidingPanel } from '../../layout/SlidingAuthLayout';
import { BlobBackground } from '../../uiComponents/BlobBackground/BlobBackground';
import { Button, CameraContainer, CameraErrorWrapper, CloseModalButton, Form, FormGroup, IconButton, Input, InputIconWrapper, Label, ModalCard, ModalFooterText, ModalOverlay, ModalTitle, SectionHeader, StyledVideo } from '../../uiComponents/AuthPrimitives/AuthPrimitives';



const joinPanelBlobs: BlobConfig[] = [
  { id: 'b1', color1: theme.colors.accent, color2: '#D0FF00', duration: '8s', delay: '0s' },
  { id: 'b2', color1: theme.colors.primary, color2: theme.colors.primary, duration: '12s', delay: '-4s' },
  { id: 'b3', color1: '#D0FF00', color2: '#D0FF00', duration: '12s', delay: '-4s' },
];

export default function JoinSessionPage() {
  const [name, setName] = useState('');
  const [sessionCode, setSessionCode] = useState('');
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (isScannerOpen) {
      startCamera();
    } else {
      stopCamera();
    }
    return () => stopCamera();
  }, [isScannerOpen]);

  const startCamera = async () => {
    setCameraError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      mediaStreamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.setAttribute('playsinline', 'true');
        videoRef.current.play();
        requestAnimationFrame(scanQRCode);
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      setCameraError("Unable to access camera. Please check permissions or device support.");
    }
  };

  const stopCamera = () => {
    if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
      mediaStreamRef.current = null;
    }
  };

  const scanQRCode = () => {
    if (videoRef.current && videoRef.current.readyState === videoRef.current.HAVE_ENOUGH_DATA) {
      const video = videoRef.current;
      const canvas = canvasRef.current || document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d', { willReadFrequently: true });

      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height, { inversionAttempts: 'dontInvert' });

        if (code) {
          setSessionCode(code.data);
          setIsScannerOpen(false);
          return;
        }
      }
    }
    if (isScannerOpen) {
      animationFrameRef.current = requestAnimationFrame(scanQRCode);
    }
  };

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Joining session "${sessionCode}" as "${name}"!`);
  };

  return (
    <MeshBackgroundWrapper onClick={()=>{}}>
      <CardContainer $visible={true}>
        <SlidingPanel $isShifted={false}>
          <div className="absolute inset-0 overflow-hidden pointer-events-none filter blur-2xl opacity-90">
            <BlobBackground blobs={joinPanelBlobs} />
          </div>
          <div style={{ position: 'relative', zIndex: 10 }}>
            <p style={{ fontSize: '0.875rem', fontWeight: 500, color: '#e9d5ff', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>
              Live Collaboration Hub
            </p>
            <h1 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.25rem)', fontWeight: 700, lineHeight: 1.2, margin: 0 }}>
              Connect instantly into your active session or scan the QR code to enter.
            </h1>
          </div>
        </SlidingPanel>

        <MainContentPanel $isShifted={false}>
          <SectionHeader>
            <h2>Join a Session</h2>
            <p>Enter your display name and session code to get started.</p>
          </SectionHeader>

          <Form onSubmit={handleJoin}>
            <FormGroup>
              <Label htmlFor="name">Your Name</Label>
              <InputIconWrapper>
                <Input 
                  type="text" 
                  id="name" 
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. John Doe"
                  style={{ paddingLeft: '2.5rem' }}
                />
                <span style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', display: 'flex', alignItems: 'center' }}>
                  <FaUser size={14} />
                </span>
              </InputIconWrapper>
            </FormGroup>

            <FormGroup>
              <Label htmlFor="sessionCode">Session Code</Label>
              <InputIconWrapper>
                <Input 
                  type="text" 
                  id="sessionCode" 
                  required
                  value={sessionCode}
                  onChange={(e) => setSessionCode(e.target.value)}
                  placeholder="e.g. 482-910"
                  style={{ paddingLeft: '2.5rem', paddingRight: '2.75rem' }}
                />
                <span style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', display: 'flex', alignItems: 'center' }}>
                  <FaKey size={14} />
                </span>
                <IconButton 
                  type="button" 
                  onClick={() => setIsScannerOpen(true)}
                  aria-label="Scan QR code using camera"
                  title="Scan QR Code"
                  style={{ right: '0.75rem' }}
                >
                  <FaQrcode />
                </IconButton>
              </InputIconWrapper>
            </FormGroup>

            <Button type="submit" $variant="primary" style={{ marginTop: '0.5rem' }}>
              Join Session
            </Button>
          </Form>
        </MainContentPanel>
      </CardContainer>

      {isScannerOpen && (
        <ModalOverlay>
          <ModalCard>
            <CloseModalButton onClick={() => setIsScannerOpen(false)}>
              <FaTimes />
            </CloseModalButton>
            <ModalTitle>Scan QR Code</ModalTitle>
            <CameraContainer>
              {cameraError ? (
                <CameraErrorWrapper>
                  <FaCamera size={28} style={{ marginBottom: '8px' }} />
                  <p>{cameraError}</p>
                </CameraErrorWrapper>
              ) : (
                <StyledVideo ref={videoRef} autoPlay playsInline muted />
              )}
            </CameraContainer>
            <ModalFooterText>
              Position the QR code inside your camera frame. It will read automatically.
            </ModalFooterText>
          </ModalCard>
        </ModalOverlay>
      )}
    </MeshBackgroundWrapper>
  );
}