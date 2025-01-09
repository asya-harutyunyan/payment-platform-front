import React, { SVGProps } from "react";

const IconBannerTitleOne = (props: SVGProps<SVGSVGElement>) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="26"
			height="13"
			viewBox="0 0 26 13"
			fill="none"
			{...props}
		>
			<g filter="url(#filter0_b_9450_11944)">
				<path
					d="M25.3525 0.213135L25.8459 0.733803C25.4512 1.88558 24.9358 3.11626 24.2998 4.42581C23.6857 5.73537 23.0168 7.04493 22.2931 8.35449C21.5694 9.66405 20.8347 10.9026 20.089 12.0702H14.4308C14.8695 10.8237 15.3081 9.49839 15.7467 8.09416C16.1853 6.68993 16.591 5.30148 16.9639 3.92881C17.3367 2.55614 17.6328 1.31758 17.8521 0.213135H25.3525ZM11.6346 0.213135L12.0952 0.733803C11.7004 1.88558 11.1851 3.11626 10.5491 4.42581C9.93499 5.73537 9.2661 7.04493 8.54237 8.35449C7.81865 9.66405 7.08396 10.9026 6.33831 12.0702H0.778809C1.08584 11.1393 1.40384 10.1611 1.73281 9.1355C2.06177 8.09416 2.3688 7.05282 2.65391 6.01149C2.96094 4.95437 3.23508 3.9367 3.47632 2.95848C3.73949 1.96447 3.94783 1.04936 4.10135 0.213135H11.6346Z"
					fill="url(#paint0_linear_9450_11944)"
				/>
			</g>
			<defs>
				<filter
					id="filter0_b_9450_11944"
					x="-128.484"
					y="-129.049"
					width="283.592"
					height="270.382"
					filterUnits="userSpaceOnUse"
					color-colorInterpolationFilters-filters="sRGB"
				>
					<feFlood floodOpacity="0" result="BackgroundImageFix" />
					<feGaussianBlur in="BackgroundImageFix" stdDeviation="64.6312" />
					<feComposite
						in2="SourceAlpha"
						operator="in"
						result="effect1_backgroundBlur_9450_11944"
					/>
					<feBlend
						mode="normal"
						in="SourceGraphic"
						in2="effect1_backgroundBlur_9450_11944"
						result="shape"
					/>
				</filter>
				<linearGradient
					id="paint0_linear_9450_11944"
					x1="25.0129"
					y1="-3.15198"
					x2="21.1804"
					y2="13.5345"
					gradientUnits="userSpaceOnUse"
				>
					<stop stopColor="#C6B7FF" />
					<stop offset="1" stopColor="#C6B7FF" stopOpacity="0.1" />
				</linearGradient>
			</defs>
		</svg>
	);
};

export default IconBannerTitleOne;
