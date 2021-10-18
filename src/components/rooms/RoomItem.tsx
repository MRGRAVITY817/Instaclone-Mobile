import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { CompositeNavigationProp, useNavigation } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { useWindowDimensions } from "react-native";
import styled from "styled-components/native";
import { colors } from "../../colors";
import { useMe } from "../../hooks/useMe";
import { MessagesNavParamList } from "../../navigators/MessagesNav";
import { RootTabParamList } from "../../navigators/TabNav";
import { SeeRooms_seeRooms } from "../../__generated__/SeeRooms";

const RoomContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 15px 10px;
`;
const Column = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const Data = styled.View``;
const Avatar = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  margin-right: 20px;
`;
const UnreadDot = styled.View`
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: ${colors.blue};
`;
const Username = styled.Text`
  color: white;
  font-weight: 600;
  font-size: 16px;
`;
const UnreadText = styled.Text`
  color: white;
  font-weight: 500;
  margin-top: 2px;
`;

interface RoomItemProps {
  room: SeeRooms_seeRooms;
}

type RoomNavProps = CompositeNavigationProp<
  BottomTabNavigationProp<RootTabParamList, "FeedRoot">,
  StackNavigationProp<MessagesNavParamList>
>;

export const RoomItem: React.FC<RoomItemProps> = ({ room }) => {
  const { data: meData } = useMe();
  const { width } = useWindowDimensions();
  const navigation = useNavigation<RoomNavProps>();
  const goToRoom = () =>
    navigation.navigate("Room", {
      id: room.id,
      talkingTo:
        room.users?.filter((user) => user?.username !== meData?.me?.username)[0]
          ?.username + "",
    });

  const notMe = room?.users?.find(
    (user) => user?.username !== meData?.me?.username
  );

  return (
    <RoomContainer style={{ width }} onPress={goToRoom}>
      <Column>
        <Avatar source={{ uri: notMe?.avatar + "" }} />
        <Data>
          <Username>{notMe?.username}</Username>
          <UnreadText>
            {room.unreadTotal} unread{" "}
            {room.unreadTotal <= 1 ? "message" : "messages"}
          </UnreadText>
        </Data>
      </Column>
      <Column>{room.unreadTotal > 0 ? <UnreadDot /> : null}</Column>
    </RoomContainer>
  );
};
