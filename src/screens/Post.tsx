import React, { useEffect } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { LoggedInStackScreens } from "../navigators/LoggedInNav";
import styled from "styled-components/native";
import { colors } from "../colors";
import { useForm } from "react-hook-form";
import { StackScreenProps } from "@react-navigation/stack";
import { DismissKeyboard } from "../components/DismissKeyboard";

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

interface PostFormParams {
  caption: string;
}

type PostProps = StackScreenProps<LoggedInStackScreens, "Post">;

export const Post: React.FC<PostProps> = ({ route, navigation }) => {
  const HeaderRight = () => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("Post", {
          file: "",
        })
      }
    >
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

  const { register, handleSubmit, setValue } = useForm<PostFormParams>();

  console.log(route.params.file);

  useEffect(() => {
    register("caption");
  }, [register]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: HeaderRightLoading,
      headerLeft: () => null,
    });
  }, []);

  const onValid = ({ caption }: PostFormParams) => {
    // upload photo & caption to backend
  };

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
