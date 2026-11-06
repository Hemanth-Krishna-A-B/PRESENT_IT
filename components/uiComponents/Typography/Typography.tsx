import React, { ReactNode, ElementType } from 'react';
import { StyledText } from './Typography.styles';

interface TypographyProps {
  as?: ElementType;
  children: ReactNode;
  size?: string;
  weight?: string | number;
  color?: string;
  align?: 'left' | 'center' | 'right' | 'justify';
  lineHeight?: string;
  margin?: string;
  animation?: 'grow' | 'fade' | 'none';
  animationDuration?: string;
  className?: string;
}

export const Typography: React.FC<TypographyProps> = ({
  as = 'p',
  children,
  size,
  weight,
  color,
  align = 'center',
  lineHeight,
  margin,
  animation = 'grow',
  animationDuration,
  className,
}) => {
  const renderContent = () => {
    if (typeof children === 'string' && children.includes('\n')) {
      return children.split('\n').map((line, index, arr) => (
        <React.Fragment key={index}>
          {line}
          {index < arr.length - 1 && <br />}
        </React.Fragment>
      ));
    }
    return children;
  };

  return (
    <StyledText
      as={as}
      $size={size}
      $weight={weight}
      $color={color}
      $align={align}
      $lineHeight={lineHeight}
      $margin={margin}
      $animation={animation}
      $animationDuration={animationDuration}
      className={className}
    >
      {renderContent()}
    </StyledText>
  );
};

