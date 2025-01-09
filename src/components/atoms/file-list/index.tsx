
import React, { useState, useEffect } from "react";
import classNames from "classnames";
import styles from "./styles.module.scss";

import Icon from "../icon";
import { IFileItem } from "./types";

interface FileListProps {
	fileList: IFileItem[];
	onRemove: (file: IFileItem) => void;
}

const FileListComponent: React.FC<FileListProps> = ({ fileList, onRemove }) => {
	const [fileProgress, setFileProgress] = useState<Record<string, number>>({});

	useEffect(() => {
		const updatedProgress = fileList.reduce(
			(acc, file) => {
				if (file.uid && file.percent !== undefined) {
					const currentProgress = Math.round(file.percent || 0);
					acc[file.uid] = currentProgress === 100 ? 100 : currentProgress;
				}
				return acc;
			},
			{ ...fileProgress }
		);

		setFileProgress(updatedProgress);
	}, [fileList]);

	return (
		fileList.length !== 0 && (
			<div className={styles.container}>
				<p className={styles.title}>All Files</p>
				<p className={styles.text}>Uploaded documents.</p>
				{fileList.map((file) => {
					const progress = fileProgress[file.uid];

					return (
						<div key={String(file.uid)} className={styles.customFileItem}>
							<div
								className={classNames(
									styles.progressBar,
									file?.error && styles.errorStyle
								)}
								style={{
									width: `${progress || (file.status === "done" && 100)}%`,
								}}
							/>
							<div className={styles.left}>
								<div
									className={classNames(
										styles.icon,
										(progress !== 0 || file.status === "done") &&
											styles.progressIcon,
										file?.error && styles.errorIcon
									)}
								>
									<Icon
										icon={
											file?.error || progress !== 0
												? "IconDocumentWhite"
												: "IconDocumentGradient"
										}
									/>
								</div>
								<div>
									<p className={styles.fileName}>{file.name}</p>
									{!file?.error ? (
										<p className={styles.fileStatus}>
											{progress}
											{file.status === "done" ? "100%" : "%"}{" "}
											{file.status === "done" && (
												<span className={styles.fileStatus}>Uploaded </span>
											)}
											{file.lastModifiedDate && (
												<span className={styles.fileDate}>
													{new Date(file.lastModifiedDate).toLocaleDateString(
														"en-CA"
													)}{" "}
													-{" "}
													{new Date(file.lastModifiedDate).toLocaleTimeString(
														"en-GB",
														{
															hour: "2-digit",
															minute: "2-digit",
															hour12: false,
															timeZone: "GMT",
														}
													)}{" "}
													GMT
												</span>
											)}
										</p>
									) : (
										<p className={styles.error}>{file?.error}</p>
									)}
								</div>
							</div>
							<span className={styles.delete} onClick={() => onRemove(file)}>
								<Icon icon={"IconDelete"} />
							</span>
						</div>
					);
				})}
			</div>
		)
	);
};

export default FileListComponent;
