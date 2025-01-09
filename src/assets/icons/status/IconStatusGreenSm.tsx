import { type SVGProps } from "react";

const IconStatusGreenSm = (props: SVGProps<SVGSVGElement>) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="80"
			height="80"
			viewBox="0 0 80 80"
			fill="none"
			{...props}
		>
			<g clip-path="url(#clip0_15770_47293)">
				<circle cx="40" cy="40" r="40" fill="#26B05D" fill-opacity="0.12" />
				<circle cx="40" cy="40" r="30" fill="#26B05D" fill-opacity="0.2" />
				<circle cx="40" cy="40" r="16" fill="#26B05D" />
			</g>
			<defs>
				<clipPath id="clip0_15770_47293">
					<rect width="80" height="80" fill="white" />
				</clipPath>
			</defs>
		</svg>
	);
};

export default IconStatusGreenSm;
