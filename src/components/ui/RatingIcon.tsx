import React from "react";

interface RatingIconProps {
  color: string;
  width: number;
}

export const RatingIcon: React.FC<Partial<RatingIconProps>> = ({
  color,
  width,
}) => {
  return (
    <svg
      width={width ?? "91.000000"}
      height={width ?? "90.000000"}
      viewBox="0 0 91 90"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <clipPath id="clip80_29">
          <rect
            id="Frame 1"
            width="90.288925"
            height="90.000000"
            fill="white"
            fillOpacity="0"
          />
        </clipPath>
      </defs>
      <g clipPath="url(#clip80_29)">
        <path
          id="path"
          d="M40.08 25.53L29.55 8.32C29.12 7.61 28.5 7.02 27.77 6.62C27.04 6.21 26.21 6 25.37 6L8.44 6C6.46 6 5.31 8.17 6.44 9.76L23.39 33.51C27.92 29.36 33.68 26.51 40.08 25.53ZM81.55 6L64.62 6C62.91 6 61.32 6.88 60.44 8.32L49.91 25.53C56.31 26.51 62.07 29.36 66.6 33.51L83.55 9.76C84.68 8.17 83.53 6 81.55 6ZM45 29.9C30.19 29.9 18.18 41.68 18.18 56.2C18.18 70.72 30.19 82.5 45 82.5C59.8 82.5 71.81 70.72 71.81 56.2C71.81 41.68 59.8 29.9 45 29.9ZM59.09 53.4L53.31 58.92L54.68 66.72C54.92 68.12 53.42 69.19 52.14 68.53L45 64.85L37.85 68.53C36.57 69.19 35.07 68.12 35.31 66.72L36.68 58.92L30.9 53.4C29.86 52.41 30.44 50.67 31.87 50.47L39.86 49.33L43.43 42.23C43.75 41.59 44.37 41.27 44.99 41.27C45.62 41.27 46.24 41.59 46.57 42.23L50.14 49.33L58.12 50.47C59.55 50.67 60.13 52.41 59.09 53.4Z"
          fill={color ?? "#F39C12"}
          fillOpacity="1.000000"
          fillRule="nonzero"
        />
      </g>
    </svg>
  );
};
