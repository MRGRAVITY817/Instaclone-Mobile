import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import { Text, View } from "react-native";
import { LoggedInStackScreens } from "../navigators/LoggedInNav";

type PostProps = StackScreenProps<LoggedInStackScreens, "Post">;

export const Post: React.FC<PostProps> = ({ route }) => {
  console.log(route);
  return (
    <View>
      <Text>Text</Text>
    </View>
  );
};
