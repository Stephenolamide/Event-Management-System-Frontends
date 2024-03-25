import React, { useContext } from "react";
import {
  View,
  Modal,
  Animated,
  StyleSheet,
  Pressable,
  Text,
} from "react-native";
import { ThemeContext } from "../context/ThemeContext";
export const ModalPopUp = ({ visible, children, onClose, height }) => {
  const { theme } = useContext(ThemeContext);

  const [showModal, setShowModal] = React.useState(visible);
  const scaleValue = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    toggleModal();
  }, [visible]);
  const toggleModal = () => {
    if (visible) {
      setShowModal(true);
      Animated.spring(scaleValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      setTimeout(() => setShowModal(false), 200);
      Animated.timing(scaleValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  const styles = StyleSheet.create({
    modalBackGround: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.5)",
      justifyContent: "center",
      alignItems: "center",
    },
    modalContainer: {
      width: "90%",
      height: height,
      backgroundColor: theme.white,
      paddingHorizontal: 15,
      paddingVertical: 20,
      borderRadius: 20,
      elevation: 20,
    },
  });
  return (
    <Modal transparent visible={showModal}>
      <View style={styles.modalBackGround}>
        <Animated.View
          style={[
            styles.modalContainer,
            { transform: [{ scale: scaleValue }] },
          ]}
        >
          {children}
          {/* <Pressable onPress={onClose} activeOpacity={0.8}>
            <Text
              style={{
                color: theme.black,
                fontSize: 14,
                fontWeight: "600",
                lineHeight: 21,
                fontFamily: "JakartaSemiBold",
                alignSelf: "center",
                position: "absolute",
                padding: 8,
              }}
            >
              Close
            </Text>
          </Pressable> */}
        </Animated.View>
      </View>
    </Modal>
  );
};
