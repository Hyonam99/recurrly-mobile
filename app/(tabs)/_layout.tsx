import { tabs } from "@/constants/data";
import { colors, components } from "@/constants/theme";
import clsxStyle from "clsx";
import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Image, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const TabLayout = () => {
	const insets = useSafeAreaInsets();
	const tabBarTheme = components.tabBar;

	return (
		<>
			<StatusBar style="auto" hidden/>
			<Tabs
				screenOptions={{
					headerShown: false,
					tabBarShowLabel: false,
					tabBarStyle: {
						position: "absolute",
						bottom: Math.max(
							insets.bottom,
							tabBarTheme.horizontalInset,
						),
						height: tabBarTheme.height,
						marginHorizontal: tabBarTheme.horizontalInset,
						borderRadius: tabBarTheme.radius,
						backgroundColor: colors.primary,
						borderTopWidth: 0,
						elevation: 0,
					},
					tabBarItemStyle: {
						paddingVertical:
							tabBarTheme.height / 2 -
							tabBarTheme.iconFrame / 1.6,
					},
					tabBarIconStyle: {
						alignItems: "center",
						height: tabBarTheme.iconFrame,
						width: tabBarTheme.iconFrame,
					},
				}}
			>
				{tabs.map((tab) => (
					<Tabs.Screen
						key={tab.name}
						name={tab.name}
						options={{
							title: tab.title,
							tabBarIcon: ({ focused }) => (
								<View className="tabs-icon">
									<View
										className={clsxStyle(
											"tabs-pill",
											focused && "tabs-active",
										)}
									>
										<Image
											source={tab.icon}
											resizeMode="contain"
											className="tabs-glyph"
										/>
									</View>
								</View>
							),
						}}
					/>
				))}
			</Tabs>
		</>
	);
};

export default TabLayout;
