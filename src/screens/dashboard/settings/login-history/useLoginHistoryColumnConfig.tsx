import type { IColumnConfig } from "@/models/table.model";
import type { ISettingsLoginHistory } from "@/models/settings-login-history.model";
import { Icon } from "@/components";

const UseLoginHistoryColumnConfig = () => {
	const loginHistoryColumnConfig: IColumnConfig<ISettingsLoginHistory>[] = [
		{
			title: "Date & Time",
			setRow: (row: ISettingsLoginHistory) => (
				<p title={row?.date}>{row?.date || "Unknown"}</p>
			),
			isVisible: true,
			customStyle: { minWidth: "220px", width: "100%" },
		},
		{
			title: "Location",
			setRow: (row: ISettingsLoginHistory) => (
				<p title={row?.agent?.country}>{row?.agent?.country || "Unknown"}</p>
			),
			isVisible: true,
			customStyle: { minWidth: "100px", width: "100%" },
		},
		{
			title: "IP Address",
			setRow: (row: ISettingsLoginHistory) => (
				<p title={row?.agent?.ip}>{row?.agent?.ip || "Unknown"}</p>
			),
			isVisible: true,
			customStyle: { minWidth: "150px", width: "100%" },
		},
		{
			title: "Device Type",
			setRow: (row: ISettingsLoginHistory) => (
				<p style={{ height: "20px" }}>
					{row?.agent?.device === "phone" ? (
						<Icon icon={"IconMobile"} />
					) : row?.agent?.device === "tablet" ? (
						<Icon icon={"IconTablet"} />
					) : (
						<Icon icon={"IconDesktop"} />
					)}
				</p>
			),
			isVisible: true,
			customStyle: {
				minWidth: "80px",
				width: "100%",
				display: "flex",
				justifyContent: "center",
			},
		},
		{
			title: "Browser/App",
			setRow: (row: ISettingsLoginHistory) => {
				return <p>{row?.agent?.browser || "Unknown"}</p>;
			},
			isVisible: true,
			customStyle: {
				minWidth: "80px",
				width: "100%",
				display: "flex",
				justifyContent: "center",
			},
		},
		{
			title: "Action Description",
			setRow: (row: ISettingsLoginHistory) => (
				<p
					style={{
						color: row?.success ? "#26B05D" : "#E63838",
					}}
				>
					{row?.success ? (
						<span>Login Success</span>
					) : (
						<span>Login Failed</span>
					)}
				</p>
			),
			isVisible: true,
			customStyle: { minWidth: "180px", width: "100%" },
		},
	];
	return { loginHistoryColumnConfig };
};

export default UseLoginHistoryColumnConfig;
