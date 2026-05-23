import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

export default function AuthLayout() {
	return (
		<>
			<StatusBar style="dark" />
			<Stack>
				<Stack.Screen name="Signin" options={{ headerShown: false }} />
				<Stack.Screen name="Signup" options={{ headerShown: false }} />
			</Stack>
		</>
	);
}
