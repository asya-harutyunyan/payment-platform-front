
import styles from "./styles.module.scss";
import { Icon, ModalComponent } from "@/components";
import type { FC } from "react";
import type { TServiceAvailability } from "./types";

const ServiceAvailability: FC<TServiceAvailability> = ({
	setIsIpValidation,
	isIpValidation,
}) => {
	const handleClose = () => setIsIpValidation(false);

	return (
		<>
			<ModalComponent isOpen={isIpValidation} onClose={handleClose} title={""}>
				<div className={styles.wrapper}>
					<div className={styles.icon}>
						<Icon icon={"IconWarning"} width="48" height="48" />
					</div>
					<p className={styles.title}>Service Availability</p>
					<p className={styles.text}>
						Thank you for your interest in our services. Unfortunately, at this
						time, we do not support your region. We understand this may be
						inconvenient and apologize for any frustration this may cause.{" "}
					</p>
					<p className={styles.text}>
						We are continually working to expand our service areas and hope to
						support your region in the near future. Please stay tuned for
						updates. Thank you for your understanding and patience
					</p>
				</div>
			</ModalComponent>
		</>
	);
};
export default ServiceAvailability;
