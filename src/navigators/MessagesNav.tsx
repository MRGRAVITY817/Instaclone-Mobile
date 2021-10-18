import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Room } from "../screens/Room";
import { Rooms } from "../screens/Rooms";
import { Ionicons } from "@expo/vector-icons";

export type MessagesNavParamList = {
  Rooms: undefined;
  Room: { id: number; talkingTo: string };
};

const Stack = createStackNavigator<MessagesNavParamList>();

export const MessagesNav = () => (
  <Stack.Navigator
    screenOptions={{
      headerTintColor: "white",
      headerBackTitleVisible: false,
      headerStyle: {
        backgroundColor: "black",
      },
    }}
  >
    <Stack.Screen
      name="Rooms"
      component={Rooms}
      options={{
        headerBackImage: ({ tintColor }) => (
          <Ionicons color={tintColor} name="chevron-down" size={30} />
        ),
      }}
    />
    <Stack.Screen name="Room" component={Room} />
  </Stack.Navigator>
);
