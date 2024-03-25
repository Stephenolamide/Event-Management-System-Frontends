import {
	StyleSheet,
	Text,
	View,
	Dimensions,
	FlatList,
	TouchableOpacity,
	Image,
	ScrollView,
	Platform,
} from "react-native";
import React, { useContext, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeContext } from "../../context/ThemeContext";
import { Back } from "../../constants/icons";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("screen");

const imageW = width;
const imageH = height * .5;

const PostDetailsScreen = ({ route }) => {
	const {theme} = useContext(ThemeContext)
	
	return (
		<SafeAreaView style={{backgroundColor:theme.white}}>
			<About route={route}/>
		</SafeAreaView>
	);
};

const About = (props) => {
	const { image, title, date, content } = props.route.params;
	return (
		<>
			<PostImage image={image}/>
			<PostAbout title={title} date={date} content={content}/>
		</>
	);
};

const PostImage = (props) => {
	const {theme} = useContext(ThemeContext)

	const navigation = useNavigation()

	const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
	const handleScroll = (event) => {
		const index = Math.round(event.nativeEvent.contentOffset.x / imageW);
		setCurrentSlideIndex(index);
	};


	const styles = StyleSheet.create({
		dot: {
			borderRadius: 10,
			height: 7,
			width: 7,
			backgroundColor: theme.gray,
			marginBottom: 3,
			marginHorizontal: 3,
			justifyContent: "center",
		},
		pagination: {
			top: imageH*0.94,
			left: imageW / 2.3,
			position: "absolute",
			flexDirection: "row",
			justifyContent:"center",
			width:40,
		},
	});

	return (
		<>
			<View>

				<FlatList
					data={props.image}
					horizontal
					bounces={false}
					showsHorizontalScrollIndicator={false}
					pagingEnabled
					scrollEnabled
					onScroll={handleScroll}
					keyExtractor={(item, index) => index.toString()}
					renderItem={({ item }, id) => {

						return (

						
						<View>
						<Image
							style={{
								height: imageH,
								width: width,
								resizeMode: Platform.OS === "android" ? "cover" : null,
							}}
							key={id}
							source={{ uri: item }}
						/>
							 <Back size={30} color={theme.whites} style={{bottom:imageH/1.08, left:imageW/30}} onPress={()=> navigation.goBack()}/>   
						</View>
						)

					}}
				/>
			</View>

			{props.image.length > 1 ? (
				<View style={styles.pagination}>
					{props.image.map((_, index) => {
						return (
							<View
								key={index}
								style={[
									styles.dot,
									currentSlideIndex === index && {
										backgroundColor: theme.black,
										width: 7,
										height: 7,
										borderRadius: 10,
									},
								]}
							/>
						);
					})}
				</View>
			) : null}
		</>
	);
};

const PostAbout = (props) => {
	const {theme} = useContext(ThemeContext)

	// //(theme)
	return (
		<>
			<View style={{ marginLeft: 15, marginTop:-15 }}>
				<ScrollView
					showsVerticalScrollIndicator={false}
					bounces={false}
					contentContainerStyle={{ height: height * 1.5 }}
					decelerationRate={.4}
					// scrollIndicatorInsets={{width:10}}
					// indicatorStyle={"red"}
				>
					<View>
						<Text
							style={{
								fontWeight: "600",
								fontSize: 19,
								color: theme.black,
								width: 322,
								height: 25,
								lineHeight: 24.7,
								fontFamily: "JakartaSemiBold",
							}}
						>
							{props.title}
						</Text>
						<Text
							style={{
								fontWeight: "300",
								color: theme.darkblack,
								fontSize: 12,
								lineHeight: 13,
								fontFamily: "Jakarta",
								top: 4,
							}}
						>
							{props.date}
						</Text>
					</View>

					<View>
						<Text
							style={{
								fontWeight: "normal",
								fontSize: 13,
								lineHeight: 15,
								color: theme.mgray,
								fontFamily: "Jakarta",
								top: 13,
								// textTransform: "capitalize",
							}}
						>
							{props.content}
						</Text>
					</View>
				</ScrollView>
			</View>
		</>
	);
};

export default PostDetailsScreen;


