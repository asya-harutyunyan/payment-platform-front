import React, { SVGProps } from "react";

const IconSettingsCard = (props: SVGProps<SVGSVGElement>) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="110"
			height="96"
			viewBox="0 0 110 96"
			fill="none"
            {...props}
		>
			<circle cx="54.5" cy="48" r="47.5" fill="#F0EBFA" />
			<rect y="13.5" width="110" height="70" rx="8" fill="#7A58D0" />
			<rect x="6" y="19.5" width="39" height="7" rx="3" fill="white" />
			<rect x="6" y="57.5" width="64" height="7" rx="3" fill="#F0EBFA" />
			<rect x="6" y="69.5" width="79" height="7" rx="3" fill="#DACEF3" />
			<circle cx="95.5" cy="23" r="3.5" fill="#F0EBFA" />
			<circle cx="100.5" cy="23" r="3.5" fill="#DACEF3" />
		</svg>
	);
};

export default IconSettingsCard;
