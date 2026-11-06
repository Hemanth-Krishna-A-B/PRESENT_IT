import styled, { css } from "styled-components";

interface ButtonProps {
  display?: "inline-flex" | "flex" | "inline-block" | "block";
  direction?: "row" | "row-reverse" | "column" | "column-reverse";
  align?: "stretch" | "center" | "flex-start" | "flex-end" | "baseline";
  justify?: "flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "space-evenly";
  gap?: string;
  border?: string;
  borderRadius?: string;
  bgColor?: string;
  textColor?: string;
  fontSize?: string;
  padding?: string;
  shadow?: string;
  enableHover?: boolean;
  hoverDirection?: "up" | "down" | "left" | "right";
  hoverDistance?: string;
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

export const Button = styled.button.withConfig({
  shouldForwardProp: (prop) =>
    ![
      "display",
      "direction",
      "align",
      "justify",
      "gap",
      "border",
      "borderRadius",
      "bgColor",
      "textColor",
      "fontSize",
      "padding",
      "shadow",
      "enableHover",
      "hoverDirection",
      "hoverDistance",
    ].includes(prop),
})<ButtonProps>`
  display: ${({ display }) => display || "inline-flex"};
  flex-direction: ${({ direction }) => direction || "row"};
  justify-content: ${({ justify }) => justify || "center"};
  align-items: ${({ align }) => align || "center"};
  gap: ${({ gap }) => gap || "0px"};
  border: ${({ border }) => border || "none"};
  border-radius: ${({ borderRadius }) => borderRadius || "4px"};
  background-color: ${({ bgColor }) => bgColor || "#4CAF50"};
  color: ${({ textColor }) => textColor || "white"};
  font-size: ${({ fontSize }) => fontSize || "1rem"};
  padding: ${({ padding }) => padding || "10px 20px"};
  box-shadow: ${({ shadow }) => shadow || "none"};
  cursor: pointer;
  outline: none;
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