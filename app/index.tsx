import { Link } from "expo-router";
import { Text, View } from "react-native";

const HomeScreen = () => {
	return (
		<View className="flex-1 justify-center items-center bg-background">
			<Text className="text-xl font-bold text-success">
				Welcome to Recurrly app!
			</Text>

			<Link
				href={"/(auth)/Signin"}
				className="bg-primary text-white py-2 px-9 cursor-pointer rounded-md mt-3"
			>
				Get started
			</Link>
		</View>
	);
};

export default HomeScreen;
