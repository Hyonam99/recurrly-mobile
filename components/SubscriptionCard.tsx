import { colors } from "@/constants/theme";
import { SubscriptionCardProps } from "@/types";
import {
	formatCurrency,
	formatStatusLabel,
	formatSubscriptionDateTime,
} from "@/utils/helpers";
import React from "react";
import { Image, Pressable, Text, View } from "react-native";

const SubscriptionCard = ({
	name,
	price,
	currency,
	icon,
	billing,
	color,
	category,
	plan,
	renewalDate,
	paymentMethod,
	status,
	onPress,
	expanded,
}: SubscriptionCardProps) => {
	// There was an error with using tailwind or custom classes for the Pressable component when applying conditional styles based on the expanded state. To work around this, I switched to using the styles prop for the card container, which allows for dynamic styling based on the component's state.

	//Referenced ERROR: [Error: Couldn't find a navigation context. Have you wrapped your app with 'NavigationContainer'? See https://reactnavigation.org/docs/getting-started for setup instructions.]

	//Reference for the Fix: https://dev.to/sammytdev/48-hours-lost-nativewind-expo-router-couldnt-find-a-navigation-context-nightmare-3opp


	const cardStyle = {
		borderRadius: 16,
		borderWidth: 1,
		borderColor: colors.border,
		padding: 16,
		backgroundColor: expanded ? "#fff8e7" : color || colors.card,
		...(expanded
			? {
					shadowColor: "#000",
					shadowOffset: { width: 0, height: 10 },
					shadowOpacity: 0.16,
					shadowRadius: 16,
					elevation: 8,
				}
			: {}),
	};

	return (
		<Pressable style={cardStyle} onPress={onPress}>
			<View className="sub-head">
				<View className="sub-main">
					<Image source={icon} className="sub-icon" />
					<View className="sub-copy">
						<Text className="sub-title" numberOfLines={1}>
							{name}
						</Text>
						<Text
							className="sub-meta"
							numberOfLines={1}
							ellipsizeMode="tail"
						>
							{category?.trim() || plan?.trim() || renewalDate
								? formatSubscriptionDateTime(renewalDate)
								: ""}
						</Text>
					</View>
				</View>

				<View className="sub-price-box">
					<Text className="sub-price">
						{formatCurrency(price, currency)}
					</Text>
					<Text className="sub-billing">{billing}</Text>
				</View>
			</View>

			{expanded && (
				<View className="sub-body">
					<View className="sub-details">
						<View className="sub-row">
							<Text className="sub-label">Payment</Text>
							<Text className="sub-value text-primary font-bold">
								{paymentMethod || "Not provided"}
							</Text>
						</View>

						<View className="sub-row">
							<Text className="sub-label">Status</Text>
							<Text className="sub-value text-primary font-bold">
								{formatStatusLabel(status)}
							</Text>
						</View>

						<View className="sub-row">
							<Text className="sub-label">Renewal</Text>
							<Text className="sub-value text-primary font-bold">
								{formatSubscriptionDateTime(renewalDate)}
							</Text>
						</View>
					</View>
				</View>
			)}
		</Pressable>
	);
};

export default SubscriptionCard;
