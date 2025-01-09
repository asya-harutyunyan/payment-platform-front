import { FC, useState } from "react";
import { type TUpdateAvatarPropTypes } from "./types";
import styles from "./styles.module.scss";
import { ButtonComponent, DragCropper } from "@/components/atoms";
import useUpdateAvatar from "./services/useUpdateAvatar";
import classNames from "classnames";
import { useMount } from "react-use";

const UpdateAvatar: FC<TUpdateAvatarPropTypes> = ({
	setOpenAvatarModal,
	role = "fr",
	companyId,
	companyAvatar,
}) => {
	const {
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
	} = useUpdateAvatar({
		setOpenAvatarModal,
		role,
		companyId,
		companyAvatar,
	});

	const [mounted, setMounted] = useState<boolean>(false);

	useMount(() => setMounted(true));

	return (
		mounted && (
			<div className={styles.container}>
				<div className={styles.titles}>
					<h2>
						{isAvatarSame ? "Edit Profile Image" : "Upload Profile Image"}
					</h2>
					<p>
						{isAvatarSame
							? "Edit or change an image that will be displayed in your profile"
							: "Upload an image that will be displayed in your profile"}{" "}
					</p>
				</div>

				<div className={styles.form__block__body}>
					<DragCropper
						onChange={handleFileChange}
						ref={draggerRef}
						error={!!validationMessage}
						errorText={validationMessage}
						initialSrc={avatarSrc}
						croppedSrc={croppedSrc}
						initialCroppedArea={avatarPosition}
						initialZoom={avatarZoom}
					/>
				</div>
				<div
					className={classNames(
						styles.control_buttons,
						!isAvatarSame && styles.selected
					)}
				>
					{isAvatarSelected ? (
						<ButtonComponent
							text="Cancel"
							variant="secondary"
							size="middle"
							onClick={() => setOpenAvatarModal(false)}
						/>
					) : (
						<ButtonComponent
							text={isAvatarSame ? "Remove Image" : "Cancel"}
							variant={isAvatarSame ? "text" : "secondary"}
							size="middle"
							onClick={() => {
								if (isAvatarSame) {
									handleRemoveImage();
								} else {
									setOpenAvatarModal(false);
								}
							}}
						/>
					)}

					<ButtonComponent
						text={isAvatarSame ? "Change" : "Save"}
						variant="primary"
						size="middle"
						type="submit"
						onClick={handleFormSubmit}
						isLoading={isLoading}
						disabled={isAvatarSelected}
					/>
				</div>
			</div>
		)
	);
};

export default UpdateAvatar;
