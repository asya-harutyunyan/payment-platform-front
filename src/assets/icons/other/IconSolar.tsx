import { SVGProps } from "react";

const IconSolar = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="41"
      height="41"
      viewBox="0 0 41 41"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_10922_16416)">
        <rect x="0.5" y="0.5" width="40" height="40" rx="20" fill="white" />
        <rect
          x="2"
          y="2"
          width="37"
          height="37"
          rx="18.5"
          fill="url(#paint0_linear_10922_16416)"
        />
        <rect
          x="2"
          y="2"
          width="37"
          height="37"
          rx="18.5"
          stroke="#F0EBFA"
          strokeWidth="3"
        />
        <path
          d="M15.34 25.6603C15.3398 25.6602 15.3396 25.66 15.3395 25.6598C15.0074 25.3271 14.8381 24.8912 14.7524 24.2566C14.7524 24.2566 14.7524 24.2566 14.7524 24.2566C14.7524 24.2565 14.7524 24.2564 14.7524 24.2563L15.34 25.6603ZM21.4364 20.9379L21.3659 21.0085L21.4364 20.9379Z"
          stroke="white"
        />
      </g>
      <rect
        x="1.25"
        y="1.25"
        width="38.5"
        height="38.5"
        rx="19.25"
        stroke="url(#paint1_linear_10922_16416)"
        strokeWidth="1.5"
      />
      <defs>
        <linearGradient
          id="paint0_linear_10922_16416"
          x1="20.5"
          y1="0.5"
          x2="20.5"
          y2="40.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.0001" stopColor="#B55DD9" />
          <stop offset="1" stopColor="#5054C9" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_10922_16416"
          x1="20.5"
          y1="0.5"
          x2="20.5"
          y2="40.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.0001" stopColor="#B55DD9" />
          <stop offset="1" stopColor="#5054C9" />
        </linearGradient>
        <clipPath id="clip0_10922_16416">
          <rect x="0.5" y="0.5" width="40" height="40" rx="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default IconSolar;
