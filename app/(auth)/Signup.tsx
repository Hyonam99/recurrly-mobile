import { Link } from "expo-router";
import { Text, View } from "react-native";

const Signup = () => {
	return (
		<View className="flex-1 justify-center items-center bg-background">
			<Text>Start here</Text>

			<Link
				href={"/(tabs)/Home"}
				className="bg-primary text-white py-2 px-9 cursor-pointer rounded-md mt-3"
			>
				Proceed to account
			</Link>
			<Link
				href={"/(auth)/Signin"}
				className="bg-white text-primary py-2 px-9 cursor-pointer rounded-md mt-3"
			>
				Already have an account? Sign in
			</Link>
		</View>
	);
};

export default Signup;
