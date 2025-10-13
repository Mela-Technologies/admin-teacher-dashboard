import React from "react";

interface DecorativeGridProps {
  rows: number;
  cols: number;
  circleSize?: number; // diameter of each circle (in px)
  gap?: number; // space between circles (in px)
  color?: string; // fill color
  position?: string; // Tailwind position classes like "top-8 right-8"
  opacity?: string; // Tailwind opacity like "opacity-40"
}

const DecorativeGrid: React.FC<DecorativeGridProps> = ({
  rows,
  cols,
  circleSize = 10,
  gap = 8,
  color = "bg-gray-500",
  position = "",
  opacity = "opacity-30",
}) => {
  const circles = Array.from({ length: rows * cols });

  return (
    <div
      className={`absolute ${position} grid ${opacity}`}
      style={{
        gridTemplateColumns: `repeat(${cols}, ${circleSize}px)`,
        gridTemplateRows: `repeat(${rows}, ${circleSize}px)`,
        gap: `${gap}px`,
      }}
    >
      {circles.map((_, index) => (
        <div
          key={index}
          className={`${color} rounded-full`}
          style={{ width: circleSize, height: circleSize }}
        />
      ))}
    </div>
  );
};

export default DecorativeGrid;
