import { Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { SharedStackNavParamList } from "../navigators/SharedStackNav";

type PhotoProps = StackScreenProps<SharedStackNavParamList, "Photo">;

export const Photo: React.FC<PhotoProps> = ({ navigation }) => {
  return (
    <View
      style={{
        backgroundColor: "black",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
        <Text style={{ color: "white" }}>Photo</Text>
      </TouchableOpacity>
    </View>
  );
};
