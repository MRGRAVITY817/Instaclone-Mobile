import { Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { StackNavFactoryParamList } from "../navigators/StackNavFactory";

type FeedProps = StackScreenProps<StackNavFactoryParamList, "Feed">;

export const Feed: React.FC<FeedProps> = ({ navigation }) => {
  return (
    <View
      style={{
        backgroundColor: "black",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <TouchableOpacity onPress={() => navigation.navigate("Photo")}>
        <Text style={{ color: "white" }}>Touch Feed Photo</Text>
      </TouchableOpacity>
    </View>
  );
};
