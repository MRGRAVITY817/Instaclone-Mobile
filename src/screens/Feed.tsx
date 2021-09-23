import { FlatList } from "react-native";
import React, { useState } from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { SharedStackNavParamList } from "../navigators/SharedStackNav";
import { useQuery } from "@apollo/client";
import {
  SeeAllFeeds,
  SeeAllFeeds_seeFeed_feeds,
} from "../__generated__/SeeAllFeeds";
import { FEED_QUERY } from "../hooks/feed";
import { ScreenLayout } from "../components/ScreenLayout";
import { Photo } from "../components/Photo";

export type FeedProps = StackScreenProps<SharedStackNavParamList, "Feed">;

export const Feed: React.FC<FeedProps> = ({ navigation }) => {
  const { data, loading, refetch, fetchMore } = useQuery<SeeAllFeeds>(
    FEED_QUERY,
    {
      variables: {
        offset: 0,
      },
    }
  );
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

  const [refreshing, setRefreshing] = useState<boolean>(false);
  const refresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <ScreenLayout loading={loading}>
      <FlatList
        onEndReachedThreshold={0}
        onEndReached={() =>
          fetchMore({
            variables: {
              offset: data?.seeFeed.feeds?.length,
            },
          })
        }
        refreshing={refreshing}
        onRefresh={refresh}
        style={{ width: `100%` }}
        showsVerticalScrollIndicator={false}
        data={data?.seeFeed.feeds as readonly SeeAllFeeds_seeFeed_feeds[]}
        keyExtractor={(photo: SeeAllFeeds_seeFeed_feeds) => photo.id + ""}
        renderItem={({ item }) => renderPhoto(item)}
      />
    </ScreenLayout>
  );
};
