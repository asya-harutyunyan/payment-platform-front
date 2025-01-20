import { type SVGProps } from "react";

const IconLocationGradient = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="14"
      viewBox="0 0 12 14"
      fill="none"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.00112 13.1253L6.48188 12.5835C7.0274 11.9588 7.51807 11.366 7.95464 10.8022L8.31502 10.3268C9.81978 8.29934 10.5725 6.6902 10.5725 5.50087C10.5725 2.9622 8.52607 0.904297 6.00112 0.904297C3.47616 0.904297 1.42969 2.9622 1.42969 5.50087C1.42969 6.6902 2.18245 8.29934 3.68721 10.3268L4.04759 10.8022C4.6704 11.6002 5.32201 12.3746 6.00112 13.1253Z"
        stroke="url(#paint0_linear_9784_24027)"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.99851 7.37984C7.05048 7.37984 7.90327 6.52705 7.90327 5.47507C7.90327 4.4231 7.05048 3.57031 5.99851 3.57031C4.94654 3.57031 4.09375 4.4231 4.09375 5.47507C4.09375 6.52705 4.94654 7.37984 5.99851 7.37984Z"
        stroke="url(#paint1_linear_9784_24027)"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient
          id="paint0_linear_9784_24027"
          x1="6.00112"
          y1="0.904297"
          x2="6.00112"
          y2="13.126"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.0001" stopColor="#B55DD9" />
          <stop offset="1" stopColor="#5054C9" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_9784_24027"
          x1="5.99851"
          y1="3.57031"
          x2="5.99851"
          y2="7.37984"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.0001" stopColor="#B55DD9" />
          <stop offset="1" stopColor="#5054C9" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default IconLocationGradient;
