export interface IFileItem {
	uid: string;
	name: string;
	percent?: number;
	status?: "done" | "uploading" | "error";
	error?: string;
	lastModifiedDate?: Date;
}
