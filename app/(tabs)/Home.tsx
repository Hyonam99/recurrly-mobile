import { HOME_USER } from "@/constants/data";
import images from "@/constants/images";
import React from "react";
import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
	return (
		<SafeAreaView className="flex-1 bg-background p-5">
			<View className="home-header">
				<View className="home-user">
					<Image source={images.avatar} className="home-avatar" />
					<Text className="home-user-name">{HOME_USER.name}</Text>
				</View>
			</View>
		</SafeAreaView>
	);
};

export default Home;
