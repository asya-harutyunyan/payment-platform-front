export const Colors = {
	black: " #282529",
	white: "#FFFFFF",
	dark_grey: "#7C7C7C",
	grey: "#C1C1C1",
	medium_grey: "#EBEBEB",
	light_grey: "#F5F5F5",
	accent: "#7A58D0",
	medium_accent: "#F0EBFA",
	light_accent: "#F6F3FC",
	status_green: "#26B05D",
	status_yellow: "#F7DD17",
	status_red: "#E63838",
	status_rose: "#FCF3F3",
	gradientBg: `
      linear-gradient(0deg, #00000033, #00000033),
      linear-gradient(180deg, #1f243a 0%, #263569 100%)
    `
};

export const greenGradientBorder = {
	content: '""',
	position: "absolute" as const,
	inset: 0,
	borderRadius: "14px",
	padding: "1px",
	background: "linear-gradient(360deg, rgba(43,255,255,0.8) 0%, rgba(43,255,255,0.2) 100%)",
	WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
	WebkitMaskComposite: "xor" as const,
	maskComposite: "exclude" as const,
	pointerEvents: "none" as const,
};

export const Weight = {
	font_weight_thin: 100,
	font_weight_light: 300,
	font_weight_normal: 400,
	font_weight_medium: 600,
	font_weight_bold: 700,
	font_weight_black: 900,
};

export const FontSize = {
	font_size_mobile_xs: "10px",
	font_size_mobile_s: "12px",
	font_size_mobile_m: "14px",
	font_size_mobile_l: "16px",
	font_size_mobile_xl: "20px",
	font_size_mobile_xxl: "24px",

	font_size_desktop_xs: "14px",
	font_size_desktop_s: "16px",
	font_size_desktop_m: "20px",
	font_size_desktop_l: "24px",
	font_size_desktop_xl: "40px",
	font_size_desktop_xxl: "56px",
};

export const Breakpoints = {
	mobile: 375,
	mobile_x: 480,
	mini_tablet: 576,
	tablet: 769,
	tablet_x: 991,
	desktop: 1048,
	laptop: 1200,
	laptop_x: 1350,
	pc: 1440,
	pc_x: 1920,
};
export const skill_matcher_tooltips = {
	your_statistic_text:
		"See how many jobs match your skills and check the status of your applications.",
	project_duration_text:
		"Standard is limited to short-term projects, while Premium and Elite allow Short, Medium, and Long-term options.",
	skills_text:
		"Add extra skills beside your main 6 skills—up to 3 (Standard), 8 (Premium), or 15 (Elite).",
	category_text:
		"Standard and Premium plans offer one category, while Elite gives access to six categories.",
	category_access_text: "Standard and Premium plans offer one category, while Elite gives access to six categories.",
	job_type_text:
		"Apply for full-time and part-time jobs; Premium and Elite users also see flexible roles.",
	proposed_paid_text: "Choose between hourly rate or fixed-price jobs.",
	hourly_rate_categories_text:
		"Select Junior, Mid, or Senior level based on your desired rate range.",
	fixed_price_categories_text:
		" Select Small, Medium, or Large projects based on your desired general amount.",
	choose_budget_text:
		"Bid under, within, or over the client’s posted budget to optimize your chances of winning projects.",
	company_category_text:
		"View client ratings, reviews, and repeat hire history for informed decision-making.",
	submission_proccess_text:
		"Choose to pause job applications once a client contacts you or continue applying for more opportunities.",
};
export const _tooltip_styles = {
	color: Colors.white,
	borderRadius: 8,
	background: "#666",
};
