import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { TabNav } from "./TabNav";
import { UploadNav } from "./UploadNav";
import { UploadPhoto } from "../screens/UploadPhoto";
import { Ionicons } from "@expo/vector-icons";

export type LoggedInStackScreens = {
  Tabs: undefined;
  Upload: undefined;
  UploadPhoto: { file: string };
};

const Stack = createStackNavigator<LoggedInStackScreens>();

export const LoggedInNav = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        presentation: "modal",
      }}
    >
      <Stack.Screen
        name="Tabs"
        options={{ headerShown: false }}
        component={TabNav}
      />
      <Stack.Screen
        name="Upload"
        options={{ headerShown: false }}
        component={UploadNav}
      />
      <Stack.Screen
        name="UploadPhoto"
        options={{
          title: "Upload Photo",
          headerBackTitleVisible: false,
          headerBackImage: ({ tintColor }) => (
            <Ionicons color={tintColor} name="close" size={28} />
          ),
          headerTintColor: "white",
          headerStyle: {
            backgroundColor: "black",
          },
        }}
        component={UploadPhoto}
      />
    </Stack.Navigator>
  );
};
