import { Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { StackNavFactoryParamList } from "../navigators/StackNavFactory";
import { logUserOut } from "../apollo";
import { useQuery } from "@apollo/client";
import { SeeAllFeeds } from "../__generated__/SeeAllFeeds";
import { FEED_QUERY } from "../hooks/feed";

type FeedProps = StackScreenProps<StackNavFactoryParamList, "Feed">;

export const Feed: React.FC<FeedProps> = ({ navigation }) => {
  const { data } = useQuery<SeeAllFeeds>(FEED_QUERY);
  // console.log(data?.seeFeed.feeds);
  return (
    <View
      style={{
        backgroundColor: "black",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* <TouchableOpacity onPress={() => navigation.navigate("Photo")}> */}
      <TouchableOpacity onPress={() => logUserOut()}>
        <Text style={{ color: "white" }}>Touch Feed Photo</Text>
      </TouchableOpacity>
    </View>
  );
};
