import { Image, StyleSheet, Text, View, Dimensions } from "react-native";
import React from "react";
import { getTheme } from "../../context/ThemeContext";
import { ReusableIcon, Warning } from "../../constants/icons";
import { width, height } from "../../utils/dimensionUtils";

const QR = width / 2;

const TicketCard = ({ ticket }) => {

	const {theme} = getTheme()
  return (
    <View
      style={{
        height: height * 0.44,
        width: width * 0.83,
        alignContent: "center",
        borderRadius: 20,
        alignSelf: "center",
        backgroundColor: "transparent",
        top: 10,
      }}
    >
      <TicketTitle ticket={ticket} theme={theme} />
      <TicketImage ticket={ticket}  theme={theme}/>
      <TicketDescription ticket={ticket} theme={theme}/>
    </View>
  );
};

const TicketTitle = ({ ticket, theme}) => {
  return (
    <>
      <View style={{ alignItems: "center" }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "600",
            color: "rgba(47.66, 47.66, 47.66, 1)",
            fontFamily: "PoppinsBold",
          }}
        >
          {ticket.title}
        </Text>
        <Text
          style={{
            fontSize: 12,
            textAlign: "center",
            color: "rgba(112.62, 112.62, 112.62, 1)",
            fontFamily: "PoppinsLight",
            width: 250,
          }}
        >
          Scan this code to gain entry into {ticket.title}
        </Text>
      </View>
    </>
  );
};

const TicketImage = ({ ticket, theme }) => {
  return (
    <View>
      <View style={{ alignItems: "center", width: 300, height: QR }}>
        <Image
          source={{ uri: ticket.qrCode }}
          style={{ height: QR, width: QR, alignSelf: "center" }}
        />
      </View>
    </View>
  );
};

const TicketDescription = ({ ticket , theme}) => {
  return (
    <View>
      <ReusableIcon style={{ alignSelf: "center", margin: 5 }} name={"exclamation"} />
      <Text
        style={{
          width: 240,
          fontSize: 12,
          fontWeight: "500",
          alignSelf: "center",
          textAlign: "center",
          color: "rgba(112.62, 112.62, 112.62, 1)",
          fontFamily: "PoppinsLight",
        }}
      >
        The qr code is one-time and would be unusable after its scanned
      </Text>
    </View>
  );
};

export default TicketCard;

