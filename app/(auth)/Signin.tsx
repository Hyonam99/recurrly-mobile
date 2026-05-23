import AuthButton from "@/components/AuthButton";
import AuthInput from "@/components/AuthInput";
import { signInAccount } from "@/utils/auth";
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

const Signin = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [fieldErrors, setFieldErrors] = useState({
		email: "",
		password: "",
	});
	const [submissionError, setSubmissionError] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);

	const canSubmit = useMemo(() => {
		return !!email.trim() && !!password.trim() && !isSubmitting;
	}, [email, isSubmitting, password]);

	const validate = () => {
		const nextErrors = { email: "", password: "" };

		if (!email.trim()) {
			nextErrors.email = "Enter the email you use for Recurrly.";
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
			nextErrors.email =
				"Use a valid email so we can verify your account.";
		}

		if (!password.trim()) {
			nextErrors.password = "Enter your password to continue.";
		} else if (password.trim().length < 8) {
			nextErrors.password =
				"Use the password you created when you signed up.";
		}

		return nextErrors;
	};

	const handleSubmit = async () => {
		const nextErrors = validate();
		setFieldErrors(nextErrors);
		setSubmissionError("");

		if (nextErrors.email || nextErrors.password) {
			return;
		}

		setIsSubmitting(true);

		try {
			const result = await signInAccount(email, password);

			if (!result.ok) {
				setSubmissionError(
					result.error ??
						"We couldn't verify those details. Please try again.",
				);
				return;
			}

			router.replace("/(tabs)/Home");
		} catch {
			setSubmissionError(
				"Something changed while signing you in. Please try again.",
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
							<Text className="auth-title">Welcome back</Text>
							<Text className="auth-subtitle">
								Sign in to review renewals, update plans, and
								keep every subscription in view.
							</Text>
						</View>

						<View className="auth-card">
							<View className="auth-form">
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
									placeholder="Enter your password"
									secureTextEntry
									error={fieldErrors.password}
								/>

								{submissionError ? (
									<Text className="auth-error">
										{submissionError}
									</Text>
								) : null}

								<Text className="auth-helper">
									Use the same email and password you created
									when you joined Recurrly.
								</Text>

								<AuthButton
									title="Sign in to Recurrly"
									onPress={handleSubmit}
									disabled={!canSubmit}
									loading={isSubmitting}
								/>
							</View>
						</View>

						<View className="auth-link-row">
							<Text className="auth-link-copy">
								New to Recurrly?
							</Text>
							<Link href="/(auth)/Signup" className="auth-link">
								Create your account
							</Link>
						</View>
					</View>
				</ScrollView>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
};

export default Signin;
