
import styles from "./styles.module.scss";
import {
	ButtonComponent,
	CheckboxComponent,
	InputComponent,
} from "../../components";
import { useMount, useWindowSize } from "react-use";
import { Breakpoints } from "../../constants";
import classNames from "classnames";
import { Controller } from "react-hook-form";
import useAuthGmail from "./_services/useAuthGmail";
import { useState } from "react";
import PageLoaderComponent from "../../utils/page-loader";

const AuthGmailForm = () => {
	const { width } = useWindowSize();
	const {
		control,
		errors,
	} = useAuthGmail();

	const [mounted, setMounted] = useState<boolean>(false);
	useMount(() => setMounted(true));
	if (!mounted) {
		return <PageLoaderComponent loading />;
	}

	return (
		mounted && (
			<>
					<div className={styles.wrapper}>
						<div className={styles.container}>
							<div className={styles.block}>
								<p className={styles.title}>Sign Up with Gmail</p>
								<p className={styles.text}>
									Enter your first and last name to sign up
								</p>

								<div className={styles.main_content}>
									<form
										onSubmit={() => {}}
										className={styles.form}
										data-netlify="true"
										data-netlify-honeypot="bot-field"
									>
										<figure
											className={classNames(styles.input, styles.first_name)}
										>
											{" "}
											<Controller
												name={"first_name"}
												control={control}
												render={({ field }) => (
													<InputComponent
														label={"First Name"}
														placeholder={"Enter your first name"}
														error={!!errors.first_name?.message}
														errorText={errors.first_name?.message}
														{...field}
													/>
												)}
											/>
										</figure>
										<figure className={styles.input}>
											{" "}
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
												name={"password"}
												control={control}
												render={({ field }) => (
													<InputComponent
														inputType={"password"}
														label={"Password"}
														placeholder={"Set a strong and secure password"}
														warningText={
															"Password is used for account settings, and authenticated actions."
														}
														error={!!errors.password?.message}
														errorText={errors.password?.message}
														{...field}
													/>
												)}
											/>
										</figure>

										<figure className={styles.agreement}>
											<div className={styles.child}>
												<CheckboxComponent
												checked={true}												/>
												<p>I agree to receive periodic emails from Loxala</p>
											</div>
											<div className={styles.child}>
												<CheckboxComponent
													checked={true}
													
												/>
												<p>
													I acknowledge and consent to the{" "}
													<span>
														<a href={'/'}>
															Terms of Service
														</a>
													</span>{" "}
													of Loxala, inclusive of the{" "}
													<span>
													<a href={'/'}>
													User Agreement
														</a>
													</span>{" "}
													and{" "}
													<span>
													<a href={'/'}>
													Privacy Policy
														</a>
													</span>
													.
												</p>
											</div>
										</figure>
										<div className={styles.end}>
											<ButtonComponent
												type={"submit"}
												size={width > Breakpoints.mobile_x ? "large" : "middle"}
												text={"Sign Up"}
												variant={"primary"}
												disabled={false}
											/>
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>
			</>
		)
	);
};

export default AuthGmailForm;
