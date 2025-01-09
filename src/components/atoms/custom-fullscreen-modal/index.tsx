
import { FC, useEffect, useState } from "react";
import styles from "./style.module.scss";
import { IFullScreenModalPropTypes } from "./types";
import { useMount } from "react-use";
const FullScreenModal: FC<IFullScreenModalPropTypes> = ({
	setIsOpen,
	children,

	isOpen,
	closable = true,
}) => {
	const [mounted, setMounted] = useState<boolean>(false);
	useMount(() => setMounted(true));

	useEffect(() => {
		if (isOpen) {
			document.body.classList.add("no-scroll");
		} else {
			document.body.classList.remove("no-scroll");
		}
		return () => {
			document.body.classList.remove("no-scroll");
		};
	}, [isOpen]);

	return (
		mounted && (
					<>
						<div className={styles.darkBG} onClick={() => setIsOpen()} />
						<div className={styles.centered}>
							<div className={styles.modal}>
								{closable && (
									<button
										className={styles.closeBtn}
										onClick={() => setIsOpen()}
									>
										s
									</button>
								)}

								{children}
							</div>
						</div>
					</>
				
		)
	);
};

export default FullScreenModal;
