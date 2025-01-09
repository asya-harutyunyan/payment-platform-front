
import useLoginHistory from "./useLoginHistory";
import styles from "./styles.module.scss";
import {
	ButtonComponent,
	Icon,
	ModalComponent,
	PaginationComponent,
	ResponseStatus,
	TableComponent,
} from "@/components";
import { Skeleton } from "antd";
import { ISettingsLoginHistory } from "@/models/settings-login-history.model";
import UseLoginHistoryColumnConfig from "./useLoginHistoryColumnConfig";
import { useState } from "react";
import { useMount, useWindowSize } from "react-use";
import { Breakpoints } from "@/constants";

const LoginHistoryScreen = () => {
	const {
		isLoading,
		loginHistory,
		current_page,
		total,
		per_page,
		handlePageChange,
		handleCloseModal,
		handleOpenModal,
		modalStates,
		trustedState,
		selectedDevice,
		handleClickDeleteIcon,
		handleRemoveDevice,
		deleteLoading,
		setModalStates,
	} = useLoginHistory();
	const [mounted, setMounted] = useState<boolean>(false);
	const { width } = useWindowSize();
	useMount(() => setMounted(true));
	const { loginHistoryColumnConfig } = UseLoginHistoryColumnConfig();

	return (
		<>
			<div className={styles.wrapper}>
				<div className={styles.header}>
					<h2>Login History</h2>
					<span onClick={() => handleOpenModal("trusted")}>
						<Icon icon={"IconSettings"} />
					</span>
				</div>
				<div className={styles.table}>
					{isLoading ? (
						<Skeleton
							active
							title={{ width: "100%" }}
							paragraph={{ rows: 19, width: "100%" }}
						/>
					) : (
						<TableComponent<ISettingsLoginHistory>
							data={loginHistory || []}
							columnConfig={loginHistoryColumnConfig}
							hasActions={false}
						/>
					)}
					<div className={styles.pagination}>
						<PaginationComponent
							current_page={current_page}
							per_page={per_page}
							total={total}
							onPageChange={handlePageChange}
						/>
					</div>
				</div>
			</div>
			<div className={styles.modal}>
				<ModalComponent
					isOpen={modalStates.trusted}
					onClose={() => handleCloseModal("trusted")}
					title={""}
					style={{
						maxWidth: "628px",
					}}
				>
					<div className={styles.trusted}>
						<h2>Trusted IP Addresses & Devices</h2>
						<p>Manage a list of trusted IP addresses and devices.</p>
						<div className={styles.trusted_block}>
							{trustedState.isLoading ? (
								<Skeleton
									active
									title={{ width: "100%" }}
									paragraph={{ rows: 5, width: "100%" }}
								/>
							) : (
								<div className={styles.trusted_container}>
									{trustedState?.data && trustedState?.data?.length ? (
										trustedState?.data?.map((item) => (
											<div key={item.id} className={styles.trusted_card}>
												<div className={styles.card_child}>
													<p className={styles.title}>
														{item.device[0].toUpperCase() +
															item?.device?.slice(1)}{" "}
														device
													</p>
													<p className={styles.sub_title}>{item.ip}</p>
												</div>
												<div className={styles.card_child}>
													<span
														className={styles.icon}
														onClick={() => handleClickDeleteIcon(item)}
													>
														<Icon icon={"IconDelete"} />
													</span>
												</div>
											</div>
										))
									) : (
										<p>there are no connected devices yet.</p>
									)}
								</div>
							)}
						</div>
					</div>
				</ModalComponent>
			</div>
			{selectedDevice && mounted && (
				<div className={styles.modal}>
					<ModalComponent
						isOpen={modalStates.delete}
						onClose={() => handleCloseModal("delete")}
						title={""}
					>
						<div className={styles.delete}>
							<h2>Remove {selectedDevice?.ip}?</h2>
							<p>
								Remove {selectedDevice?.ip} from the trusted devices? This
								process is irreversible.
							</p>
							<div className={styles.btns}>
								<div className={styles.btn}>
									<ButtonComponent
										size={width > Breakpoints.mobile_x ? "large" : "middle"}
										text={"Cancel"}
										variant={"secondary"}
										onClick={() => {
											setModalStates({
												...modalStates,
												delete: false,
												trusted: true,
											});
										}}
									/>
								</div>
								<div className={styles.btn}>
									<ButtonComponent
										size={width > Breakpoints.mobile_x ? "large" : "middle"}
										text={"Remove"}
										variant={"primary"}
										onClick={handleRemoveDevice}
										isLoading={deleteLoading}
									/>
								</div>
							</div>
						</div>
					</ModalComponent>
				</div>
			)}
			{modalStates.success && selectedDevice?.ip && (
				<div className={styles.modal}>
					<ModalComponent
						isOpen={modalStates.success}
						onClose={() => handleCloseModal("success")}
						title={""}
					>
						<div className={styles.success}>
							<ResponseStatus
								type={"success"}
								title={"Success!"}
								mode={"modal"}
								description={`${selectedDevice?.ip} has been removed from your trusted list.`}
							/>
						</div>
					</ModalComponent>
				</div>
			)}
		</>
	);
};

export default LoginHistoryScreen;
