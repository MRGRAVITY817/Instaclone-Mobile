import React from "react";
import { Keyboard, Platform, TouchableWithoutFeedback } from "react-native";

export const DismissKeyboard: React.FC = ({ children }) => {
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };
  return (
    <TouchableWithoutFeedback
      style={{
        height: "100%",
        justifyContent: "center",
        alignContent: "center",
      }}
      onPress={dismissKeyboard}
      disabled={Platform.OS === "web"}
    >
      {children}
    </TouchableWithoutFeedback>
  );
};
