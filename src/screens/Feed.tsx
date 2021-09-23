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
import { Photo } from "../components/Photo";

export type FeedProps = StackScreenProps<StackNavFactoryParamList, "Feed">;

export const Feed: React.FC<FeedProps> = ({ navigation }) => {
  const { data, loading } = useQuery<SeeAllFeeds>(FEED_QUERY);
  const renderPhoto = (photo: SeeAllFeeds_seeFeed_feeds) => {
    return (
      <Photo
        id={photo.id}
        user={photo.user}
        caption={photo.caption + ""}
        file={photo.file}
        isLiked={photo.isLiked}
        likes={photo.likes}
      />
    );
  };

  return (
    <ScreenLayout loading={loading}>
      <FlatList
        style={{ width: `100%` }}
        showsVerticalScrollIndicator={false}
        data={data?.seeFeed.feeds as readonly SeeAllFeeds_seeFeed_feeds[]}
        keyExtractor={(photo: SeeAllFeeds_seeFeed_feeds) => photo.id + ""}
        renderItem={({ item }) => renderPhoto(item)}
      />
    </ScreenLayout>
  );
};
