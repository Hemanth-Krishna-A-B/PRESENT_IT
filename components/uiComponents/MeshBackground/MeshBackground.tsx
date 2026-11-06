import React, { ReactNode } from 'react';
import { CenterContent, ClickHint, MeshBackgroundWrapper } from './MeshBackground.styles';
import { BlobBackground } from '../BlobBackground/BlobBackground';
import { BlobConfig } from '@/types/types';

interface MeshBackgroundProps {
  children: ReactNode;
  visible?: boolean;
  clickHintText?: string;
  showClickHint?: boolean;
  blobs?: BlobConfig[];      
  zIndex?: number | string;
}

export const MeshBackground: React.FC<MeshBackgroundProps> = ({
  children,
  visible = true,
  clickHintText = 'Click anywhere to begin',
  showClickHint = true,
  blobs,
  zIndex,
}) => {
  return (
    <MeshBackgroundWrapper $zIndex={zIndex}>
      {/* Blobs rendered inside the mesh wrapper, sitting above the grid background but below content */}
      {blobs && <BlobBackground blobs={blobs} visible={visible} zIndex={1} />}

      <CenterContent $visible={visible} style={{ zIndex: 5 }}>
        {children}
      </CenterContent>
      {showClickHint && <ClickHint>{clickHintText}</ClickHint>}
    </MeshBackgroundWrapper>
  );
};