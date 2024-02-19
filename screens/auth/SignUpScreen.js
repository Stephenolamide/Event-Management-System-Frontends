import React, {useContext, useState} from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { SignUpForm } from "../../components/SignupForm";
import { ThemeContext } from "../../context/ThemeContext";

// const { width } = Dimensions.get("screen");

export const SignUp = () => {
	const {theme} = useContext(ThemeContext)

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor:theme.white, paddingTop: 55 }}>
			<SignUpForm/>
		</SafeAreaView>
	);
};

