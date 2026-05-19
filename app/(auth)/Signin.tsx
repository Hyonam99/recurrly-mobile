
import { Link } from "expo-router";
import { Text, View } from "react-native";

const Signin = () => {
	return (
		<View className="flex-1 justify-center items-center bg-background">
			<Text>Continue here</Text>

			<Link
				href={"/(tabs)/Home"}
				className="bg-primary text-white py-2 px-9 cursor-pointer rounded-md mt-3"
			>
				Proceed to account
			</Link>
			<Link
				href={"/(auth)/Signup"}
				className="bg-white text-primary py-2 px-9 cursor-pointer rounded-md mt-3"
			>
				Don&apos;t have an account? Sign up
			</Link>
		</View>
	);
};

export default Signin;
