import { Text, View } from "react-native";
import React, { useEffect } from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { SharedStackNavParamList } from "../navigators/SharedStackNav";
import { useMe } from "../hooks/useMe";

export type MeProps = StackScreenProps<SharedStackNavParamList, "Me">;

export const Me: React.FC<MeProps> = ({ navigation }) => {
  const { data } = useMe();
  useEffect(() => {
    navigation.setOptions({
      title: data?.me?.username,
    });
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
      <Text style={{ color: "white" }}>My Profile</Text>
    </View>
  );
};
