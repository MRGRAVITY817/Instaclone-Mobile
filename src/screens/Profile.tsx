import { Text, View } from "react-native";
import React from "react";

// type FeedProps = BottomTabBarProps<RootTabParamList, "Feed">;

export const Profile = () => {
  return (
    <View
      style={{
        backgroundColor: "black",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={{ color: "white" }}>Profile</Text>
    </View>
  );
};
