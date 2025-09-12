
declare module "swiper/css";
declare module "swiper/css/navigation";
declare module "swiper/css/pagination";
declare module "swiper/css/scrollbar";
declare module "swiper/css/effect-fade";

declare module "*.css";
declare module "*.scss" {
	const content: Record<string, string>;
	export default content;
}

declare module "*.jpg" {
	const value: string;
	export default value;
}

declare module "*.jpeg" {
	const value: string;
	export default value;
}

declare module "*.png" {
	const value: string;
	export default value;
}

declare module "*.gif" {
	const value: string;
	export default value;
}



declare module "*.mp4" {
	const src: string;
	export default src;
}
declare module "*.woff";
declare module "*.woff2";
declare module "*.ttf";
