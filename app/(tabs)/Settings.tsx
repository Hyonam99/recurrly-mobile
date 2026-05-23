import { Redirect, router } from "expo-router";
import React, { useMemo, useState } from "react";
import { Alert, Pressable, Text, View } from "react-native";
import {
	SafeAreaView,
	useSafeAreaInsets,
} from "react-native-safe-area-context";

import AuthButton from "@/components/AuthButton";
import { components } from "@/constants/theme";
import { authSession } from "@/utils/auth";

const confirm = (title: string, message: string) => {
	return new Promise<boolean>((resolve) => {
		Alert.alert(title, message, [
			{ text: "Cancel", style: "cancel", onPress: () => resolve(false) },
			{
				text: "Log out",
				style: "destructive",
				onPress: () => resolve(true),
			},
		]);
	});
};

const Settings = () => {
	const insets = useSafeAreaInsets();
	const [isLoggingOut, setIsLoggingOut] = useState(false);

	const session = authSession.getSession();

	const canUseSettings = useMemo(() => !!session, [session]);

	const accountName = session?.fullName ?? "";

	const bottomPadding =
		components.tabBar.height +
		Math.max(insets.bottom, components.tabBar.horizontalInset);

	const handleLogout = async () => {
		if (!session || isLoggingOut) return;

		setIsLoggingOut(true);
		try {
			const ok = await confirm(
				"End this session?",
				"You’ll need to sign in again to keep viewing renewals in Recurrly.",
			);

			if (!ok) return;

			authSession.clearSession();
			router.replace("/(auth)/Signin");
		} finally {
			setIsLoggingOut(false);
		}
	};

	const handleNavigate = () => {
		// Keep navigation inside the existing tabs group for now.
		router.replace("/(tabs)/Subscriptions");
	};

	if (!canUseSettings) {
		return <Redirect href="/(auth)/Signin" />;
	}

	return (
		<SafeAreaView className="flex-1 bg-background p-5">
			<View className="settings-header">
				<View className="settings-titleRow">
					<View className="settings-titleIcon">
						<Text className="settings-titleIconGlyph">R</Text>
					</View>
					<View>
						<Text className="settings-title">Settings</Text>
						<Text className="settings-subtitle">
							Control what you see—logout clears this device’s
							local session.
						</Text>
					</View>
				</View>
			</View>

			<View className="settings-card">
				<View className="settings-cardRow">
					<View className="settings-avatar" />
					<View className="settings-account">
						<Text className="settings-accountName">
							{accountName}
						</Text>
						<Text className="settings-accountMeta">
							Local session on this device
						</Text>
					</View>
				</View>

				<View className="settings-divider" />

				<Pressable
					accessibilityRole="button"
					onPress={handleNavigate}
					className="settings-row"
				>
					<View className="settings-rowLeft">
						<View className="settings-rowIconWrap">
							{/* icon is kept consistent with existing design assets */}
							<Text className="settings-rowIconGlyph">{"$"}</Text>
						</View>
						<View className="settings-rowText">
							<Text className="settings-rowTitle">
								Subscriptions
							</Text>
							<Text className="settings-rowSubtitle">
								Review plans and renewal dates
							</Text>
						</View>
					</View>
					<Text className="settings-rowChevron">›</Text>
				</Pressable>

				<View className="settings-divider" />

				<View className="settings-logoutBlock">
					<Text className="settings-logoutTitle">Log out</Text>
					<Text className="settings-logoutSubtitle">
						End your local session on this device.
					</Text>

					<AuthButton
						title="Log out"
						onPress={handleLogout}
						disabled={isLoggingOut}
						loading={isLoggingOut}
						secondary
					/>
				</View>
			</View>

			<View style={{ height: bottomPadding }} />
		</SafeAreaView>
	);
};

export default Settings;
