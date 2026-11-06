'use client';

import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { BlobConfig } from '@/types/types';
import { theme } from '@/app/theme';
import { BlobBackground } from '../../uiComponents/BlobBackground/BlobBackground';
import { FadeTransition } from '../../uiComponents/FadeTransition/FadeTransition';
import { CardContainer, MainContentPanel, PageWrapper, SlidingPanel } from '../../layout/SlidingAuthLayout';
import {
  Button,
  CollapsibleFormGroup,
  Form,
  FormGroup,
  IconButton,
  Input,
  InputIconWrapper,
  Label,
  SectionHeader
} from '../../uiComponents/AuthPrimitives/AuthPrimitives';

const loginPanelBlobs: BlobConfig[] = [
  { id: 'b1', color1: theme.colors.accent, color2: '#D0FF00', duration: '8s', delay: '0s' },
  { id: 'b2', color1: theme.colors.primary, color2: theme.colors.primary, duration: '12s', delay: '-4s' },
  { id: 'b3', color1: '#D0FF00', color2: '#D0FF00', duration: '12s', delay: '-4s' },
];

export default function LoginPageComponent() {
  const [isSignUp, setIsSignUp] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleToggle = () => {
    setIsSignUp((prev) => !prev);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSignUp) {
      alert(`Account created successfully for ${username} (${email})!`);
    } else {
      alert(`Logged in successfully with ${email}!`);
    }
  };

  return (
    <PageWrapper>
      <CardContainer $visible={true}>

        {/* Left Sliding Panel Banner */}
        <SlidingPanel $isShifted={isSignUp}>
          <div className="absolute inset-0 overflow-hidden pointer-events-none filter blur-2xl opacity-90">
            <BlobBackground blobs={loginPanelBlobs} />
          </div>

          <div style={{ position: 'relative', zIndex: 10 }}>
            <FadeTransition triggerKey={isSignUp}>
              <div>
                <p style={{ fontSize: '0.875rem', fontWeight: 500, color: '#e9d5ff', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>
                  {isSignUp ? 'Join us today' : 'Welcome back'}
                </p>
                <h1 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.25rem)', fontWeight: 700, lineHeight: 1.2, margin: 0 }}>
                  {isSignUp
                    ? 'Get access to your personal hub for clarity and productivity'
                    : 'Continue your workflow seamlessly right where you left off'}
                </h1>
              </div>
            </FadeTransition>
          </div>
        </SlidingPanel>

        {/* Right Form Panel */}
        <MainContentPanel $isShifted={isSignUp}>
          
          {/* Header Title & Subtitle with Fade */}
          <SectionHeader>
            <FadeTransition triggerKey={isSignUp}>
              <div>
                <h2>{isSignUp ? 'Create an account' : 'Welcome Back'}</h2>
                <p>
                  {isSignUp
                    ? 'Access your tasks, notes, and projects anytime, anywhere.'
                    : 'Please enter your credentials to access your workspace.'}
                </p>
              </div>
            </FadeTransition>
          </SectionHeader>

          <Form onSubmit={handleSubmit}>
            <CollapsibleFormGroup $isVisible={isSignUp}>
              <Label htmlFor="username">Full Name</Label>
              <Input
                type="text"
                id="username"
                required={isSignUp}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Alien E20"
              />
            </CollapsibleFormGroup>

            <FormGroup>
              <Label htmlFor="email">Your email</Label>
              <Input
                type="email"
                id="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="human@earth.galaxy"
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="password">Password</Label>
              <InputIconWrapper>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="******"
                  style={{ paddingRight: '2.5rem' }}
                />
                <IconButton
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </IconButton>
              </InputIconWrapper>
            </FormGroup>

            {/* Submit Button Text with Fade */}
            <Button type="submit" $variant="primary">
              <FadeTransition triggerKey={isSignUp}>
                <span>{isSignUp ? 'Get Started' : 'Sign In'}</span>
              </FadeTransition>
            </Button>
          </Form>

          {/* Toggle Prompt Link with Fade */}
          <div style={{ textAlign: 'center', fontSize: '0.75rem', color: '#64748b', marginTop: '1.25rem' }}>
            <FadeTransition triggerKey={isSignUp}>
              <span>
                {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
                <button
                  type="button"
                  onClick={handleToggle}
                  style={{ color: '#4f46e5', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                >
                  {isSignUp ? 'Sign in' : 'Sign up'}
                </button>
              </span>
            </FadeTransition>
          </div>
        </MainContentPanel>

      </CardContainer>
    </PageWrapper>
  );
}