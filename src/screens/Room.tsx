import { StackScreenProps } from "@react-navigation/stack";
import React, { useEffect } from "react";
import { FlatList, KeyboardAvoidingView } from "react-native";
import { MessagesNavParamList } from "../navigators/MessagesNav";
import { gql, useQuery } from "@apollo/client";
import { ScreenLayout } from "../components/ScreenLayout";
import { SeeRoom, SeeRoom_seeRoom_messages } from "../__generated__/SeeRoom";
import styled from "styled-components/native";

const SEND_MESSAGE_MUTATION = gql`
  mutation SendMessage($payload: String!, $roomId: Int, $userId: Int) {
    sendMessage(payload: $payload, roomId: $roomId, userId: $userId) {
      ok
      id
    }
  }
`;

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
  margin-top: 25px;
  width: 90%;
  border: 1px solid rgba(255, 255, 255, 0.6);
  padding: 10px 20px;
  border-radius: 1000px;
  color: white;
`;
const MessageContainer = styled.View<{ outGoing: boolean }>`
  padding: 5px 10px;
  flex-direction: ${(props) => (props.outGoing ? "row-reverse" : "row")};
  align-items: flex-end;
`;
const Author = styled.Text`
  margin: 0px 10px;
`;
const Avatar = styled.Image`
  height: 25px;
  width: 25px;
  border-radius: 12.5px;
`;
const Message = styled.Text`
  color: white;
  padding: 5px 10px;
  font-size: 16px;
  overflow: hidden;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.3);
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
    <MessageContainer
      outGoing={message.user.username !== route.params.talkingTo}
    >
      <Author>
        <Avatar source={{ uri: message.user.avatar + "" }} />
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
          placeholderTextColor="rgba(255, 255, 255, 0.6)"
          placeholder="Write a message..."
          returnKeyLabel="Send Message"
          returnKeyType="send"
        />
      </ScreenLayout>
    </KeyboardAvoidingView>
  );
};
