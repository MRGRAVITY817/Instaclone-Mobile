import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { CompositeNavigationProp, useNavigation } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useState, useEffect } from "react";
import { Image, useWindowDimensions } from "react-native";
import styled from "styled-components/native";
import { RootTabParamList } from "../navigators/LoggedInNav";
import { StackNavFactoryParamList } from "../navigators/StackNavFactory";
import { SeeAllFeeds_seeFeed_feeds_user } from "../__generated__/SeeAllFeeds";

interface PhotoProps {
  id: number;
  user: SeeAllFeeds_seeFeed_feeds_user;
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
const Actions = styled.View``;
const Action = styled.TouchableOpacity``;
const Caption = styled.View``;
const CaptionText = styled.Text``;
const Likes = styled.Text`
  color: white;
`;

type PhotoNavProps = CompositeNavigationProp<
  BottomTabNavigationProp<RootTabParamList, "FeedRoot">,
  StackNavigationProp<StackNavFactoryParamList>
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
      <Actions>
        <Action />
        <Action />
      </Actions>
      <Likes>{likes === 1 ? "1 like" : `${likes} likes`}</Likes>
      <Caption>
        <Username>{user.username}</Username>
        <CaptionText>{caption}</CaptionText>
      </Caption>
    </Container>
  );
};
