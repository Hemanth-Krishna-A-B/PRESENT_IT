'use client';

import React, { useEffect, useState } from 'react';
import { BlobConfig, BlobProps } from '@/types/types';
import { StyledBlob, BlobContainer } from './BlobBackground.styles';

function RandomBlob({ color1, color2, $duration, $blur, style }: BlobProps) {
  const [randomStyles, setRandomStyles] = useState<React.CSSProperties>({});

  useEffect(() => {
    const getVW = () => `${Math.floor(Math.random() * 80) - 40}vw`;
    const getVH = () => `${Math.floor(Math.random() * 80) - 40}vh`;

    setRandomStyles({
      '--rand-x1': getVW(),
      '--rand-y1': getVH(),
      '--rand-x2': getVW(),
      '--rand-y2': getVH(),
      '--rand-x3': getVW(),
      '--rand-y3': getVH(),
    } as React.CSSProperties);
  }, []);

  return (
    <StyledBlob
      color1={color1}
      color2={color2}
      $duration={$duration}
      $blur={$blur}
      style={{ ...style, ...randomStyles }}
    />
  );
}

const DEFAULT_BLOBS: BlobConfig[] = [
  { id: '1', color1: '#3b82f6', color2: '#60a5fa', duration: '18s', delay: '0s', blur: '50px' },
  { id: '2', color1: '#facc15', color2: '#fde047', duration: '22s', delay: '-4s', blur: '60px' },
  { id: '3', color1: '#f87171', color2: '#fb7185', duration: '16s', delay: '-8s', blur: '40px' },
  { id: '4', color1: '#c084fc', color2: '#a855f7', duration: '26s', delay: '-2s', blur: '55px' },
];

interface BlobBackgroundProps {
  blobs?: BlobConfig[];
  visible?: boolean;
  zIndex?: number | string;
}

export function BlobBackground({ blobs = DEFAULT_BLOBS, visible = true, zIndex }: BlobBackgroundProps) {
  return (
    <BlobContainer $visible={visible} $zIndex={zIndex}>
      {blobs.map((blob) => (
        <RandomBlob
          key={blob.id}
          color1={blob.color1}
          color2={blob.color2}
          $duration={blob.duration}
          $blur={blob.blur}
          style={{
            animationDelay: blob.delay,
            ...(blob.size ? { width: blob.size, height: blob.size } : {}),
          }}
        />
      ))}
    </BlobContainer>
  );
}