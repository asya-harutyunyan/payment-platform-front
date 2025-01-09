import { type SVGProps } from "react";

const IconStatusRedSm = (props: SVGProps<SVGSVGElement>) => {
	return (
		<svg
			width="60"
			height="60"
			viewBox="0 0 60 60"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<g clipPath="url(#clip0_73_5215)">
				<circle cx="30" cy="30" r="30" fill="#FF3D00" fillOpacity="0.12" />
				<circle cx="30" cy="30" r="22.5" fill="#FF3D00" fillOpacity="0.2" />
				<circle cx="30" cy="30" r="12" fill="#FF3D00" />
			</g>
			<defs>
				<clipPath id="clip0_73_5215">
					<rect width="60" height="60" fill="white" />
				</clipPath>
			</defs>
		</svg>
	);
};

export default IconStatusRedSm;
