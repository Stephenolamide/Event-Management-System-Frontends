import { Dimensions, Pressable, StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
const { width } = Dimensions.get("window");
export const FormSubmitBtn = ({ title, onPress, submitting, disabled, style }) => {
	const {theme} = useContext(ThemeContext)

	const backgroundColor = submitting ? theme.white : theme.lightblue;
	return (
		<Pressable
			activeOpacity={0.7}
			disabled={disabled}
			onPress={submitting ? null : onPress}
			style={[styles.container, { backgroundColor }, style]}
		>
			<Text
				style={{
					alignSelf: "center",
					color: theme.whites,
					fontWeight: "500",
					fontSize: 16,
					fontFamily:"Poppins-SemiBold"
				}}
			>
				{title}
			</Text>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	container: {
		width: width - 130,
		height: 50,
		alignSelf: "center",
		borderRadius: 10,
		justifyContent: "center",
		marginTop: 10,
	},
});
