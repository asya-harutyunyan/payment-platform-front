import { SVGProps } from "react";

const IconBigFolder = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="60"
      height="60"
      viewBox="0 0 60 60"
      fill="none"
      {...props}
    >
      <path
        d="M25 10H10C7.225 10 5 12.225 5 15V45C5 46.3261 5.52678 47.5979 6.46447 48.5355C7.40215 49.4732 8.67392 50 10 50H50C51.3261 50 52.5979 49.4732 53.5355 48.5355C54.4732 47.5979 55 46.3261 55 45V20C55 18.6739 54.4732 17.4021 53.5355 16.4645C52.5979 15.5268 51.3261 15 50 15H30L25 10Z"
        fill="#7A58D0"
      />
    </svg>
  );
};

export default IconBigFolder;
