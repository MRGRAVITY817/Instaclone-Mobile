import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { SelectPhoto } from "../screens/SelectPhoto";
import { TakePhoto } from "../screens/TakePhoto";

type UploadTabScreen = {
  Select: undefined;
  Take: undefined;
};

type UploadStackScreen = {
  Select: undefined;
};

const Tab = createMaterialTopTabNavigator<UploadTabScreen>();
const Stack = createStackNavigator<UploadStackScreen>();

export const UploadNav = () => {
  return (
    <Tab.Navigator
      tabBarPosition="bottom"
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "black",
        },
        tabBarActiveTintColor: "white",
        tabBarIndicatorStyle: {
          backgroundColor: "white",
          top: 0,
        },
      }}
    >
      <Tab.Screen name="Select">
        {() => (
          <Stack.Navigator>
            <Stack.Screen name="Select" component={SelectPhoto} />
          </Stack.Navigator>
        )}
      </Tab.Screen>
      <Tab.Screen name="Take" component={TakePhoto} />
    </Tab.Navigator>
  );
};
