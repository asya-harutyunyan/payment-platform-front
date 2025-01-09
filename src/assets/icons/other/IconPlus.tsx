import type { SVGProps } from "react";

const IconPlus = (props: SVGProps<SVGSVGElement>) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="14"
			height="14"
			viewBox="0 0 14 14"
			fill="none"
			{...props}
		>
			<path
				d="M2.91675 7.00008H11.0834M7.00008 11.0834V2.91675"
				stroke="#282529"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
};

export default IconPlus;
