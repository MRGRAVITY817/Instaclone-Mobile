import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { TabNav } from "./TabNav";
import { UploadNav } from "./UploadNav";

type LoggedInStackScreens = {
  Tabs: undefined;
  Upload: undefined;
};

const Stack = createStackNavigator<LoggedInStackScreens>();

export const LoggedInNav = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        presentation: "modal",
      }}
    >
      <Stack.Screen name="Tabs" component={TabNav} />
      <Stack.Screen name="Upload" component={UploadNav} />
    </Stack.Navigator>
  );
};
