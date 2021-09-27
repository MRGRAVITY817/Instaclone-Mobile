import {
  ActivityIndicator,
  FlatList,
  Image,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { SharedStackNavParamList } from "../navigators/SharedStackNav";
import styled from "styled-components/native";
import { useForm } from "react-hook-form";
import { DismissKeyboard } from "../components/DismissKeyboard";
import { gql, useLazyQuery } from "@apollo/client";
import {
  SearchPhotos,
  SearchPhotosVariables,
  SearchPhotos_searchPhotos,
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
const MessageText = styled.Text`
  color: white;
  font-weight: 600;
  margin-top: 15px;
`;
const SearchInput = styled.TextInput`
  background-color: rgba(255, 255, 255, 1);
  padding: 5px 10px;
  color: black;
  border-radius: 10px;
  width: 250px;
`;

interface SearchInputFields {
  keyword: string;
}

type SearchProps = StackScreenProps<SharedStackNavParamList, "Search">;

export const Search: React.FC<SearchProps> = ({ navigation }) => {
  const numColumns = 4;
  const { setValue, register, handleSubmit } = useForm<SearchInputFields>();
  const [searchPhotoQuery, { loading, data, called }] = useLazyQuery<
    SearchPhotos,
    SearchPhotosVariables
  >(SEARCH_PHOTOS);

  const onValid = ({ keyword }: SearchInputFields) => {
    searchPhotoQuery({
      variables: {
        keyword: `#${keyword}`,
      },
    });
  };

  const SearchBox = () => (
    <SearchInput
      placeholderTextColor="rgba(0, 0, 0, 0.6)"
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

  const { width } = useWindowDimensions();
  const renderItem = (photo: SearchPhotos_searchPhotos) => (
    <TouchableOpacity>
      <Image
        source={{ uri: photo.file }}
        style={{ width: width / numColumns, height: 100 }}
      />
    </TouchableOpacity>
  );

  console.log(data);

  return (
    <DismissKeyboard>
      <View style={{ backgroundColor: "black", flex: 1 }}>
        {loading ? (
          <MessageContainer>
            <ActivityIndicator size="large" />
            <MessageText>Searching ...</MessageText>
          </MessageContainer>
        ) : null}
        {!called ? (
          <MessageContainer>
            <MessageText>Searching by keyword</MessageText>
          </MessageContainer>
        ) : null}
        {data?.searchPhotos !== undefined ? (
          data.searchPhotos?.length === 0 ? (
            <MessageContainer>
              <MessageText>Could not find anything</MessageText>
            </MessageContainer>
          ) : (
            <FlatList
              numColumns={numColumns}
              data={data.searchPhotos}
              keyExtractor={(photo) => photo?.id + ""}
              renderItem={(data) => renderItem(data.item!)}
            />
          )
        ) : null}
      </View>
    </DismissKeyboard>
  );
};
