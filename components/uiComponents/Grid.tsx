import styled, { css } from "styled-components";

interface GridItemProps {
  column?: string;
  row?: string;
  columnStart?: string;
  columnEnd?: string;
  rowStart?: string;
  rowEnd?: string;
  area?: string;
  justifySelf?: "auto" | "stretch" | "start" | "end" | "center";
  alignSelf?: "auto" | "stretch" | "start" | "end" | "center";
  padding?: string;
  margin?: string;
  border?: string;
  borderRadius?: string;
  bgColor?: string;
  textColor?: string;
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

export const GridItem = styled.div.withConfig({
  shouldForwardProp: (prop) =>
    ![
      "column",
      "row",
      "columnStart",
      "columnEnd",
      "rowStart",
      "rowEnd",
      "area",
      "justifySelf",
      "alignSelf",
      "padding",
      "margin",
      "border",
      "borderRadius",
      "bgColor",
      "textColor",
      "shadow",
      "enableHover",
      "hoverDirection",
      "hoverDistance",
    ].includes(prop),
})<GridItemProps>`
  grid-column: ${({ column }) => column || "auto"};
  grid-row: ${({ row }) => row || "auto"};
  grid-column-start: ${({ columnStart }) => columnStart || "auto"};
  grid-column-end: ${({ columnEnd }) => columnEnd || "auto"};
  grid-row-start: ${({ rowStart }) => rowStart || "auto"};
  grid-row-end: ${({ rowEnd }) => rowEnd || "auto"};
  grid-area: ${({ area }) => area || "auto"};
  justify-self: ${({ justifySelf }) => justifySelf || "auto"};
  align-self: ${({ alignSelf }) => alignSelf || "auto"};
  padding: ${({ padding }) => padding || "0px"};
  margin: ${({ margin }) => margin || "0px"};
  border: ${({ border }) => border || "none"};
  border-radius: ${({ borderRadius }) => borderRadius || "0px"};
  background-color: ${({ bgColor }) => bgColor || "transparent"};
  color: ${({ textColor }) => textColor || "inherit"};
  box-shadow: ${({ shadow }) => shadow || "none"};
  transition: all 0.2s ease-in-out;

  ${({ enableHover, hoverDirection, hoverDistance }) =>
    enableHover &&
    css`
      &:hover {
        transform: ${getTransformTranslation(hoverDirection, hoverDistance)};
        filter: brightness(95%);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      }
    `}
`;