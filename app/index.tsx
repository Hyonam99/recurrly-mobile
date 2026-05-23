import AuthButton from "@/components/AuthButton";
import { authSession } from "@/utils/auth";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const HomeScreen = () => {
	const [isCheckingSession, setIsCheckingSession] = useState(true);

	useEffect(() => {
		const session = authSession.getSession();

		if (session) {
			router.replace("/(tabs)/Home");
			return;
		}

		setIsCheckingSession(false);
	}, []);

	if (isCheckingSession) {
		return (
			<SafeAreaView className="flex-1 items-center justify-center bg-background">
				<Text className="auth-helper">
					Checking your Recurrly session…
				</Text>
			</SafeAreaView>
		);
	}

	return (
		<SafeAreaView className="flex-1 justify-center bg-background p-5">
			<View className="items-center">
				<Text className="auth-title">
					Recurrly keeps every renewal in view.
				</Text>
				<Text className="auth-subtitle">
					Review subscriptions, spot renewal dates earlier, and move
					from confusion to clarity in one place.
				</Text>
			</View>

			<View className="mt-8 gap-3">
				<AuthButton
					title="Continue to Recurrly"
					onPress={() => router.push("/(auth)/Signin")}
				/>
				<AuthButton
					title="Create your account"
					onPress={() => router.push("/(auth)/Signup")}
					secondary
				/>
			</View>
		</SafeAreaView>
	);
};

export default HomeScreen;
