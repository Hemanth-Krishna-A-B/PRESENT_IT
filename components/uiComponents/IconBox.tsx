import React, { HTMLAttributes } from "react";
import styled, { css } from "styled-components";

interface IconBoxProps extends HTMLAttributes<HTMLDivElement> {
  iconType: "emoji" | "image";
  iconValue: string;
  size?: string;
  borderRadius?: string;
  bgColor?: string;
  border?: string;
  shadow?: string;
  enableHover?: boolean;
  hoverDirection?: "up" | "down" | "left" | "right";
  hoverDistance?: string;
  onClick?: () => void;
}

const getTransformTranslation = (direction?: string, distance: string = "2px") => {
  switch (direction) {
    case "up": return `translateY(-${distance})`;
    case "down": return `translateY(${distance})`;
    case "left": return `translateX(-${distance})`;
    case "right": return `translateX(${distance})`;
    default: return `translateY(-${distance})`;
  }
};

const StyledBox = styled.div.withConfig({
  shouldForwardProp: (prop) =>
    !["size", "borderRadius", "bgColor", "border", "shadow", "enableHover", "hoverDirection", "hoverDistance"].includes(prop),
})<Partial<IconBoxProps>>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${({ size }) => size || "40px"};
  height: ${({ size }) => size || "40px"};
  border-radius: ${({ borderRadius }) => borderRadius || "8px"};
  background-color: ${({ bgColor }) => bgColor || "#f0f0f0"};
  border: ${({ border }) => border || "none"};
  box-shadow: ${({ shadow }) => shadow || "none"};
  cursor: ${({ onClick }) => (onClick ? "pointer" : "default")};
  user-select: none;
  overflow: hidden;
  transition: all 0.2s ease-in-out;

  ${({ enableHover, hoverDirection, hoverDistance }) =>
    enableHover &&
    css`
      &:hover {
        transform: ${getTransformTranslation(hoverDirection, hoverDistance)};
        filter: brightness(90%);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      }
    `}
`;

const IconImage = styled.img`
  width: 70%;
  height: 70%;
  object-fit: contain;
`;

const IconEmoji = styled.span`
  font-size: 1.5rem;
  line-height: 1;
`;

export const IconBox: React.FC<IconBoxProps> = ({
  iconType,
  iconValue,
  size,
  borderRadius,
  bgColor,
  border,
  shadow,
  enableHover,
  hoverDirection,
  hoverDistance,
  onClick,
  ...props
}) => {
  return (
    <StyledBox
      size={size}
      borderRadius={borderRadius}
      bgColor={bgColor}
      border={border}
      shadow={shadow}
      enableHover={enableHover}
      hoverDirection={hoverDirection}
      hoverDistance={hoverDistance}
      onClick={onClick}
      {...props}
    >
      {iconType === "image" ? (
        <IconImage src={iconValue} alt="icon" />
      ) : (
        <IconEmoji>{iconValue}</IconEmoji>
      )}
    </StyledBox>
  );
};