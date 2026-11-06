import React, { useState, useEffect, useId } from 'react';
import styled, { keyframes, css } from 'styled-components';

// ==========================================
// TYPES & INTERFACES
// ==========================================

export interface DataPoint {
  label: string;
  value: number;
}

export interface CircularDataPoint {
  label: string;
  value: number;
  color: string;
}

export interface LineChartProps {
  data: DataPoint[];
  height?: number;
  width?: number;
  lineColor?: string;
  fillColor?: string;
  gridColor?: string;
  isCurved?: boolean;
  showPoints?: boolean;
  showGrid?: boolean;
  animationDuration?: number; // in seconds
}

export interface CircularChartProps {
  data: CircularDataPoint[];
  size?: number;
  strokeWidth?: number;
  animationDuration?: number; // in seconds
  centerTitle?: string;
  centerSubtitle?: string;
}

// ==========================================
// ANIMATIONS
// ==========================================

const drawPath = keyframes`
  from {
    stroke-dashoffset: 2000;
  }
  to {
    stroke-dashoffset: 0;
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const fillFadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

// ==========================================
// STYLED COMPONENTS - CONTAINER & CARDS
// ==========================================

const ChartCard = styled.div`
  background: #ffffff;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.01);
  border: 1px solid #f0f0f0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  color: #1f2937;
  max-width: 100%;
  box-sizing: border-box;
`;

const ChartHeader = styled.div`
  margin-bottom: 20px;
`;

const ChartTitle = styled.h3`
  margin: 0;
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
`;

const ChartSubtitle = styled.p`
  margin: 4px 0 0 0;
  font-size: 0.875rem;
  color: #6b7280;
`;

// ==========================================
// STYLED COMPONENTS - LINE CHART
// ==========================================

const LineChartContainer = styled.div`
  position: relative;
  width: 100%;
  overflow: visible;
`;

const SVGContainer = styled.svg`
  width: 100%;
  height: auto;
  overflow: visible;
`;

const GridLine = styled.line<{ $color?: string }>`
  stroke: ${(props) => props.$color || '#e5e7eb'};
  stroke-dasharray: 4, 4;
  stroke-width: 1;
`;

const AxisText = styled.text`
  font-size: 11px;
  fill: #9ca3af;
  text-anchor: end;
  font-family: inherit;
`;

const XAxisText = styled(AxisText)`
  text-anchor: middle;
`;

const AnimatedPath = styled.path<{ $duration: number; $color: string }>`
  fill: none;
  stroke: ${(props) => props.$color};
  stroke-width: 3;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 2000;
  stroke-dashoffset: 2000;
  animation: ${drawPath} ${(props) => props.$duration}s cubic-bezier(0.25, 1, 0.5, 1) forwards;
`;

const AnimatedArea = styled.path<{ $duration: number }>`
  opacity: 0;
  animation: ${fillFadeIn} 0.6s ease-in-out ${(props) => props.$duration * 0.6}s forwards;
`;

const DataPointCircle = styled.circle<{ $color: string }>`
  fill: #ffffff;
  stroke: ${(props) => props.$color};
  stroke-width: 3;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    r: 7;
    stroke-width: 4;
  }
`;

const TooltipGroup = styled.g`
  pointer-events: none;
  animation: ${fadeIn} 0.15s ease-out forwards;
`;

const TooltipRect = styled.rect`
  fill: #111827;
  rx: 6;
  ry: 6;
  filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1));
`;

const TooltipText = styled.text`
  fill: #ffffff;
  font-size: 12px;
  font-weight: 500;
  text-anchor: middle;
