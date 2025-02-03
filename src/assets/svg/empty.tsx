import { SVGProps } from "react";
import { JSX } from "react/jsx-runtime";

const SadFolderIcon = (
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    fill="none"
    stroke="#002559"
    strokeWidth="16"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Folder icon */}
    <path d="M80 192v224c0 8.8 7.2 16 16 16h320c8.8 0 16-7.2 16-16l24-112H152l-48 160" />
    <path d="M192 224h192v32" />
    <path d="M80 192h96l24 32h192v32" />

    {/* Sad folder face */}
    <circle cx="220" cy="336" r="8" fill="#002559" />
    <circle cx="292" cy="336" r="8" fill="#002559" />
    <path d="M244 368q24-16 48 0" />

    {/* Speech bubble with X */}
    <path d="M360 56c44 0 80 24 80 56s-36 56-80 56c-12 0-24-2-36-6l-44 20 8-36c-8-10-12-22-12-34 0-32 36-56 80-56z" />
    <line x1="372" y1="92" x2="348" y2="116" />
    <line x1="348" y1="92" x2="372" y2="116" />
  </svg>
);

export default SadFolderIcon;
