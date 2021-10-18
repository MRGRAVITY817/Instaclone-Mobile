import { FlatList, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { SharedStackNavParamList } from "../navigators/SharedStackNav";
import { SeeAllFeeds_seeFeed } from "../__generated__/SeeAllFeeds";
import { ScreenLayout } from "../components/ScreenLayout";
import { Photo } from "../components/Photo";
import { useSeeFeed } from "../hooks/useSeeFeed";
import { LoggedInStackScreens } from "../navigators/LoggedInNav";

export type FeedProps = StackScreenProps<LoggedInStackScreens, "Tabs">;

export const Feed: React.FC<FeedProps> = ({ navigation }) => {
  const { data, refetch, fetchMore, loading } = useSeeFeed();
  const renderPhoto = (photo: SeeAllFeeds_seeFeed) => {
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

  useEffect(() => {
    navigation.setOptions({
      headerRight: MessagesButton,
    });
  }, []);

  const MessagesButton = () => (
    <TouchableOpacity
      style={{ marginRight: 25 }}
      onPress={() => navigation.navigate("Messages")}
    >
      <Ionicons name="paper-plane" color="white" size={20} />
    </TouchableOpacity>
  );

  return (
    <ScreenLayout loading={loading}>
      <FlatList
        onEndReachedThreshold={0.05}
        onEndReached={() =>
          fetchMore({
            variables: {
              offset: data?.seeFeed?.length,
            },
          })
        }
        refreshing={refreshing}
        onRefresh={refresh}
        style={{ width: `100%` }}
        showsVerticalScrollIndicator={false}
        data={data?.seeFeed as readonly SeeAllFeeds_seeFeed[]}
        keyExtractor={(photo: SeeAllFeeds_seeFeed) => photo.id + ""}
        renderItem={({ item }) => renderPhoto(item)}
      />
    </ScreenLayout>
  );
};
