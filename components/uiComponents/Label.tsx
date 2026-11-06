import styled, { css } from "styled-components";

interface LabelProps {
  display?: "inline-block" | "block" | "inline-flex" | "flex";
  color?: string;
  fontSize?: string;
  fontWeight?: string;
  fontFamily?: string;
  textAlign?: "left" | "center" | "right" | "justify";
  letterSpacing?: string;
  lineHeight?: string;
  padding?: string;
  margin?: string;
  shadow?: string;
  enableHover?: boolean;
  hoverDirection?: "up" | "down" | "left" | "right";
  hoverDistance?: string;
  hoverColor?: string;
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

const Label = styled.label.withConfig({
  shouldForwardProp: (prop) =>
    ![
      "display",
      "color",
      "fontSize",
      "fontWeight",
      "fontFamily",
      "textAlign",
      "letterSpacing",
      "lineHeight",
      "padding",
      "margin",
      "shadow",
      "enableHover",
      "hoverDirection",
      "hoverDistance",
      "hoverColor",
    ].includes(prop),
})<LabelProps>`
  display: ${({ display }) => display || "inline-block"};
  color: ${({ color }) => color || "#333333"};
  font-size: ${({ fontSize }) => fontSize || "1rem"};
  font-weight: ${({ fontWeight }) => fontWeight || "normal"};
  font-family: ${({ fontFamily }) => fontFamily || "inherit"};
  text-align: ${({ textAlign }) => textAlign || "left"};
  letter-spacing: ${({ letterSpacing }) => letterSpacing || "normal"};
  line-height: ${({ lineHeight }) => lineHeight || "normal"};
  padding: ${({ padding }) => padding || "0px"};
  margin: ${({ margin }) => margin || "0px"};
  text-shadow: ${({ shadow }) => shadow || "none"};
  transition: all 0.2s ease-in-out;

  ${({ enableHover, hoverDirection, hoverDistance, hoverColor }) =>
    enableHover &&
    css`
      &:hover {
        transform: ${getTransformTranslation(hoverDirection, hoverDistance)};
        color: ${hoverColor || "inherit"};
        filter: brightness(90%);
      }
    `}
`;

export { Label };