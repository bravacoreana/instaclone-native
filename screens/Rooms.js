import React from "react";
import { gql, useQuery } from "@apollo/client";
import { FlatList, View } from "react-native";
import { ROOM_FRAGMENT } from "../fragments";
import ScreenLayout from "../components/ScreenLayout";
import RoomsItem from "../components/rooms/RoomsItem";

const SEE_ROOMS_QUERY = gql`
  query seeRooms {
    seeRooms {
      ...RoomFragment
    }
  }
  ${ROOM_FRAGMENT}
`;

export default function Rooms() {
  const { data, loading } = useQuery(SEE_ROOMS_QUERY);
  const renderItem = ({ item: room }) => <RoomsItem {...room} />;

  return (
    <ScreenLayout loading={loading}>
      <FlatList
        ItemSeparatorComponent={() => (
          <View
            style={{
              width: "100%",
              height: 0.5,
              backgroundColor: "rgba(255,255,255,0.2)",
            }}
          ></View>
        )}
        style={{ width: "100%" }}
        data={data?.seeRooms}
        keyExtractor={(room) => "" + room.id}
        renderItem={renderItem}
      />
    </ScreenLayout>
  );
}
