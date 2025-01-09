
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { setBasicDetailsAvatarThunk } from "@/redux/reducers/profile/onboarding/basic-details/basic-details-thunk";
import { getProfileDataThunk } from "@/redux/reducers/profile/profile.thunk";
import { TDraggerCropperRef, TUpdateAvatarPropTypes } from "../types";
import {
	getCompanyDataThunk,
	updateCompanyThunk,
} from "@/redux/reducers/em-company-creation/emCompanyCreation.thunk";
import { selectProfileData } from "@/redux/reducers/profile/profile.selector";
import { IPixelCrop } from "@/models/common.model";

const useUpdateAvatar = ({
	setOpenAvatarModal,
	role,
	companyId,
	companyAvatar,
}: TUpdateAvatarPropTypes) => {
	const dispatch = useAppDispatch();
	const [validationMessage, setValidationMessage] = useState<string>("");
	const [avatar, setAvatar] = useState<File>();
	const [avatarCropped, setAvatarCropped] = useState<File>();
	const [isAvatarSame, setIsAvatarSame] = useState<boolean>(true);
	const [isLoading, setIsLoading] = useState(false);
	const [croppedSrc, setCroppedSrc] = useState<string>("");
	const [avatarSrc, setAvatarSrc] = useState<string>("");
	const profileData = useAppSelector((state) => selectProfileData(state));
	const draggerRef = useRef<TDraggerCropperRef>(null);
	const [avatarPosition, setAvatarPosition] = useState<IPixelCrop>();
	const [avatarZoom, setAvatarZoom] = useState<number>();
	const isAvatarSelected =
		(avatar && avatar.name == "qrMFSw4PRFqDgqFa6SjNEg4q0KNa6x0de830dIvG.png") ||
		!avatarCropped ||
		avatar?.name === profileData?.avatar_full;

	async function loadImageAsFile(url: string): Promise<File | null> {
		try {
			const response = await fetch(url);
			const blob = await response.blob();

			const fileName = url.substring(url.lastIndexOf("/") + 1);
			return new File([blob], fileName, { type: blob.type });
		} catch (error) {
			return null;
		}
	}

	const handleFormSubmit = async () => {
		setValidationMessage("");
		setIsLoading(true);
		const formData = new FormData();
		avatar && formData.append("avatar", avatar);
		role === "company" && formData.append("is_draft", "false");
		avatarCropped && formData.append("avatar_cropped", avatarCropped);
		avatarPosition &&
			formData.append(
				"avatar_position",
				JSON.stringify([avatarPosition.x, avatarPosition.y, avatarZoom])
			);

		try {
			let res;

			if (role === "company" && companyId) {
				res = await dispatch(
					updateCompanyThunk({
						id: +companyId,
						formData,
					})
				).unwrap();
			} else {
				res = await dispatch(setBasicDetailsAvatarThunk(formData)).unwrap();
			}

			if (res.success) {
				setValidationMessage("");
				setIsLoading(false);
				setOpenAvatarModal(false);

				if (role === "company" && companyId) {
					await dispatch(
						getCompanyDataThunk({ id: +companyId, is_draft: "false" })
					).unwrap();
				} else {
					await dispatch(getProfileDataThunk()).unwrap();
				}

				if (role !== "company") {
					setTimeout(() => {
						typeof window !== undefined && window.location.reload();
					}, 2500);
				}
			}
		} catch (err) {
			const error = (err as { errors: { avatar_cropped: string[] } })?.errors;
			setValidationMessage(error.avatar_cropped?.[0]);
			setIsLoading(false);
		}
	};

	const handleFileChange = (
		file: File,
		croppedImageUrl: string,
		croppedArea: IPixelCrop,
		zoom: number
	) => {
		fetch(croppedImageUrl)
			.then((response) => response.blob())
			.then((croppedFile) => {
				const myCroppedFile = new File([croppedFile], "cropped.jpg", {
					type: croppedFile.type,
				});
				setAvatar(file);
				setAvatarCropped(myCroppedFile);
				setValidationMessage("");
				setAvatarPosition(croppedArea);
				setAvatarZoom(zoom);
			})
			.catch(() => {
				setValidationMessage("Error fetching or creating cropped file:");
			});
	};

	const handleRemoveImage = () => {
		if (draggerRef?.current) {
			draggerRef?.current?.onDelete();
			setValidationMessage("");
			setAvatar(undefined);
			setAvatarCropped(undefined);
			setIsAvatarSame(false);
		}
	};

	useEffect(() => {
		dispatch(getProfileDataThunk()).unwrap();
	}, []);

	useEffect(() => {
		if (role === "company") {
			if (companyAvatar) {
				setAvatarSrc(encodeURI(companyAvatar));

				const setImageToFile = async () => {
					const data =
						companyAvatar && (await loadImageAsFile(encodeURI(companyAvatar)));
					data && setAvatar(data);
				};
				setImageToFile();
			}
			if (companyAvatar) {
				setCroppedSrc(encodeURI(companyAvatar));
				const setImageToFile = async () => {
					const data =
						companyAvatar && (await loadImageAsFile(encodeURI(companyAvatar)));
					data && setAvatarCropped(data);
				};
				setImageToFile();
			}
		} else {
			if (profileData?.avatar_full) {
				setAvatarSrc(encodeURI(profileData?.avatar_full));
				const setImageToFile = async () => {
					const data =
						profileData?.avatar_full &&
						(await loadImageAsFile(encodeURI(profileData?.avatar_full)));
					data && setAvatar(data);
				};
				setImageToFile();
			}
			if (profileData?.avatar) {
				setCroppedSrc(encodeURI(profileData?.avatar));
				const setImageToFile = async () => {
					const data =
						profileData?.avatar &&
						(await loadImageAsFile(encodeURI(profileData?.avatar)));
					data && setAvatarCropped(data);
				};
				setImageToFile();
			}
			if (profileData?.avatar_position) {
				setAvatarPosition({
					x: profileData.avatar_position[0],
					y: profileData.avatar_position[1],
				});
				setAvatarZoom(profileData.avatar_position[2]);
			}
		}
	}, [profileData, companyAvatar]);

	return {
		handleFileChange,
		draggerRef,
		validationMessage,
		isLoading,
		handleFormSubmit,
		isAvatarSelected,
		handleRemoveImage,
		avatarSrc,
		croppedSrc,
		isAvatarSame,
		avatarPosition,
		avatarZoom,
	};
};

export default useUpdateAvatar;
