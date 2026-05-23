import cn from "@/utils/cn";
import React from "react";
import { ActivityIndicator, Pressable, Text } from "react-native";

interface AuthButtonProps {
	title: string;
	onPress: () => void;
	disabled?: boolean;
	loading?: boolean;
	secondary?: boolean;
}

const AuthButton = ({
	title,
	onPress,
	disabled,
	loading,
	secondary = false,
}: AuthButtonProps) => (
	<Pressable
		className={cn(
			secondary ? "auth-secondary-button" : "auth-button",
			disabled || loading ? "auth-button-disabled" : "",
		)}
		onPress={onPress}
		disabled={disabled || loading}
	>
		{loading ? (
			<ActivityIndicator color={secondary ? "#ea7a53" : "#081126"} />
		) : (
			<Text
				className={
					secondary
						? "auth-secondary-button-text"
						: "auth-button-text"
				}
			>
				{title}
			</Text>
		)}
	</Pressable>
);

export default AuthButton;