`;

// ==========================================
// COMPONENT 1: ANIMATED LINE CHART
// ==========================================

export const AnimatedLineChart: React.FC<LineChartProps> = ({
  data,
  height = 260,
  width = 600,
  lineColor = '#6366f1',
  fillColor = '#6366f1',
  gridColor = '#f3f4f6',
  isCurved = true,
  showPoints = true,
  showGrid = true,
  animationDuration = 1.5,
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [animationKey, setAnimationKey] = useState(0);
  const gradientId = useId();

  // Re-trigger CSS path animation when data array identity changes
  useEffect(() => {
    setAnimationKey((prev) => prev + 1);
  }, [data]);

  const paddingLeft = 45;
  const paddingRight = 20;
  const paddingTop = 20;
  const paddingBottom = 35;

  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;

  const values = data.map((d) => d.value);
  const rawMin = Math.min(...values);
  const rawMax = Math.max(...values);
  const paddingValue = (rawMax - rawMin) * 0.1 || 10;
  const minValue = Math.max(0, Math.floor(rawMin - paddingValue));
  const maxValue = Math.ceil(rawMax + paddingValue);

  const getX = (index: number) => {
    if (data.length <= 1) return paddingLeft + chartWidth / 2;
    return paddingLeft + (index / (data.length - 1)) * chartWidth;
  };

  const getY = (val: number) => {
    const range = maxValue - minValue || 1;
    return paddingTop + chartHeight - ((val - minValue) / range) * chartHeight;
  };

  // Generate path string (Straight lines or Smooth Bezier Curve)
  const generatePath = () => {
    if (data.length === 0) return '';
    const points = data.map((d, i) => [getX(i), getY(d.value)]);

    if (!isCurved || points.length <= 2) {
      return points.reduce((acc, point, i) => `${acc} ${i === 0 ? 'M' : 'L'} ${point[0]},${point[1]}`, '');
    }

    return points.reduce((acc, point, i, arr) => {
      if (i === 0) return `M ${point[0]},${point[1]}`;
      const [p0x, p0y] = arr[i - 1];
      const [p1x, p1y] = point;
      const cp1x = p0x + (p1x - p0x) / 2;
      const cp2x = p0x + (p1x - p0x) / 2;
      return `${acc} C ${cp1x},${p0y} ${cp2x},${p1y} ${p1x},${p1y}`;
    }, '');
  };

  const pathD = generatePath();
  const areaD = data.length > 0
    ? `${pathD} L ${getX(data.length - 1)},${paddingTop + chartHeight} L ${paddingLeft},${paddingTop + chartHeight} Z`
    : '';

  const yTicks = 4;
  const gridTicks = Array.from({ length: yTicks + 1 }, (_, i) => {
    const val = minValue + ((maxValue - minValue) / yTicks) * i;
    return { val: Math.round(val), y: getY(val) };
  });

  return (
    <LineChartContainer>
      <SVGContainer viewBox={`0 0 ${width} ${height}`}>
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={fillColor} stopOpacity={0.35} />
            <stop offset="100%" stopColor={fillColor} stopOpacity={0.0} />
          </linearGradient>
        </defs>

        {/* Y Grid Lines & Axis Labels */}
        {gridTicks.map((tick, idx) => (
          <g key={idx}>
            {showGrid && (
              <GridLine
                x1={paddingLeft}
                y1={tick.y}
                x2={width - paddingRight}
                y2={tick.y}
                $color={gridColor}
              />
            )}
            <AxisText x={paddingLeft - 10} y={tick.y + 4}>
              {tick.val}
            </AxisText>
          </g>
        ))}

        {/* Gradient Area Fill */}
        {areaD && (
          <AnimatedArea
            key={`area-${animationKey}`}
            d={areaD}
            fill={`url(#${gradientId})`}
            $duration={animationDuration}
          />
        )}

        {/* Primary Line Path */}
        {pathD && (
          <AnimatedPath
            key={`path-${animationKey}`}
            d={pathD}
            $color={lineColor}
            $duration={animationDuration}
          />
        )}

        {/* X Axis Labels & Interactive Nodes */}
        {data.map((d, i) => {
          const cx = getX(i);
          const cy = getY(d.value);
          const isHovered = hoveredIndex === i;

          return (
            <g key={i}>
              <XAxisText x={cx} y={height - 8}>
                {d.label}
              </XAxisText>

              {showPoints && (
                <DataPointCircle
                  cx={cx}
                  cy={cy}
                  r={isHovered ? 6 : 4.5}
                  $color={lineColor}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                />
              )}
            </g>
          );
        })}

        {/* Active Tooltip overlay */}
        {hoveredIndex !== null && (
          <TooltipGroup transform={`translate(${getX(hoveredIndex)}, ${getY(data[hoveredIndex].value) - 38})`}>
            <TooltipRect x={-32} y={0} width={64} height={26} />
            <TooltipText x={0} y={17}>
              {data[hoveredIndex].value}
            </TooltipText>
          </TooltipGroup>
        )}
      </SVGContainer>
    </LineChartContainer>
  );
};

// ==========================================
// STYLED COMPONENTS - CIRCULAR CHART
// ==========================================

const CircularChartWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  @media (min-width: 640px) {
    flex-direction: row;
    justify-content: space-around;
  }
`;

const CircularSVGWrapper = styled.div<{ $size: number }>`
  position: relative;
  width: ${(props) => props.$size}px;
  height: ${(props) => props.$size}px;
`;

const CircularSVG = styled.svg`
  transform: rotate(-90deg);
  overflow: visible;
`;

const CircleSegment = styled.circle<{ $color: string; $duration: number; $dashArray: string; $dashOffset: number }>`
  fill: none;
  stroke: ${(props) => props.$color};
  stroke-dasharray: ${(props) => props.$dashArray};
  stroke-dashoffset: ${(props) => props.$dashOffset};
  transition: stroke-dashoffset ${(props) => props.$duration}s cubic-bezier(0.4, 0, 0.2, 1),
              stroke-width 0.2s ease,
              filter 0.2s ease;
  cursor: pointer;

  &:hover {
    stroke-width: ${(props) => Number(props.strokeWidth || 0) + 4};
    filter: drop-shadow(0 0 6px rgba(0, 0, 0, 0.15));
  }
`;

const CenterContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  pointer-events: none;
`;

const CenterTitleText = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: #111827;
  line-height: 1.2;
`;

const CenterSubtitleText = styled.div`
  font-size: 0.75rem;
  font-weight: 500;
  color: #6b7280;
  margin-top: 2px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const LegendContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-width: 140px;
