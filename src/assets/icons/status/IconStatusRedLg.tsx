import { type SVGProps } from "react";

const IconStatusRedLg = (props: SVGProps<SVGSVGElement>) => {
	return (
		<svg
			width="80"
			height="80"
			viewBox="0 0 80 80"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<g clipPath="url(#clip0_73_5213)">
				<circle cx="40" cy="40" r="40" fill="#FF3D00" fillOpacity="0.12" />
				<circle cx="40" cy="40" r="30" fill="#FF3D00" fillOpacity="0.2" />
				<circle cx="40" cy="40" r="16" fill="#FF3D00" />
			</g>
			<defs>
				<clipPath id="clip0_73_5213">
					<rect width="80" height="80" fill="white" />
				</clipPath>
			</defs>
		</svg>
	);
};

export default IconStatusRedLg;
