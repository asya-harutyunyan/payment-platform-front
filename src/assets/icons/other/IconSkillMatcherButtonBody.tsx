import { SVGProps } from "react";

const IconSkillMatcherButtonBody = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g filter="url(#filter0_d_11654_47849)">
        <rect
          x="4"
          width="40"
          height="40"
          rx="20"
          fill="url(#paint0_linear_11654_47849)"
          shapeRendering="crispEdges"
        />
        <g filter="url(#filter1_f_11654_47849)">
          <rect
            x="6.7294"
            y="2.72745"
            width="34.5454"
            height="34.5454"
            rx="17.2727"
            stroke="url(#paint1_linear_11654_47849)"
            strokeWidth="1.81818"
          />
        </g>
      </g>
      <defs>
        <filter
          id="filter0_d_11654_47849"
          x="0.363636"
          y="0"
          width="47.2727"
          height="47.2727"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="3.63636" />
          <feGaussianBlur stdDeviation="1.81818" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.07 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_11654_47849"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_11654_47849"
            result="shape"
          />
        </filter>
        <filter
          id="filter1_f_11654_47849"
          x="5.10298"
          y="1.10103"
          width="37.7979"
          height="37.7984"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="0.358665"
            result="effect1_foregroundBlur_11654_47849"
          />
        </filter>
        <linearGradient
          id="paint0_linear_11654_47849"
          x1="24"
          y1="0"
          x2="24"
          y2="40"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.0001" stopColor="#B55DD9" />
          <stop offset="1" stopColor="#5054C9" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_11654_47849"
          x1="24.0021"
          y1="1.81836"
          x2="24.0021"
          y2="38.182"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FDE7FC" />
          <stop offset="0.161458" stopColor="#B87DDE" />
          <stop offset="0.854167" stopColor="#6E50D1" />
          <stop offset="1" stopColor="#3E37B4" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default IconSkillMatcherButtonBody;
