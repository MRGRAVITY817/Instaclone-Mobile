import { StackScreenProps } from "@react-navigation/stack";
import React, { useEffect } from "react";
import { FlatList, KeyboardAvoidingView } from "react-native";
import { MessagesNav, MessagesNavParamList } from "../navigators/MessagesNav";
import { gql, useQuery } from "@apollo/client";
import { ScreenLayout } from "../components/ScreenLayout";
import { SeeRoom, SeeRoom_seeRoom_messages } from "../__generated__/SeeRoom";
import styled from "styled-components/native";

const ROOM_QUERY = gql`
  query SeeRoom($id: Int!) {
    seeRoom(id: $id) {
      messages {
        id
        payload
        user {
          username
          avatar
        }
        read
      }
    }
  }
`;

const TextInput = styled.TextInput`
  margin-bottom: 50px;
  width: 90%;
  background-color: white;
  padding: 10px 20px;
  border-radius: 1000px;
`;
const MessageContainer = styled.View``;
const Author = styled.Text``;
const Avatar = styled.Image``;
const Username = styled.Text`
  color: white;
`;
const Message = styled.Text`
  color: white;
`;

type RoomProps = StackScreenProps<MessagesNavParamList, "Room">;

export const Room: React.FC<RoomProps> = ({ navigation, route }) => {
  const { data, loading } = useQuery<SeeRoom>(ROOM_QUERY, {
    variables: { id: route.params.id },
  });
  useEffect(() => {
    navigation.setOptions({
      title: `${route.params.talkingTo}`,
    });
  });
  const renderItem = (message: SeeRoom_seeRoom_messages) => (
    <MessageContainer>
      <Author>
        <Avatar source={{ uri: message.user.avatar + "" }} />
        <Username>{message.user.username}</Username>
      </Author>
      <Message>{message.payload}</Message>
    </MessageContainer>
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "black" }}
      keyboardVerticalOffset={100}
      behavior="height"
    >
      <ScreenLayout loading={loading}>
        <FlatList
          inverted
          style={{ width: "100%" }}
          data={data?.seeRoom?.messages}
          keyExtractor={(message) => message?.id + ""}
          renderItem={({ item }) => item && renderItem(item)}
        />
        <TextInput
          placeholderTextColor="rgba(0, 0, 0, 0.3)"
          placeholder="Write a message..."
          returnKeyLabel="Send Message"
          returnKeyType="send"
        />
      </ScreenLayout>
    </KeyboardAvoidingView>
  );
};
