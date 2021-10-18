import { StackScreenProps } from "@react-navigation/stack";
import React, { useEffect } from "react";
import { Text, View } from "react-native";
import { MessagesNavParamList } from "../navigators/MessagesNav";
import { gql, useQuery } from "@apollo/client";
import { SeeRooms } from "../__generated__/SeeRooms";

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

type RoomProps = StackScreenProps<MessagesNavParamList, "Room">;

export const Room: React.FC<RoomProps> = ({ navigation, route }) => {
  const { data } = useQuery<SeeRooms>(ROOM_QUERY, {
    variables: { id: route.params.id },
  });
  useEffect(() => {
    navigation.setOptions({
      title: `${route.params.talkingTo}`,
    });
  });
  return (
    <View>
      <Text>Message List</Text>
    </View>
  );
};
