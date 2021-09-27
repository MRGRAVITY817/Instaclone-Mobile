import { ActivityIndicator, Platform, View } from "react-native";
import React, { useEffect } from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { SharedStackNavParamList } from "../navigators/SharedStackNav";
import styled from "styled-components/native";
import { useForm } from "react-hook-form";
import { TextInput } from "react-native-gesture-handler";
import { DismissKeyboard } from "../components/DismissKeyboard";
import { gql, useLazyQuery } from "@apollo/client";
import {
  SearchPhotos,
  SearchPhotosVariables,
} from "../__generated__/SearchPhotos";

const SEARCH_PHOTOS = gql`
  query SearchPhotos($keyword: String!) {
    searchPhotos(keyword: $keyword) {
      id
      file
    }
  }
`;

const MessageContainer = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;
const SearchingText = styled.Text`
  color: white;
  font-weight: 600;
  margin-top: 15px;
`;
const SearchInput = styled.TextInput``;

interface SearchInputFields {
  keyword: string;
}

type SearchProps = StackScreenProps<SharedStackNavParamList, "Search">;

export const Search: React.FC<SearchProps> = ({ navigation }) => {
  const { setValue, register, handleSubmit } = useForm<SearchInputFields>();
  const [searchPhotoQuery, { loading, data, called }] = useLazyQuery<
    SearchPhotos,
    SearchPhotosVariables
  >(SEARCH_PHOTOS);

  const onValid = ({ keyword }: SearchInputFields) => {
    console.log(keyword);
    searchPhotoQuery({
      variables: {
        keyword: `#${keyword}`,
      },
    });
  };

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
      onSubmitEditing={handleSubmit(onValid)}
    />
  );

  useEffect(() => {
    navigation.setOptions({
      headerTitle: SearchBox,
    });
    register("keyword", {
      required: true,
      minLength: 3,
    });
  }, []);

  return (
    <DismissKeyboard>
      <View style={{ backgroundColor: "black", flex: 1 }}>
        {loading ? (
          <MessageContainer>
            <ActivityIndicator size="large" />
            <SearchingText>Searching ...</SearchingText>
          </MessageContainer>
        ) : null}
        {!called ? (
          <MessageContainer>
            <SearchingText>Searching by keyword</SearchingText>
          </MessageContainer>
        ) : null}
        {data?.searchPhotos !== undefined && data.searchPhotos?.length === 0 ? (
          <MessageContainer>
            <SearchingText>Could not find anything</SearchingText>
          </MessageContainer>
        ) : null}
      </View>
    </DismissKeyboard>
  );
};
