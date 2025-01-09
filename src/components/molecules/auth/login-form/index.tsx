
import styles from "./styles.module.scss";

import { Controller } from "react-hook-form";
import useLogin from "./_services/useLogin";
import { FC, useEffect, useState } from "react";
import classNames from "classnames";
import { ILoginPropTypes } from "./types";
import { ButtonComponent, CheckboxComponent, Icon, InputComponent } from "../../../atoms";

const LoginForm: FC<ILoginPropTypes> = ({ role }) => {

	const [showNotification, setShowNotification] = useState<boolean>(false);
	const {
		handleFormSubmit,
		handleSubmit,
		errors,
		control,
		handleRememberMe,
		rememberMe,
		loginState,
		showWrongRole,
	} = useLogin({ role });


	const handleShowNotification = () => {
		setShowNotification((cur) => !cur);
	};

	const { title, body, status } = loginState?.error?.errors ?? {
		title: undefined,
		body: undefined,
		status: undefined,
	};

	useEffect(() => {
		if (title && body) {
			handleShowNotification();
			const notificationTimeout = setTimeout(handleShowNotification, 6000);
			return () => clearTimeout(notificationTimeout);
		} else {
			setShowNotification(false);
		}
	}, [title, body, status]);



	return (
		<div className={styles.wrapper}>
			<form
				className={styles.form}
				onSubmit={handleSubmit(handleFormSubmit)}
				data-netlify-honeypot="bot-field"
			>
				<div className={styles.info}>
					<h1 className={styles.text}>Welcome Back!</h1>
					<p className={styles.subTitle}>Enter your details to login</p>
				</div>
				<div className={styles.auth}>
					<div className={styles.with}>
						<ButtonComponent
							size="middle"
							text={"Login with Google"}
							icon={"IconGoogle"}
							variant="dashed"
							onClick={() => {
								
							}}
						/>
						<ButtonComponent
							size="middle"
							text={"Login with Apple"}
							icon={"IconApple"}
							variant="dashed"
							type="button"
							onClick={() =>
								{}
							}
						/>
					</div>
					<div className={styles.or}>
						<span className={styles.left_thumb} />
						<p className={styles.text}>or</p>
						<span className={styles.right_thumb} />
					</div>
				</div>
				<div className={styles.lists}>
					<figure className={styles.list}>
						<Controller
							control={control}
							render={({ field }) => (
								<InputComponent
									label="Email Address"
									placeholder="Provide a valid email address"
									error={
										!!loginState?.error?.message || !!errors.email?.message
									}
									errorText={errors.email?.message}
									{...field}
								/>
							)}
							name="email"
						/>
					</figure>
					<figure className={styles.list}>
						<Controller
							name={"password"}
							control={control}
							render={({ field }) => (
								<InputComponent
									inputType={"password"}
									label={"Password"}
									placeholder={"Input your password"}
									autoComplete="on"
									error={
										!!loginState?.error?.message || !!errors.password?.message
									}
									errorText={errors.password?.message}
									{...field}
								/>
							)}
						/>
					</figure>
				</div>
				{!!loginState?.error?.message && (
					<div className={styles.error}>
						<span>
							<Icon
								icon={"IconErrorIcon"}
								svgProps={{
									width: "14px",
									height: "14px",
								}}
							/>
						</span>
						<p>{loginState?.error?.message}</p>
					</div>
				)}

				<div className={styles.remember}>
					<div className={styles.block}>
						<CheckboxComponent
							checked={rememberMe}
							onChange={handleRememberMe}
						/>
						<p className={styles.text}>Remember Me</p>
					</div>
					<p
						className={styles.logging}
						onClick={() => {}}
						role="button"
					>
						Trouble logging in?
					</p>
				</div>

				<div className={styles.container}>
					<ButtonComponent
						size="middle"
						text="Login"
						variant="primary"
						type="submit"
						isLoading={loginState.isLoading}
					/>
					<div className={styles.accountYet}>
						<p className={styles.account}>Don’t have an account yet?</p>
						<p className={styles.signIn}>
							<a href={'/'}>Sign Up Now</a>
						</p>
					</div>
				</div>
				{showNotification && (
					<div className={styles.toast}>
						<div className={styles.toast_container}>
							<div className={styles.header}>
								<div className={styles.icon}>
									<Icon icon="IconToastError" />
								</div>
								<p>{title}</p>
								<button
									className={classNames(styles.icon, styles.closeIcon)}
									onClick={handleShowNotification}
								>
									<Icon icon="IconClose" />
								</button>
							</div>
							<p className={styles.message}>{body}</p>
						</div>
					</div>
				)}
			</form>
			{showWrongRole && (
				<div className={styles.wrong_role}>
					
				</div>
			)}
		</div>
	);
};

export default LoginForm;