`;

const LegendItem = styled.div<{ $active: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  font-size: 0.875rem;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 6px;
  transition: background-color 0.15s ease;
  background-color: ${(props) => (props.$active ? '#f3f4f6' : 'transparent')};

  &:hover {
    background-color: #f9fafb;
  }
`;

const LegendLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const LegendColorBadge = styled.span<{ $color: string }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${(props) => props.$color};
`;

const LegendLabel = styled.span`
  color: #374151;
  font-weight: 500;
`;

const LegendValue = styled.span`
  color: #6b7280;
  font-weight: 600;
`;

// ==========================================
// COMPONENT 2: ANIMATED CIRCULAR CHART
// ==========================================

export const AnimatedCircularChart: React.FC<CircularChartProps> = ({
  data,
  size = 200,
  strokeWidth = 24,
  animationDuration = 1.2,
  centerTitle,
  centerSubtitle,
}) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Enable animation trigger after first mount
    const timer = setTimeout(() => setIsLoaded(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const total = data.reduce((sum, item) => sum + item.value, 0);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  let cumulativePercent = 0;

  const activeItem = activeIndex !== null ? data[activeIndex] : null;
  const displayTitle = activeItem ? `${activeItem.value}` : centerTitle ?? `${total}`;
  const displaySubtitle = activeItem ? activeItem.label : centerSubtitle ?? 'Total';

  return (
    <CircularChartWrapper>
      <CircularSVGWrapper $size={size}>
        <CircularSVG width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          {/* Base Background Circle Track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#f3f4f6"
            strokeWidth={strokeWidth}
          />

          {/* Animated Donut Segments */}
          {data.map((item, index) => {
            const percent = total > 0 ? item.value / total : 0;
            const strokeDasharray = `${circumference * percent} ${circumference * (1 - percent)}`;
            const strokeDashoffset = isLoaded
              ? -circumference * cumulativePercent
              : circumference; // Animates from empty to calculated offset

            cumulativePercent += percent;

            return (
              <CircleSegment
                key={index}
                cx={size / 2}
                cy={size / 2}
                r={radius}
                strokeWidth={activeIndex === index ? strokeWidth + 3 : strokeWidth}
                $color={item.color}
                $duration={animationDuration}
                $dashArray={`${circumference}`}
                $dashOffset={strokeDashoffset}
                style={{
                  strokeDasharray,
                  strokeDashoffset,
                }}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
              />
            );
          })}
        </CircularSVG>

        {/* Center Labels */}
        <CenterContent>
          <CenterTitleText>{displayTitle}</CenterTitleText>
          <CenterSubtitleText>{displaySubtitle}</CenterSubtitleText>
        </CenterContent>
      </CircularSVGWrapper>

      {/* Side Legend */}
      <LegendContainer>
        {data.map((item, index) => (
          <LegendItem
            key={index}
            $active={activeIndex === index}
            onMouseEnter={() => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
          >
            <LegendLeft>
              <LegendColorBadge $color={item.color} />
              <LegendLabel>{item.label}</LegendLabel>
            </LegendLeft>
            <LegendValue>
              {total > 0 ? `${Math.round((item.value / total) * 100)}%` : '0%'}
            </LegendValue>
          </LegendItem>
        ))}
      </LegendContainer>
    </CircularChartWrapper>
  );
};

// ==========================================
// DEMO / EXAMPLE USAGE
// ==========================================

const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
  max-width: 1000px;
  margin: 0 auto;
  padding: 24px;
  background-color: #f9fafb;
  min-height: 100vh;

  @media (min-width: 768px) {
    grid-template-columns: 1.4fr 1fr;
  }
`;

const sampleLineData: DataPoint[] = [
  { label: 'Jan', value: 35 },
  { label: 'Feb', value: 58 },
  { label: 'Mar', value: 42 },
  { label: 'Apr', value: 85 },
  { label: 'May', value: 64 },
  { label: 'Jun', value: 92 },
];

const sampleCircularData: CircularDataPoint[] = [
  { label: 'Direct', value: 440, color: '#6366f1' },
  { label: 'Organic', value: 320, color: '#10b981' },
  { label: 'Referral', value: 180, color: '#f59e0b' },
  { label: 'Social', value: 90, color: '#ec4899' },
];

export default function AppDemo() {
  return (
    <DashboardGrid>
      <ChartCard>
        <ChartHeader>
          <ChartTitle>Revenue Performance</ChartTitle>
          <ChartSubtitle>Monthly recurring revenue metrics</ChartSubtitle>
        </ChartHeader>
        <AnimatedLineChart data={sampleLineData} lineColor="#6366f1" fillColor="#6366f1" />
      </ChartCard>

      <ChartCard>
        <ChartHeader>
          <ChartTitle>Traffic Breakdown</ChartTitle>
          <ChartSubtitle>Acquisition sources by volume</ChartSubtitle>
        </ChartHeader>
        <AnimatedCircularChart data={sampleCircularData} centerSubtitle="Visitors" />
      </ChartCard>
    </DashboardGrid>
  );
}