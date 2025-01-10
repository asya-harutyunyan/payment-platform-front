
import styles from "./styles.module.scss";

import classNames from "classnames";
import useSignUp from "./_services/useSignUp";
import { Controller } from "react-hook-form";
import { FC } from "react";
import { ISignUpPropTypes } from "./types";
import { ButtonComponent, InputComponent, CheckboxComponent } from "../../../atoms";
import ServiceAvailability from "../service-availability";

const SignUpForm: FC<ISignUpPropTypes> = () => {

	const {
		handleFormSubmit,
		handleSubmit,
		errors,
		control,
		checkMarks,
		handleCheck,
		isUnknown,
		setIsUnknown,
		showWrongRole,
	} = useSignUp();

	const { policy } = checkMarks;

	return (
		<section className={styles.wrapper}>
			
			<ServiceAvailability
				isIpValidation={isUnknown}
				setIsIpValidation={setIsUnknown}
			/>
			<h1 className={styles.title}>Create Your Account</h1>
			<p className={styles.sub_title}>Enter your details to Sign Up</p>
			<div className={styles.social_auth}>
				<div className={styles.social_btn}>
					<ButtonComponent
						type={"button"}
						icon={"IconGoogle"}
						size={"small"}
						text="Sign up with Google"
						variant={"dashed"}
						onClick={() =>
						{}
						}
					/>
				</div>
				
			</div>
			<div className={styles.or}>
				<span className={styles.left_thumb} />
				<p className={styles.text}>or</p>
				<span className={styles.right_thumb} />
			</div>
			<form
				className={styles.form}
				onSubmit={handleSubmit(handleFormSubmit)}
				data-netlify="true"
				data-netlify-honeypot="bot-field"
			>
				<figure className={classNames(styles.input, styles.half_width)}>
					<Controller
						name={"name"}
						control={control}
						render={({ field }) => (
							<InputComponent
								label={"First Name"}
								placeholder={"Enter your first name"}
								error={!!errors.name?.message}
								errorText={errors.name?.message}
								{...field}
							/>
						)}
					/>
				</figure>
				<figure className={classNames(styles.input, styles.half_width)}>
					<Controller
						name={"last_name"}
						control={control}
						render={({ field }) => (
							<InputComponent
								label={"Last Name"}
								placeholder={"Enter your last name"}
								error={!!errors.last_name?.message}
								errorText={errors.last_name?.message}
								{...field}
							/>
						)}
					/>
				</figure>
				<figure className={styles.input}>
					<Controller
						name={"email"}
						control={control}
						render={({ field }) => (
							<InputComponent
								label={"Email Address"}
								placeholder={"Provide a valid email address"}
								error={!!errors.email?.message}
								errorText={errors.email?.message}
								{...field}
							/>
						)}
					/>
				</figure>
				<figure className={styles.input}>
					<Controller
						name={"password"}
						control={control}
						render={({ field }) => (
							<InputComponent
								inputType={"password"}
								label={"Password"}
								placeholder={"Set a strong and secure password"}
								autoComplete="on"
								error={!!errors.password?.message}
								errorText={errors.password?.message}
								{...field}
							/>
						)}
					/>
				</figure>
				<figure className={styles.input}>
					<Controller
						name={"password_confirmation"}
						control={control}
						render={({ field }) => (
							<InputComponent
								inputType={"password"}
								label={"Confirm Password"}
								autoComplete="on"
								placeholder={"Confirm your password"}
								error={!!errors.password_confirmation?.message}
								errorText={errors.password_confirmation?.message}
								{...field}
							/>
						)}
					/>
				</figure>
				<figure className={styles.agreement}>
					<div className={styles.child}>
						<CheckboxComponent
							checked={checkMarks.agree}
							onChange={(e) => handleCheck("agree", e.target.checked)}
						/>
						<div className={styles.child_text}>
							I agree to receive periodic emails from Loxala
						</div>
					</div>
					<div className={styles.child}>
						<CheckboxComponent
							checked={checkMarks.policy}
							onChange={(e) => handleCheck("policy", e.target.checked)}
						/>
						<div className={styles.child_text}>
							I acknowledge and consent to the{" "}
							<a href={'/'}>Terms of Service</a> of
							Loxala, inclusive of the{" "}
							<a href={'/'}>User Agreement</a> and{" "}
							<a href={'/'}>Privacy Policy</a>.
						</div>
					</div>
				</figure>
				<div className={styles.btn}>
					<ButtonComponent
						type={"submit"}
						size={"middle"}
						text={"Sign Up"}
						variant={"primary"}
						disabled={!policy}
						isLoading={false}
					/>
				</div>
				<div className={styles.to_login}>
					<div className={styles.to_login_text}>
						Already have an account?{" "}
						<a
							href={
								'/'
							}
						>
							Login Now
						</a>
					</div>
				</div>
			</form>
			{showWrongRole && (
				<div className={styles.wrong_role}>
				
				</div>
			)}
		</section>
	);
};

export default SignUpForm;
