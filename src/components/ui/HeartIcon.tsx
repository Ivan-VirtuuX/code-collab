export const HeartIcon = ({ color }: { color: string }) => {
  return (
    <svg
      width="20.000000"
      height="20.000000"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <clipPath id="clip139_217">
          <rect
            id="svg"
            width="20.000000"
            height="20.000000"
            fill="white"
            fillOpacity="0"
          />
        </clipPath>
      </defs>
      <g clipPath="url(#clip139_217)">
        <path
          id="path"
          d="M1.66 7.61C1.66 11.66 5.01 13.82 7.46 15.75C8.33 16.44 9.16 17.08 10 17.08C10.83 17.08 11.66 16.44 12.53 15.75C14.98 13.82 18.33 11.66 18.33 7.61C18.33 3.56 13.75 0.68 10 4.58C6.25 0.68 1.66 3.56 1.66 7.61Z"
          fill={color || "#F31222"}
          fillOpacity="1.000000"
          fillRule="nonzero"
        />
      </g>
    </svg>
  );
};
