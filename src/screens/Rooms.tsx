import React from "react";
import { FlatList, Text, View } from "react-native";
import { gql, useQuery } from "@apollo/client";
import { ROOM_FRAGMENT } from "../hooks/fragments";
import styled from "styled-components/native";
import { SeeRooms, SeeRooms_seeRooms } from "../__generated__/SeeRooms";
import { ScreenLayout } from "../components/ScreenLayout";

const SEE_ROOMS_QUERY = gql`
  query SeeRooms {
    seeRooms {
      ...RoomParts
    }
  }
  ${ROOM_FRAGMENT}
`;

const RoomContainer = styled.View`
  background-color: black;
`;

const RoomText = styled.Text`
  color: white;
`;

export const Rooms = () => {
  const { data, loading } = useQuery<SeeRooms>(SEE_ROOMS_QUERY);
  const renderItem = (room: SeeRooms_seeRooms | null) =>
    room && (
      <RoomContainer>
        <RoomText>
          {room.unreadTotal === 0
            ? "Name of the other person"
            : `${room.unreadTotal} messages.`}
        </RoomText>
      </RoomContainer>
    );

  return (
    <ScreenLayout loading={loading}>
      <FlatList
        data={data?.seeRooms}
        keyExtractor={(item) => "" + item?.id}
        renderItem={({ item }) => renderItem(item)}
      />
    </ScreenLayout>
  );
};
