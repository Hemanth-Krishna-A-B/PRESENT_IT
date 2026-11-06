'use client';

import { useRouter } from 'next/navigation';
import { useStepNavigation } from "@/hooks/useStepNavigation";
import { BlobConfig } from "@/types/types";
import { theme } from "@/app/theme";
import { FadeTransition } from '../../uiComponents/FadeTransition/FadeTransition';
import { MeshBackground } from '../../uiComponents/MeshBackground/MeshBackground';
import { Typography } from '../../uiComponents/Typography/Typography';

const customLandingBlobs: BlobConfig[] = [
  { id: 'b1', color1: theme.colors.primary, color2: theme.colors.primary, duration: '8s', delay: '-2s' },  
  { id: 'b2', color1: theme.colors.accent, color2: theme.colors.accent, duration: '13s', delay: '0s' },  
  { id: 'b3', color1: theme.colors.primary, color2: theme.colors.primary, duration: '20s', delay: '-7s' },  
  { id: 'b4', color1: theme.colors.accent, color2: theme.colors.accent, duration: '7s', delay: '4s' },  
];

const DEFAULT_SUBTITLES = [
  'Turn Passive Presentations Into High-Engagement Live Experiences.\n Seamlessly blend traditional slides, pre-saved polls, and interactive questions into a single fluid workflow with real-time.',
  'An academic project developed by CSE students at Government Engineering College, Thrissur (GECT), Batch of 2020–2026.',
];

const CLICK_HINTS = [
  'Click, scroll, or press / Space to continue',
  'Click, scroll, or press / Space to launch',
];

export default function LandingPage() {
  const { step, handleContainerClick } = useStepNavigation({ maxSteps: 2 });
  const router = useRouter();

  const isVisible = step < 2;

  return (
    <div onClick={handleContainerClick} style={{ width: '100vw', minHeight: '100vh', overflow: 'hidden', cursor: 'pointer' }}>
      <FadeTransition 
        show={isVisible} 
        duration="0.2s" 
        onExited={() => router.replace('/login')}
      >
        <MeshBackground 
          visible={isVisible} 
          clickHintText={CLICK_HINTS[step]} 
          showClickHint={isVisible}
          blobs={customLandingBlobs} 
        >
          <Typography 
            as="h1" 
            size="clamp(2.4rem, 10vw, 4.5rem)" 
            weight={800} 
            color="#00070c"
            margin="0 0 0.85rem 0"
            lineHeight="1.1"
            animation="grow"
          >
            Present IT
          </Typography>

          {/* Subtitle wrapper with a fixed min-height to prevent layout shifts */}
          <div style={{ minHeight: '5.5rem', width: '100%', display: 'flex', justifyContent: 'center', marginBottom: '1.75rem' }}>
            <Typography 
              key={step}
              as="p" 
              size="clamp(0.92rem, 3.8vw, 1.25rem)" 
              weight={400} 
              color="#334155"
              margin="0"
              lineHeight="1.55"
              animation="grow"
            >
              {DEFAULT_SUBTITLES[step]}
            </Typography>
          </div>
        </MeshBackground>
      </FadeTransition>
    </div>
  );
}