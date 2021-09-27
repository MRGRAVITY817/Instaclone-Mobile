import {
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { SharedStackNavParamList } from "../navigators/SharedStackNav";
import { COMMENT_FRAGMENT, PHOTO_FRAGMENT } from "../hooks/fragments";
import { gql, useQuery } from "@apollo/client";
import { SeePhoto } from "../__generated__/SeePhoto";
import { Photo } from "../components/Photo";
import { ScreenLayout } from "../components/ScreenLayout";

const SEE_PHOTO = gql`
  query SeePhoto($id: Int!) {
    seePhoto(id: $id) {
      ...PhotoFragment
      user {
        id
        username
        avatar
      }
      caption
      likes
      comments {
        ...CommentFragment
      }
      createdAt
      isMine
    }
  }
  ${PHOTO_FRAGMENT}
  ${COMMENT_FRAGMENT}
`;

type PhotoScreenProps = StackScreenProps<SharedStackNavParamList, "Photo">;

export const PhotoScreen: React.FC<PhotoScreenProps> = ({ route }) => {
  const { data, loading, refetch } = useQuery<SeePhoto>(SEE_PHOTO, {
    variables: {
      id: route?.params?.photoId,
    },
  });

  const [refreshing, setRefreshing] = useState<boolean>(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <ScreenLayout loading={loading}>
      <ScrollView
        refreshControl={
          <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
        }
        style={{ backgroundColor: "black" }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          backgroundColor: "black",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <Photo
          id={data?.seePhoto?.id!}
          caption={data?.seePhoto?.caption!}
          user={data?.seePhoto?.user!}
          file={data?.seePhoto?.file!}
          isLiked={data?.seePhoto?.isLiked!}
          likes={data?.seePhoto?.likes!}
        />
      </ScrollView>
    </ScreenLayout>
  );
};
