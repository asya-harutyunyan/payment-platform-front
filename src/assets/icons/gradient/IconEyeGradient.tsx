import { SVGProps } from "react";

const IconEyeGradient = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="9"
      viewBox="0 0 14 9"
      fill="none"
      {...props}
    >
      <path
        d="M1 5.16797C3.4 -0.165365 10.6 -0.165365 13 5.16797"
        stroke="url(#paint0_linear_1143_2579)"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7 7.83594C6.73736 7.83594 6.47728 7.78421 6.23463 7.6837C5.99198 7.58319 5.7715 7.43587 5.58579 7.25015C5.40007 7.06443 5.25275 6.84396 5.15224 6.6013C5.05173 6.35865 5 6.09858 5 5.83594C5 5.57329 5.05173 5.31322 5.15224 5.07057C5.25275 4.82792 5.40007 4.60744 5.58579 4.42172C5.7715 4.23601 5.99198 4.08869 6.23463 3.98818C6.47728 3.88767 6.73736 3.83594 7 3.83594C7.53043 3.83594 8.03914 4.04665 8.41421 4.42172C8.78929 4.7968 9 5.3055 9 5.83594C9 6.36637 8.78929 6.87508 8.41421 7.25015C8.03914 7.62522 7.53043 7.83594 7 7.83594Z"
        stroke="url(#paint1_linear_1143_2579)"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient
          id="paint0_linear_1143_2579"
          x1="7"
          y1="1.16797"
          x2="7"
          y2="5.16797"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.0001" stopColor="#B55DD9" />
          <stop offset="1" stopColor="#5054C9" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_1143_2579"
          x1="7"
          y1="3.83594"
          x2="7"
          y2="7.83594"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.0001" stopColor="#B55DD9" />
          <stop offset="1" stopColor="#5054C9" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default IconEyeGradient;
