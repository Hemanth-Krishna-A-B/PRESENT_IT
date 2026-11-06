import React, { HTMLAttributes } from "react";
import styled, { css } from "styled-components";

interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  avatarType: "image" | "initials";
  avatarValue: string;
  size?: string;
  bgColor?: string;
  textColor?: string;
  fontSize?: string;
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

const Container = styled.div.withConfig({
  shouldForwardProp: (prop) =>
    ![
      "size",
      "bgColor",
      "textColor",
      "fontSize",
      "border",
      "shadow",
      "enableHover",
      "hoverDirection",
      "hoverDistance",
    ].includes(prop),
})<Partial<AvatarProps>>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${({ size }) => size || "40px"};
  height: ${({ size }) => size || "40px"};
  border-radius: 50%;
  background-color: ${({ bgColor }) => bgColor || "#e0e0e0"};
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
        filter: brightness(92%);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      }
    `}
`;

const AvatarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const InitialsText = styled.span.withConfig({
  shouldForwardProp: (prop) => !["textColor", "fontSize"].includes(prop),
})<{ textColor?: string; fontSize?: string }>`
  color: ${({ textColor }) => textColor || "#333333"};
  font-size: ${({ fontSize }) => fontSize || "0.85rem"};
  font-weight: bold;
  text-transform: uppercase;
  line-height: 1;
`;

export const Avatar: React.FC<AvatarProps> = ({
  avatarType,
  avatarValue,
  size,
  bgColor,
  textColor,
  fontSize,
  border,
  shadow,
  enableHover,
  hoverDirection,
  hoverDistance,
  onClick,
  ...props
}) => {
  return (
    <Container
      size={size}
      bgColor={bgColor}
      border={border}
      shadow={shadow}
      enableHover={enableHover}
      hoverDirection={hoverDirection}
      hoverDistance={hoverDistance}
      onClick={onClick}
      {...props}
    >
      {avatarType === "image" ? (
        <AvatarImage src={avatarValue} alt="avatar" />
      ) : (
        <InitialsText textColor={textColor} fontSize={fontSize}>
          {avatarValue.slice(0, 2)}
        </InitialsText>
      )}
    </Container>
  );
};