import { SVGProps } from "react";

const IconBuildMatcher = (props: SVGProps<SVGSVGElement>) => {
	return (
		<svg
			width="40"
			height="41"
			viewBox="0 0 40 41"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<rect
				x="1.5"
				y="2"
				width="37"
				height="37"
				rx="18.5"
				fill="url(#paint0_linear_10972_14599)"
			/>
			<rect
				x="1.5"
				y="2"
				width="37"
				height="37"
				rx="18.5"
				stroke="#F0EBFA"
				strokeWidth="3"
			/>
			<path
				d="M19.7223 14.0842L19.7225 14.0841C19.729 14.0797 19.7356 14.0756 19.7423 14.0715L19.7226 14.0846L14.7226 17.4184L14.6904 17.4398C14.7008 17.4317 14.7115 17.4239 14.7225 17.4166L19.7223 14.0842ZM14.5 17.8335C14.5 17.8327 14.5 17.8319 14.5 17.8311L14.5 17.8344L14.5 17.8335Z"
				stroke="white"
			/>
			<defs>
				<linearGradient
					id="paint0_linear_10972_14599"
					x1="20"
					y1="0.5"
					x2="20"
					y2="40.5"
					gradientUnits="userSpaceOnUse"
				>
					<stop offset="0.0001" stopColor="#B55DD9" />
					<stop offset="1" stopColor="#5054C9" />
				</linearGradient>
			</defs>
		</svg>
	);
};
export default IconBuildMatcher;
