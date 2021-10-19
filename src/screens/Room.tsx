import { StackScreenProps } from "@react-navigation/stack";
import React, { useEffect } from "react";
import { FlatList, KeyboardAvoidingView, View } from "react-native";
import { MessagesNavParamList } from "../navigators/MessagesNav";
import { gql, useMutation, useQuery } from "@apollo/client";
import { ScreenLayout } from "../components/ScreenLayout";
import {
  SeeRoom,
  SeeRoomVariables,
  SeeRoom_seeRoom_messages,
} from "../__generated__/SeeRoom";
import styled from "styled-components/native";
import { useForm } from "react-hook-form";
import {
  SendMessage,
  SendMessageVariables,
} from "../__generated__/SendMessage";
import { useMe } from "../hooks/useMe";
import { Ionicons } from "@expo/vector-icons";

interface MessageForm {
  message: string;
}

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

const InputContainer = styled.View`
  margin-bottom: 50px;
  margin-top: 25px;
  width: 90%;
  flex-direction: row;
  align-items: center;
`;

const SendButton = styled.TouchableOpacity``;

const TextInput = styled.TextInput`
  border: 1px solid rgba(255, 255, 255, 0.6);
  padding: 10px 20px;
  border-radius: 1000px;
  color: white;
  width: 90%;
  margin-right: 10px;
`;

const MessageContainer = styled.View<{ outGoing: boolean }>`
  padding: 2px 10px;
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
  const { data, loading } = useQuery<SeeRoom, SeeRoomVariables>(ROOM_QUERY, {
    variables: { id: route.params.id },
  });

  useEffect(() => {
    navigation.setOptions({
      title: `${route.params.talkingTo}`,
    });
  });

  const { watch, register, setValue, handleSubmit, getValues } =
    useForm<MessageForm>();

  useEffect(() => {
    register("message", { required: true });
  }, [register]);

  const { data: meData } = useMe();

  const [sendMessageMutation, { loading: sendingMessage }] = useMutation<
    SendMessage,
    SendMessageVariables
  >(SEND_MESSAGE_MUTATION, {
    update: (cache, result) => {
      const { ok, id } = result.data?.sendMessage!;

      if (ok && meData) {
        const { message: payload } = getValues();
        setValue("message", "");

        const messageFragment = cache.writeFragment({
          fragment: gql`
            fragment NewMessage on Message {
              id
              payload
              user {
                username
                avatar
              }
              read
            }
          `,
          data: {
            __typename: "Message",
            id,
            payload,
            user: {
              username: meData.me?.username,
              avatar: meData.me?.avatar,
            },
            read: true,
          },
        });

        const cacheId = `Room:${route.params.id}`;
        const didCacheUpdated = cache.modify({
          id: cacheId,
          fields: {
            messages(prev) {
              return [...prev, messageFragment];
            },
          },
        });

        alert(didCacheUpdated);
      }
    },
  });

  const onValid = ({ message }: MessageForm) => {
    sendMessageMutation({
      variables: {
        payload: message,
        roomId: route.params.id,
      },
    });
  };

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

  const messages = [...(data?.seeRoom?.messages ?? [])];
  messages.reverse();

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "black" }}
      keyboardVerticalOffset={100}
      behavior="padding"
    >
      <ScreenLayout loading={loading}>
        <FlatList
          style={{ width: "100%", marginVertical: 10 }}
          inverted
          ItemSeparatorComponent={() => <View style={{ height: 4 }} />}
          data={messages}
          keyExtractor={(message) => message?.id + ""}
          renderItem={({ item }) => item && renderItem(item)}
        />
        <InputContainer>
          <TextInput
            placeholderTextColor="rgba(255, 255, 255, 0.6)"
            placeholder="Write a message..."
            returnKeyLabel="Send Message"
            returnKeyType="send"
            onChangeText={(text) => setValue("message", text)}
            onSubmitEditing={handleSubmit(onValid)}
            value={watch("message")}
          />
          <SendButton disabled={Boolean(watch("message"))}>
            <Ionicons
              name="send"
              size={22}
              color={
                Boolean(watch("message")) ? "white" : "rgba(255, 255, 255, 0.5)"
              }
            />
          </SendButton>
        </InputContainer>
      </ScreenLayout>
    </KeyboardAvoidingView>
  );
};
