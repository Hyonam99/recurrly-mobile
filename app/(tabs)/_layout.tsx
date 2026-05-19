import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";

const TabLayout = () => {
	return (
		<>
			<StatusBar style="auto" />
			<Tabs
				screenOptions={{
					headerShown: false,
				}}
			>
				<Tabs.Screen
					name="Home"
					options={{
						title: "Home",
					}}
				/>
			</Tabs>
		</>
	);
};

export default TabLayout;
