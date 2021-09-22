import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feed } from "../screens/Feed";
import React from "react";
import { Search } from "../screens/Search";
import { Notifications } from "../screens/Notifications";
import { Profile } from "../screens/Profile";
import { Ionicons } from "@expo/vector-icons";

export type RootTabParamList = {
  Feed: undefined;
  Search: undefined;
  Notifications: undefined;
  Profile: undefined;
};

const Tabs = createBottomTabNavigator<RootTabParamList>();

export const LoggedInNav = () => {
  return (
    <Tabs.Navigator
      screenOptions={{
        tabBarActiveTintColor: "white",
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "black",
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="Feed"
        component={Feed}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name="home" color={color} size={focused ? 26 : 22} />
          ),
        }}
      />
      <Tabs.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name="search" color={color} size={focused ? 26 : 22} />
          ),
        }}
      />
      <Tabs.Screen
        name="Notifications"
        component={Notifications}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name="heart" color={color} size={focused ? 26 : 22} />
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name="person" color={color} size={focused ? 26 : 22} />
          ),
        }}
      />
    </Tabs.Navigator>
  );
};
