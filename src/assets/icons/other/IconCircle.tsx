import { SVGProps } from "react";

const IconCircle = (props: SVGProps<SVGSVGElement>) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="4"
			height="4"
			viewBox="0 0 4 4"
			fill="none"
			{...props}
		>
			<circle cx="2" cy="2" r="2" fill="#C1C1C1" />
		</svg>
	);
};
export default IconCircle;
