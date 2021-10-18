import React from "react";
import { FlatList, View } from "react-native";
import { gql, useQuery } from "@apollo/client";
import { ROOM_FRAGMENT } from "../hooks/fragments";
import { SeeRooms, SeeRooms_seeRooms } from "../__generated__/SeeRooms";
import { ScreenLayout } from "../components/ScreenLayout";
import { RoomItem } from "../components/rooms/RoomItem";

const SEE_ROOMS_QUERY = gql`
  query SeeRooms {
    seeRooms {
      ...RoomParts
    }
  }
  ${ROOM_FRAGMENT}
`;

export const Rooms = () => {
  const { data, loading } = useQuery<SeeRooms>(SEE_ROOMS_QUERY);

  const renderItem = (room: SeeRooms_seeRooms | null) => {
    if (room) {
      return <RoomItem room={room} />;
    }
    return null;
  };

  return (
    <ScreenLayout loading={loading}>
      <FlatList
        ItemSeparatorComponent={() => (
          <View
            style={{
              width: `100%`,
              height: 1,
              backgroundColor: `rgba(255, 255, 255, 0.2)`,
            }}
          />
        )}
        data={data?.seeRooms}
        keyExtractor={(item) => "" + item?.id}
        renderItem={({ item }) => renderItem(item)}
      />
    </ScreenLayout>
  );
};
