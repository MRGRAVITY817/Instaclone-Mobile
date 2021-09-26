import { Text, TouchableOpacity, View } from "react-native";
import React, { useEffect } from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { SharedStackNavParamList } from "../navigators/SharedStackNav";
import styled from "styled-components/native";
import { useForm } from "react-hook-form";
import { TextInput } from "react-native-gesture-handler";
import { DismissKeyboard } from "../components/DismissKeyboard";

const SearchInput = styled.TextInput``;

interface SearchInputFields {
  keyword: string;
}

type SearchProps = StackScreenProps<SharedStackNavParamList, "Search">;

export const Search: React.FC<SearchProps> = ({ navigation }) => {
  const { setValue, register } = useForm<SearchInputFields>();

  const SearchBox = () => (
    <TextInput
      style={{ backgroundColor: "white" }}
      placeholderTextColor="black"
      placeholder="Search photos"
      autoCapitalize="none"
      returnKeyLabel="Search"
      returnKeyType="search"
      autoCorrect={false}
      onChangeText={(text) => setValue("keyword", text)}
    />
  );

  useEffect(() => {
    navigation.setOptions({
      headerTitle: SearchBox,
    });
    register("keyword");
  }, []);

  return (
    <DismissKeyboard>
      <View
        style={{
          backgroundColor: "black",
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TouchableOpacity onPress={() => navigation.navigate("Photo")}>
          <Text style={{ color: "white" }}>Photos</Text>
        </TouchableOpacity>
      </View>
    </DismissKeyboard>
  );
};
