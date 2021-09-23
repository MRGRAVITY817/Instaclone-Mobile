import { Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { StackNavFactoryParamList } from "../navigators/SharedStackNav";
import { StackScreenProps } from "@react-navigation/stack";

type SearchProps = StackScreenProps<StackNavFactoryParamList, "Search">;

export const Search: React.FC<SearchProps> = ({ navigation }) => {
  return (
    <View
      style={{
        backgroundColor: "black",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <TouchableOpacity onPress={() => navigation.navigate("Photo")}>
        <Text style={{ color: "white" }}>Search</Text>
      </TouchableOpacity>
    </View>
  );
};
