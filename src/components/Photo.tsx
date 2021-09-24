import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { CompositeNavigationProp, useNavigation } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import { Image, useWindowDimensions } from "react-native";
import styled from "styled-components/native";
import { RootTabParamList } from "../navigators/LoggedInNav";
import { SharedStackNavParamList } from "../navigators/SharedStackNav";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SeeAllFeeds_seeFeed_user } from "../__generated__/SeeAllFeeds";
import { gql, useMutation } from "@apollo/client";
import { ToggleLike, ToggleLikeVariables } from "../__generated__/ToggleLike";

const TOGGLE_LIKE = gql`
  mutation ToggleLike($id: Int!) {
    toggleLike(id: $id) {
      ok
      error
    }
  }
`;

interface PhotoProps {
  id: number;
  user: SeeAllFeeds_seeFeed_user;
  caption: string;
  file: string;
  isLiked: boolean;
  likes: number;
}

const Container = styled.View``;
const Header = styled.TouchableOpacity`
  padding: 10px;
  flex-direction: row;
  align-items: center;
`;
const UserAvatar = styled.Image`
  margin-right: 10px;
  width: 40px;
  height: 40px;
  border-radius: 20px;
`;
const Username = styled.Text`
  color: white;
  font-weight: 600;
`;
const File = styled.Image``;
const Actions = styled.View`
  flex-direction: row;
  align-items: center;
`;
const Action = styled.TouchableOpacity`
  margin-right: 10px;
`;
const Caption = styled.View`
  flex-direction: row;
`;
const CaptionText = styled.Text`
  color: white;
  margin-left: 5px;
`;
const Likes = styled.Text`
  color: white;
  margin: 7px 0px;
  font-weight: 600;
`;
const ExtraContainer = styled.View`
  padding: 10px;
`;

type PhotoNavProps = CompositeNavigationProp<
  BottomTabNavigationProp<RootTabParamList, "FeedRoot">,
  StackNavigationProp<SharedStackNavParamList>
>;

export const Photo: React.FC<PhotoProps> = ({
  id,
  user,
  caption,
  file,
  isLiked,
  likes,
}) => {
  const { width: sWidth, height } = useWindowDimensions();
  const [imageHeight, setImageHeight] = useState<number>(height - 450);
  useEffect(() => {
    Image.getSize(file, (width, height) => {
      setImageHeight((height * sWidth) / width);
    });
  }, [file]);

  const [toggleLikeMutation] = useMutation<ToggleLike, ToggleLikeVariables>(
    TOGGLE_LIKE,
    {
      variables: { id },
      update: (cache, result) => {
        const { ok } = result.data?.toggleLike!;
        if (ok) {
          const photoId = `Photo:${id}`;
          cache.modify({
            id: photoId,
            fields: {
              isLiked(prev) {
                return !prev;
              },
              likes(prev) {
                if (isLiked) {
                  return prev - 1;
                }
                return prev + 1;
              },
            },
          });
        }
      },
    }
  );

  const navigation = useNavigation<PhotoNavProps>();

  return (
    <Container>
      <Header onPress={() => navigation.navigate("Profile")}>
        <UserAvatar source={{ uri: user.avatar + "" }} />
        <Username>{user.username}</Username>
      </Header>
      <File
        style={{
          width: sWidth,
          height: imageHeight,
        }}
        source={{ uri: file }}
      />
      <ExtraContainer>
        <Actions>
          <Action onPress={() => toggleLikeMutation()}>
            <Ionicons
              name={isLiked ? "heart" : "heart-outline"}
              color={isLiked ? "tomato" : "white"}
              size={22}
            />
          </Action>
          <Action onPress={() => navigation.navigate("Comments")}>
            <Ionicons name="chatbubble-outline" color="white" size={22} />
          </Action>
        </Actions>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Likes", {
              photoId: id,
            })
          }
        >
          <Likes>{likes === 1 ? "1 like" : `${likes} likes`}</Likes>
        </TouchableOpacity>
        <Caption>
          <Username>{user.username}</Username>
          <CaptionText>{caption}</CaptionText>
        </Caption>
      </ExtraContainer>
    </Container>
  );
};
