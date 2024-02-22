import React, {useContext, useState} from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeContext } from "../../context/ThemeContext";
import {SignUpForm} from "../../components/SignUpForm"

// const { width } = Dimensions.get("screen");

export const SignUp = () => {
	const {theme} = useContext(ThemeContext)

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor:theme.white, paddingTop: 55 }}>
		<SignUpForm/>
		</SafeAreaView>
	);
};

