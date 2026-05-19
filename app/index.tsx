import { Link } from "expo-router";
import { Text } from "react-native";
import { SafeAreaView} from "react-native-safe-area-context";

const HomeScreen = () => {
	return (
		<SafeAreaView className="flex-1 justify-center items-center bg-background p-5">
			<Text className="text-xl font-bold text-success">
				Welcome to Recurrly app!
			</Text>

			<Link
				href={"/(auth)/Signin"}
				className="bg-primary text-white py-2 px-9 cursor-pointer rounded-md mt-3"
			>
				Get started
			</Link>
		</SafeAreaView>
	);
};

export default HomeScreen;
