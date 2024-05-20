import React from "react";

interface CreateIconProps {
  width?: number;
  color?: string;
}

export const CreateIcon: React.FC<CreateIconProps> = ({ width, color }) => {
  return (
    <svg
      width={width || 50}
      height={width || 50}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <clipPath id="clip283_233">
          <rect
            id="Frame 6"
            width="18.000000"
            height="18.000000"
            fill="white"
            fillOpacity="0"
          />
        </clipPath>
      </defs>
      <g clipPath="url(#clip283_233)">
        <path
          id="Subtract"
          d="M1.99536 2.31157Q2.36127 2.16 2.78998 2.16L5.26404 2.16C6.51361 2.16 7.71204 2.6564 8.59564 3.54001C9.47925 4.42361 10.6777 4.92001 11.9272 4.92001L15.21 4.92001C15.7816 4.92001 16.2695 5.1221 16.6737 5.52629Q16.9768 5.82944 17.1284 6.19537L17.1285 6.19555Q17.28 6.56141 17.28 6.99001L17.28 13.89C17.28 14.4616 17.0779 14.9495 16.6737 15.3537C16.2695 15.7579 15.7816 15.96 15.21 15.96L2.78998 15.96Q2.36127 15.96 1.9953 15.8084Q1.62939 15.6569 1.32623 15.3537C0.922058 14.9495 0.719971 14.4616 0.719971 13.89L0.719971 4.23Q0.719971 3.80129 0.871521 3.43536L0.871521 3.43536Q1.02313 3.06944 1.32623 2.7663Q1.62939 2.46315 1.99536 2.31158L1.99536 2.31157ZM9.82916 9.08909L9.82916 7.25877C9.82916 6.8195 9.48407 6.47435 9.0448 6.47435C8.60547 6.47435 8.26038 6.8195 8.26038 7.25877L8.26038 9.08909L6.43024 9.08909C5.99091 9.08909 5.64581 9.43423 5.64581 9.87351C5.64581 10.3128 5.99091 10.6579 6.43024 10.6579L8.26038 10.6579L8.26038 12.4883C8.26038 12.9275 8.60547 13.2727 9.0448 13.2727C9.48407 13.2727 9.82916 12.9275 9.82916 12.4883L9.82916 10.6579L11.6597 10.6579C12.099 10.6579 12.4441 10.3128 12.4441 9.87351C12.4441 9.43423 12.099 9.08909 11.6597 9.08909L9.82916 9.08909Z"
          clipRule="evenodd"
          fill={color || "#007BFF"}
          fillOpacity="1.000000"
          fillRule="evenodd"
        />
      </g>
    </svg>
  );
};