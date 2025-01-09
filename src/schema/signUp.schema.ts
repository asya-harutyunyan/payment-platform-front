import * as z from "zod";
import { ZodIssueCode } from "zod";
import { password_regex } from "./regex";

export const signUpSchema = z
	.object({
		name: z
			.string({ required_error: "First name is required" })
			.trim()
			.min(2, {
				message: "First name should contain a minimum of 2 characters",
			})
			.max(20, {
				message: "First name should contain a maximum of 20 characters",
			}),
		last_name: z
			.string({ required_error: "Last name is required" })
			.trim()
			.min(2, {
				message: "Last name should contain a minimum of 2 characters",
			})
			.max(40, {
				message: "Last name should contain a maximum of 40 characters",
			}),
		email: z
			.string({ required_error: "Email is required" })
			.trim()
			.min(3, {
				message: "Email should contain a minimum 3 characters",
			})
			.email("Invalid email address"),
		password: z
			.string({ required_error: "Password is required" })
			.trim()
			.min(8, { message: "Password must be at least 8 characters long" }),
		password_confirmation: z
			.string({ required_error: "Confirm password is required" })
			.trim(),
	})
	.superRefine((val, ctx) => {
		if (val.password !== val.password_confirmation) {
			ctx.addIssue({
				code: ZodIssueCode.custom,
				message: "Passwords don't match",
				path: ["password_confirmation"],
			});
		}
		if (!password_regex.test(val.password)) {
			ctx.addIssue({
				code: ZodIssueCode.custom,
				message:
					"Password must contain at least one uppercase letter, lowercase letter, number, and symbol",
				path: ["password"],
			});
		}
	});

export const socialAuthSchema = z
	.object({
		first_name: z
			.string({ required_error: "First name is required" })
			.trim()
			.min(2, {
				message: "First name should contain a minimum of 2 characters",
			})
			.max(20, {
				message: "First name should contain a maximum of 20 characters",
			}),
		last_name: z
			.string({ required_error: "Last name is required" })
			.trim()
			.min(2, {
				message: "Last name should contain a minimum of 2 characters",
			})
			.max(40, {
				message: "Last name should contain a maximum of 40 characters",
			}),
		password: z
			.string({ required_error: "Password is required" })
			.trim()
			.min(8, { message: "Password must be at least 8 characters long" }),
	})
	.superRefine((val, ctx) => {
		if (!password_regex.test(val.password)) {
			ctx.addIssue({
				code: ZodIssueCode.custom,
				message:
					"Password must contain at least one uppercase letter, lowercase letter, number, and symbol",
				path: ["password"],
			});
		}
	});
