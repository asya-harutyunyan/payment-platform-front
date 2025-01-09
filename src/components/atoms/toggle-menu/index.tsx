
import { FC, useRef } from "react";
import styles from "./styles.module.scss";
import { IToggleMenuPropTypes } from "./types";
import { ConfigProvider, Segmented } from "antd";

const ToggleMenuComponent: FC<IToggleMenuPropTypes> = ({
	options,
	onChange,
	value,
}) => {
	const segmentedRef = useRef<HTMLDivElement>(null);




	// Прокрутка при клике на последний таб
	const handleScrollToLastTab = (val: string) => {
		if (segmentedRef.current && val === options[options.length - 1].value) {
			const lastItem = segmentedRef.current.querySelector(
				`.ant-segmented-item:last-child`
			);
			if (lastItem) {
				lastItem.scrollIntoView({
					behavior: "smooth",
					block: "nearest",
					inline: "center",
				});
			}
		}
	};

	return (
		<div className={styles.container}>
			<ConfigProvider
				theme={{
					components: {
						Segmented: {
							itemSelectedBg: "#7A58D0",
							itemSelectedColor: "white",
							itemActiveBg: "#f0ebfa",
							itemHoverBg: "#f0ebfa",
							trackBg: "white",
						},
					},
				}}
			>
				<div ref={segmentedRef}>
					<Segmented<string>
						defaultValue={''}
						style={{ marginBottom: 8 }}
						onChange={(val) => {
							onChange(val);
							handleScrollToLastTab(val);
						}}
						options={options}
						value={value}

					/>
				</div>
			</ConfigProvider>
		</div>
	);
};

export default ToggleMenuComponent;
