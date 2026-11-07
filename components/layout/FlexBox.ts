import styled from "styled-components";

export interface FlexBoxProps {
    display?: string;
    direction?: "row" | "column" | "row-reverse" | "column-reverse";
    justify?: "flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "space-evenly";
    align?: "flex-start" | "flex-end" | "center" | "stretch" | "baseline";
    wrap?: "nowrap" | "wrap" | "wrap-reverse";
    flex?: string | number;
    width?: string;
    height?: string;
    minHeight?: string; // Added for responsive bounds
    minWidth?: string;  // Added for responsive bounds
    margin?: string;
    padding?: string;
    gap?: string;
    background?: string;
    radius?: string;
    overflow?: string;  // Added for scrolling control
    children?: React.ReactNode;
}

export const FlexBox = styled.div<FlexBoxProps>`
    display: ${({ display }) => display || "flex"};
    flex-direction: ${({ direction }) => direction || "row"};
    justify-content: ${({ justify }) => justify || "flex-start"};
    align-items: ${({ align }) => align || "stretch"};
    flex-wrap: ${({ wrap }) => wrap || "nowrap"};
    flex: ${({ flex }) => flex || "initial"};
    width: ${({ width }) => width || "auto"};
    height: ${({ height }) => height || "auto"};
    min-height: ${({ minHeight }) => minHeight || "auto"};
    min-width: ${({ minWidth }) => minWidth || "auto"};
    margin: ${({ margin }) => margin || "0"};
    padding: ${({ padding }) => padding || "0"};
    gap: ${({ gap }) => gap || "0"};
    background: ${({ background }) => background || "transparent"};
    border-radius: ${({ radius }) => radius || "0"};
    overflow: ${({ overflow }) => overflow || "visible"};
    box-sizing: border-box;
`;