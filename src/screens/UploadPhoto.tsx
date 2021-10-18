import React, { useEffect } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { LoggedInStackScreens } from "../navigators/LoggedInNav";
import styled from "styled-components/native";
import { colors } from "../colors";
import { useForm } from "react-hook-form";
import { StackScreenProps } from "@react-navigation/stack";
import { DismissKeyboard } from "../components/DismissKeyboard";
import { gql, useMutation } from "@apollo/client";
import { FEED_PHOTO } from "../hooks/fragments";
import { ReactNativeFile } from "apollo-upload-client";

const UPLOAD_PHOTO_MUTATION = gql`
  mutation UploadPhoto($file: Upload!, $caption: String) {
    uploadPhoto(file: $file, caption: $caption) {
      ...FeedPhoto
    }
  }
  ${FEED_PHOTO}
`;

const Container = styled.View`
  flex: 1;
  background-color: black;
  padding: 0px 50px;
`;

const Photo = styled.Image`
  height: 350px;
`;

const CaptionContainer = styled.View`
  margin-top: 30px;
`;

const Caption = styled.TextInput`
  background-color: white;
  color: black;
  padding: 10px 20px;
  border-radius: 100px;
`;

const HeaderRightText = styled.Text`
  color: ${colors.blue};
  font-size: 16px;
  font-weight: 600;
  margin-right: 7px;
`;

interface UploadPhotoFormParams {
  caption: string;
}

type UploadPhotoProps = StackScreenProps<LoggedInStackScreens, "UploadPhoto">;

export const UploadPhoto: React.FC<UploadPhotoProps> = ({
  route,
  navigation,
}) => {
  const [uploadPhotoMutation, { loading, error }] = useMutation(
    UPLOAD_PHOTO_MUTATION,
    {
      update: (cache, result) => {
        const {
          data: { uploadPhoto },
        } = result;
        if (uploadPhoto.id) {
          cache.modify({
            id: "ROOT_QUERY",
            fields: {
              seeFeed(prev) {
                return [uploadPhoto, ...prev];
              },
            },
          });
          navigation.navigate("Tabs");
        }
      },
    }
  );

  const HeaderRight = () => (
    <TouchableOpacity onPress={handleSubmit(onValid)}>
      <HeaderRightText>Next</HeaderRightText>
    </TouchableOpacity>
  );

  const HeaderRightLoading = () => (
    <ActivityIndicator
      size="small"
      color={colors.blue}
      style={{ marginRight: 10 }}
    />
  );

  const { register, handleSubmit, setValue } = useForm<UploadPhotoFormParams>();

  useEffect(() => {
    register("caption");
  }, [register]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: loading ? HeaderRightLoading : HeaderRight,
      ...(loading && { headerLeft: () => null }),
    });
  }, []);

  const onValid = ({ caption }: UploadPhotoFormParams) => {
    const file = new ReactNativeFile({
      uri: route.params.file,
      name: `1.jpg`,
      type: "image/jpeg",
    });
    uploadPhotoMutation({
      variables: {
        caption,
        file,
      },
    });
  };

  console.log(error);

  return (
    <DismissKeyboard>
      <Container>
        <Photo resizeMode="contain" source={{ uri: route.params.file }} />
        <CaptionContainer>
          <Caption
            returnKeyType="done"
            placeholder="Write a caption ..."
            placeholderTextColor="rgba(0, 0, 0, 0.5)"
            onChangeText={(text) => setValue("caption", text)}
            onSubmitEditing={handleSubmit(onValid)}
          />
        </CaptionContainer>
      </Container>
    </DismissKeyboard>
  );
};
