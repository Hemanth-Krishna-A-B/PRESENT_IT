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
    margin?: string;
    padding?: string;
    gap?: string;
    background?: string;
    radius?: string; // Added radius prop here
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
    margin: ${({ margin }) => margin || "0"};
    padding: ${({ padding }) => padding || "0"};
    gap: ${({ gap }) => gap || "0"};
    background: ${({ background }) => background || "transparent"};
    border-radius: ${({ radius }) => radius || "0"}; // Maps the radius prop to CSS border-radius
    box-sizing: border-box;
`;