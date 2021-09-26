import { Text, View } from "react-native";
import React, { useEffect } from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { SharedStackNavParamList } from "../navigators/SharedStackNav";

export type ProfileProps = StackScreenProps<SharedStackNavParamList, "Profile">;

export const Profile: React.FC<ProfileProps> = ({ navigation, route }) => {
  useEffect(() => {
    if (route?.params?.username) {
      navigation.setOptions({
        title: route.params.username,
      });
    }
  }, []);
  return (
    <View
      style={{
        backgroundColor: "black",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={{ color: "white" }}>Somebody else's Profile</Text>
    </View>
  );
};
