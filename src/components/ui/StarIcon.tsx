import React from "react";

interface StarIconProps {
  width?: number;
  color?: string;
}

export const StarIcon: React.FC<StarIconProps> = ({ width, color }) => {
  return (
    <svg
      width={width || 90}
      height={width || 90}
      viewBox="0 0 90 90"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <clipPath id="clip81_73">
          <rect
            id="Frame 2"
            width="90.000000"
            height="90.000000"
            fill="white"
            fillOpacity="0"
          />
        </clipPath>
      </defs>
      <g clipPath="url(#clip81_73)">
        <path
          id="path"
          d="M58.28 33.26L50.54 9.49C49.01 4.83 41.96 4.83 40.48 9.49L32.69 33.26L9.26 33.26C4.15 33.26 2.04 39.4 6.2 42.15L25.37 54.92L17.84 77.56C16.31 82.13 22 85.82 26.06 82.92L45.48 69.17L64.91 82.97C68.97 85.86 74.65 82.18 73.13 77.61L65.6 54.97L84.76 42.2C88.92 39.4 86.82 33.31 81.71 33.31L58.28 33.26Z"
          fill={color || "#8948F9"}
          fillOpacity="1.000000"
          fillRule="nonzero"
        />
      </g>
    </svg>
  );
};
