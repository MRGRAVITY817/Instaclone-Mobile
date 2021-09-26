import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Feed } from "../screens/Feed";
import { Me } from "../screens/Me";
import { Notifications } from "../screens/Notifications";
import { Photo } from "../screens/Photo";
import { Profile } from "../screens/Profile";
import { Search } from "../screens/Search";
import { Image } from "react-native";
import { Likes } from "../screens/Likes";
import { Comments } from "../screens/Comment";

export type SharedStackNavParamList = {
  Feed: undefined;
  Search: undefined;
  Notifications: undefined;
  Photo: undefined;
  Profile: { username: string; id: number };
  Me: undefined;
  Likes: { photoId: number };
  Comments: undefined;
};

const Stack = createStackNavigator<SharedStackNavParamList>();

interface SharedStackNavProps {
  screenName: string;
}

export const SharedStackNav: React.FC<SharedStackNavProps> = ({
  screenName,
}) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerTintColor: "white",
        headerStyle: {
          shadowColor: "rgba(255,255,255,0.3)",
          backgroundColor: "black",
        },
        headerMode: "screen",
      }}
    >
      {screenName === "Feed" ? (
        <Stack.Screen
          name="Feed"
          component={Feed}
          options={{
            headerTitle: () => (
              <Image
                style={{ height: 80, width: 200 }}
                resizeMode="contain"
                source={require("../../assets/logo.png")}
              />
            ),
          }}
        />
      ) : null}
      {screenName === "Search" ? (
        <Stack.Screen name="Search" component={Search} />
      ) : null}
      {screenName === "Notifications" ? (
        <Stack.Screen name="Notifications" component={Notifications} />
      ) : null}
      {screenName === "Me" ? <Stack.Screen name="Me" component={Me} /> : null}
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Photo" component={Photo} />
      <Stack.Screen name="Likes" component={Likes} />
      <Stack.Screen name="Comments" component={Comments} />
    </Stack.Navigator>
  );
};
