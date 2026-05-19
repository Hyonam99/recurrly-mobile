import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";


export default function AuthLayout() {
	return (
		<>
			<StatusBar hidden/>
			<Stack>
				<Stack.Screen
					name="Signin"
					options={{ headerShown: true, title: "Login to your Account" }}
				/>
				<Stack.Screen
					name="Signup"
					options={{ headerShown: true, title: "Create your Account" }}
				/>
			</Stack>
		</>
	);
}
