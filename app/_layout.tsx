import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import "./global.css";

export default function RootLayout() {
	return (
		<>
			<StatusBar style="auto" />
			<Stack>
				<Stack.Screen
					name="(tabs)"
					options={{ headerShown: true, title: "Recurrly" }}
				/>
				<Stack.Screen name="index" options={{ headerShown: false }} />
				<Stack.Screen
					name="(auth)"
					options={{ headerShown: false, title: "" }}
				/>
			</Stack>
		</>
	);
}
