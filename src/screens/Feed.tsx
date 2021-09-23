import { FlatList, Text, View } from "react-native";
import React from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { StackNavFactoryParamList } from "../navigators/StackNavFactory";
import { useQuery } from "@apollo/client";
import {
  SeeAllFeeds,
  SeeAllFeeds_seeFeed_feeds,
} from "../__generated__/SeeAllFeeds";
import { FEED_QUERY } from "../hooks/feed";
import { ScreenLayout } from "../components/ScreenLayout";

type FeedProps = StackScreenProps<StackNavFactoryParamList, "Feed">;

export const Feed: React.FC<FeedProps> = ({ navigation }) => {
  const { data, loading } = useQuery<SeeAllFeeds>(FEED_QUERY);
  const renderPhoto = (photo: SeeAllFeeds_seeFeed_feeds) => {
    return (
      <View style={{ flex: 1 }}>
        <Text style={{ color: "white" }}>{photo.caption}</Text>
      </View>
    );
  };

  return (
    <ScreenLayout loading={loading}>
      <FlatList
        data={data?.seeFeed.feeds as readonly SeeAllFeeds_seeFeed_feeds[]}
        keyExtractor={(photo: SeeAllFeeds_seeFeed_feeds) => photo.id + ""}
        renderItem={({ item }) => renderPhoto(item)}
      />
    </ScreenLayout>
  );
};
