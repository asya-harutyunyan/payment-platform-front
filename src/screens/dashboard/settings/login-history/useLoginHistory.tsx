
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { useEffect, useLayoutEffect, useState } from "react";
import {
	deleteTrustedDevice,
	getTrustedDevicesThunk,
	loginHistoryGetThunk,
} from "@/redux/reducers/dashboard/settings/login-history/login-history.thunk";

import useUrlSync from "@/hooks/useUrlSync";
import { ISettingsLoginHistoryAgent } from "@/models/settings-login-history.model";

const UseLoginHistory = () => {
	const dispatch = useAppDispatch();
	const { loginHistoryState, trustedState, deletedTrustedState } =
		useAppSelector((state) => state.loginHistory);
	const { options, setOptions } = useUrlSync();
	const [page, setPage] = useState<number>(1);
	const [selectedDevice, setSlectedDevice] =
		useState<ISettingsLoginHistoryAgent>();
	const [modalStates, setModalStates] = useState<
		Record<"trusted" | "delete" | "success", boolean>
	>({
		trusted: false,
		delete: false,
		success: false,
	});

	useEffect(() => {
		dispatch(loginHistoryGetThunk(page));
	}, [page]);

	useEffect(() => {
		if (modalStates.trusted) {
			dispatch(getTrustedDevicesThunk());
		}
	}, [modalStates.trusted]);

	useLayoutEffect(() => {
		if (options?.pg) setPage(Number(options?.pg));
	}, [options]);

	const handlePageChange = (page: number) => {
		setPage(page);
		setOptions({
			...options,
			pg: String(page),
		});
	};

	const handleOpenModal = (name: "trusted" | "delete" | "success") => {
		setModalStates({
			...modalStates,
			[name]: true,
		});
	};

	const handleCloseModal = (name: "trusted" | "delete" | "success") => {
		setModalStates({
			...modalStates,
			[name]: false,
		});
	};
	const handleClickDeleteIcon = (item: ISettingsLoginHistoryAgent) => {
		setSlectedDevice(item);
		setModalStates({
			...modalStates,
			trusted: false,
			delete: true,
		});
	};
	const handleRemoveDevice = () => {
		if (selectedDevice && !deletedTrustedState?.isLoading) {
			dispatch(deleteTrustedDevice(Number(selectedDevice.id)))
				.unwrap()
				.then((res) => {
					if (res) {
						setModalStates({
							...modalStates,
							delete: false,
							success: true,
						});
						dispatch(getTrustedDevicesThunk());
						dispatch(loginHistoryGetThunk(1));
					}
				});
		}
	};

	return {
		handlePageChange,
		isLoading: loginHistoryState.isLoading,
		loginHistory: loginHistoryState?.data?.data || [],
		current_page: loginHistoryState?.data?.meta?.current_page || 1,
		per_page: loginHistoryState?.data?.meta?.per_page || 10,
		total: loginHistoryState?.data?.meta?.total || 0,
		modalStates,
		handleOpenModal,
		handleCloseModal,
		trustedState,
		handleClickDeleteIcon,
		selectedDevice,
		handleRemoveDevice,
		deleteLoading: deletedTrustedState.isLoading,
		setModalStates,
	};
};

export default UseLoginHistory;
