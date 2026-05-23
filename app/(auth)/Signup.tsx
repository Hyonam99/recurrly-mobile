import AuthButton from "@/components/AuthButton";
import AuthInput from "@/components/AuthInput";
import { signUpAccount } from "@/utils/auth";
import { Link, router } from "expo-router";
import React, { useMemo, useState } from "react";
import {
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	Text,
	View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Signup = () => {
	const [fullName, setFullName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [fieldErrors, setFieldErrors] = useState({
		fullName: "",
		email: "",
		password: "",
		confirmPassword: "",
	});
	const [submissionError, setSubmissionError] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);

	const canSubmit = useMemo(() => {
		return (
			!!fullName.trim() &&
			!!email.trim() &&
			!!password.trim() &&
			!!confirmPassword.trim() &&
			!isSubmitting
		);
	}, [confirmPassword, email, fullName, isSubmitting, password]);

	const validate = () => {
		const nextErrors = {
			fullName: "",
			email: "",
			password: "",
			confirmPassword: "",
		};

		if (!fullName.trim()) {
			nextErrors.fullName =
				"Add your name so your renewal dashboard feels personal.";
		} else if (fullName.trim().length < 2) {
			nextErrors.fullName = "Use at least two characters for your name.";
		}

		if (!email.trim()) {
			nextErrors.email = "Enter the email you want to use for Recurrly.";
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
			nextErrors.email = "Use a valid work or personal email address.";
		}

		if (!password.trim()) {
			nextErrors.password =
				"Create a password with at least 8 characters.";
		} else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password)) {
			nextErrors.password =
				"Use 8+ characters with a lowercase letter, uppercase letter, and number.";
		}

		if (!confirmPassword.trim()) {
			nextErrors.confirmPassword = "Confirm your password to continue.";
		} else if (confirmPassword !== password) {
			nextErrors.confirmPassword = "Those passwords don’t match yet.";
		}

		return nextErrors;
	};

	const handleSubmit = async () => {
		const nextErrors = validate();
		setFieldErrors(nextErrors);
		setSubmissionError("");

		if (
			nextErrors.fullName ||
			nextErrors.email ||
			nextErrors.password ||
			nextErrors.confirmPassword
		) {
			return;
		}

		setIsSubmitting(true);

		try {
			const result = await signUpAccount(
				fullName.trim(),
				email,
				password,
			);

			if (!result.ok) {
				setSubmissionError(
					result.error ??
						"We couldn't create your account yet. Please try again.",
				);
				return;
			}

			router.replace("/(tabs)/Home");
		} catch {
			setSubmissionError(
				"Something changed while creating your account. Please try again.",
			);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<SafeAreaView className="auth-safe-area">
			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : "height"}
				className="auth-screen"
			>
				<ScrollView
					contentContainerStyle={{ flexGrow: 1 }}
					showsVerticalScrollIndicator={false}
					className="auth-scroll"
				>
					<View className="auth-content">
						<View className="auth-brand-block">
							<View className="auth-logo-wrap">
								<View className="auth-logo-mark">
									<Text className="auth-logo-mark-text">
										R
									</Text>
								</View>
								<View>
									<Text className="auth-wordmark">
										Recurrly
									</Text>
									<Text className="auth-wordmark-sub">
										Renewal clarity for modern teams
									</Text>
								</View>
							</View>
							<Text className="auth-title">
								Create your account
							</Text>
							<Text className="auth-subtitle">
								Start with a clear view of every plan, renewal
								date, and budget decision.
							</Text>
						</View>

						<View className="auth-card">
							<View className="auth-form">
								<AuthInput
									label="Full name"
									value={fullName}
									onChangeText={(value) => {
										setFullName(value);
										if (fieldErrors.fullName) {
											setFieldErrors((current) => ({
												...current,
												fullName: "",
											}));
										}
									}}
									placeholder="Alex Morgan"
									error={fieldErrors.fullName}
								/>

								<AuthInput
									label="Email address"
									value={email}
									onChangeText={(value) => {
										setEmail(value);
										if (fieldErrors.email) {
											setFieldErrors((current) => ({
												...current,
												email: "",
											}));
										}
									}}
									placeholder="name@company.com"
									autoCapitalize="none"
									keyboardType="email-address"
									error={fieldErrors.email}
								/>

								<AuthInput
									label="Password"
									value={password}
									onChangeText={(value) => {
										setPassword(value);
										if (fieldErrors.password) {
											setFieldErrors((current) => ({
												...current,
												password: "",
											}));
										}
									}}
									placeholder="Create a secure password"
									secureTextEntry
									error={fieldErrors.password}
								/>

								<AuthInput
									label="Confirm password"
									value={confirmPassword}
									onChangeText={(value) => {
										setConfirmPassword(value);
										if (fieldErrors.confirmPassword) {
											setFieldErrors((current) => ({
												...current,
												confirmPassword: "",
											}));
										}
									}}
									placeholder="Re-enter your password"
									secureTextEntry
									error={fieldErrors.confirmPassword}
								/>

								{submissionError ? (
									<Text className="auth-error">
										{submissionError}
									</Text>
								) : null}

								<Text className="auth-helper">
									Your account stays local to this device and
									unlocks the Recurrly dashboard instantly.
								</Text>

								<AuthButton
									title="Create Recurrly account"
									onPress={handleSubmit}
									disabled={!canSubmit}
									loading={isSubmitting}
								/>
							</View>
						</View>

						<View className="auth-link-row">
							<Text className="auth-link-copy">
								Already have an account?
							</Text>
							<Link href="/(auth)/Signin" className="auth-link">
								Sign in
							</Link>
						</View>
					</View>
				</ScrollView>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
};

export default Signup;
