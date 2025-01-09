

import useLogout from "./_services/useLogout";

const Logout = () => {
	const { handleLogout } = useLogout();
	return (
		<button
			onClick={handleLogout}
			style={{
				padding: "8px 12px",
				border: "1px solid green",
				fontSize: "14px",
			}}
		>
			Log Out
		</button>
	);
};

export default Logout;
