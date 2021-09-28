import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { SharedStackNav } from "./SharedStackNav";
import { useMe } from "../hooks/useMe";
import { Image, View } from "react-native";

export type RootTabParamList = {
  FeedRoot: undefined;
  SearchRoot: undefined;
  PhotoRoot: undefined;
  NotificationsRoot: undefined;
  MeRoot: undefined;
};

const Tabs = createBottomTabNavigator<RootTabParamList>();

export const TabNav = () => {
  const { data } = useMe();
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
        name="FeedRoot"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              color={color}
              size={22}
            />
          ),
        }}
      >
        {() => <SharedStackNav screenName="Feed" />}
      </Tabs.Screen>
      <Tabs.Screen
        name="SearchRoot"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "search" : "search-outline"}
              color={color}
              size={22}
            />
          ),
        }}
      >
        {() => <SharedStackNav screenName="Search" />}
      </Tabs.Screen>
      <Tabs.Screen
        name="PhotoRoot"
        component={View}
        listeners={({ navigation }) => {
          return {
            tabPress: (e) => {
              e.preventDefault();
              navigation.navigate("Upload");
            },
          };
        }}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "camera" : "camera-outline"}
              color={color}
              size={22}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="NotificationsRoot"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "heart" : "heart-outline"}
              color={color}
              size={22}
            />
          ),
        }}
      >
        {() => <SharedStackNav screenName="Notifications" />}
      </Tabs.Screen>
      <Tabs.Screen
        name="MeRoot"
        options={{
          tabBarIcon: ({ focused, color, size }) =>
            data?.me?.avatar ? (
              <Image
                source={{ uri: data.me.avatar }}
                style={{
                  height: 25,
                  width: 25,
                  borderRadius: 12.5,
                  ...(focused && {
                    borderColor: "rgba(255, 255, 255, 0.3)",
                    borderWidth: 2,
                  }),
                }}
              />
            ) : (
              <Ionicons
                name={focused ? "person" : "person-outline"}
                color={color}
                size={22}
              />
            ),
        }}
      >
        {() => <SharedStackNav screenName="Me" />}
      </Tabs.Screen>
    </Tabs.Navigator>
  );
};
