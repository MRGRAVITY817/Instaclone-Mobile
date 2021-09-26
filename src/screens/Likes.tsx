import React, { useState } from "react";
import { FlatList, View } from "react-native";
import { gql, useQuery } from "@apollo/client";
import { USER_FRAGMENT } from "../hooks/fragments";
import {
  SeePhotoLikes,
  SeePhotoLikesVariables,
  SeePhotoLikes_seePhotoLikes,
} from "../__generated__/SeePhotoLikes";
import { StackScreenProps } from "@react-navigation/stack";
import { SharedStackNavParamList } from "../navigators/SharedStackNav";
import { UserRow } from "../components/UserRow";
import { ScreenLayout } from "../components/ScreenLayout";

const LIKES_QUERY = gql`
  query SeePhotoLikes($id: Int!) {
    seePhotoLikes(id: $id) {
      ...UserFragment
    }
  }
  ${USER_FRAGMENT}
`;

type LikesProps = StackScreenProps<SharedStackNavParamList, "Likes">;

export const Likes: React.FC<LikesProps> = ({ route }) => {
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const { data, loading, refetch } = useQuery<
    SeePhotoLikes,
    SeePhotoLikesVariables
  >(LIKES_QUERY, {
    variables: {
      id: route?.params?.photoId,
    },
    skip: !route?.params?.photoId,
  });
  const renderUser = (item: SeePhotoLikes_seePhotoLikes) => (
    <UserRow
      avatar={item.avatar + ""}
      username={item.username}
      isFollowing={item.isFollowing}
      isMe={item.isMe}
      id={item.id}
    />
  );
  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };
  return (
    <ScreenLayout loading={loading}>
      <FlatList
        ItemSeparatorComponent={() => (
          <View
            style={{
              width: `100%`,
              height: 1,
              backgroundColor: `rgba(255, 255, 255, 0.2)`,
            }}
          />
        )}
        refreshing={refreshing}
        onRefresh={onRefresh}
        data={data?.seePhotoLikes}
        keyExtractor={(item) => item?.id + ""}
        renderItem={({ item }) => renderUser(item!)}
        style={{ width: "100%" }}
      ></FlatList>
    </ScreenLayout>
  );
};
