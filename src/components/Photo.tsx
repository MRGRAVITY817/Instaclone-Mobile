import React from "react";
import { useWindowDimensions } from "react-native";
import styled from "styled-components/native";
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
const Header = styled.View``;
const UserAvatar = styled.Image``;
const Username = styled.Text`
  color: white;
`;
const File = styled.Image``;
const Actions = styled.View``;
const Action = styled.TouchableOpacity``;
const Caption = styled.View``;
const CaptionText = styled.Text``;
const Likes = styled.Text`
  color: white;
`;

export const Photo: React.FC<PhotoProps> = ({
  id,
  user,
  caption,
  file,
  isLiked,
  likes,
}) => {
  const { width, height } = useWindowDimensions();
  return (
    <Container>
      <Header>
        <UserAvatar
          style={{ height: 50, width: 50 }}
          source={{ uri: user.avatar + "" }}
        />
        <Username>{user.username}</Username>
      </Header>
      <File
        style={{
          width,
          height: height - 500,
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
