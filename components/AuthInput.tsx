import cn from "@/utils/cn";
import React from "react";
import { Text, TextInput, View } from "react-native";

interface AuthInputProps {
	label: string;
	value: string;
	onChangeText: (text: string) => void;
	placeholder?: string;
	secureTextEntry?: boolean;
	error?: string;
	autoCapitalize?: "none" | "sentences" | "words" | "characters";
	keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
}

const AuthInput = ({
	label,
	value,
	onChangeText,
	placeholder,
	secureTextEntry,
	error,
	autoCapitalize = "none",
	keyboardType = "default",
}: AuthInputProps) => (
	<View className="auth-field">
		<Text className="auth-label">{label}</Text>
		<TextInput
			className={cn("auth-input", error && "auth-input-error")}
			value={value}
			onChangeText={onChangeText}
			placeholder={placeholder}
			placeholderTextColor="#b0b0b0"
			secureTextEntry={secureTextEntry}
			autoCapitalize={autoCapitalize}
			keyboardType={keyboardType}
		/>
		{!!error && <Text className="auth-error">{error}</Text>}
	</View>
);

export default AuthInput;
