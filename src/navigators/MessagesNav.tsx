import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Room } from "../screens/Room";
import { Rooms } from "../screens/Rooms";
import { Ionicons } from "@expo/vector-icons";

const Stack = createStackNavigator();

export const MessagesNav = () => (
  <Stack.Navigator>
    <Stack.Screen
      options={{
        headerTintColor: "white",
        headerBackTitleVisible: false,
        headerStyle: {
          backgroundColor: "black",
        },
        headerBackImage: ({ tintColor }) => (
          <Ionicons color={tintColor} name="chevron-down" size={28} />
        ),
      }}
      name="Rooms"
      component={Rooms}
    />
    <Stack.Screen name="Room" component={Room} />
  </Stack.Navigator>
);
