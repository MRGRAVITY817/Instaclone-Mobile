import React, { useEffect, useState } from "react";
import { FlatList, Image, useWindowDimensions } from "react-native";
import styled from "styled-components/native";
import * as MediaLibrary from "expo-media-library";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import { StackScreenProps } from "@react-navigation/stack";
import { UploadStackScreen } from "../navigators/UploadNav";
import { LoggedInStackScreens } from "../navigators/LoggedInNav";

const Container = styled.View`
  flex: 1;
  background-color: black;
`;

const Top = styled.View`
  flex: 1;
  background-color: black;
`;

const Bottom = styled.View`
  flex: 1;
  background-color: black;
`;

const ImageContainer = styled.TouchableOpacity``;
const IconContainer = styled.View`
  position: absolute;
  bottom: 5px;
  right: 0px;
`;

const HeaderRightText = styled.Text`
  color: ${colors.blue};
  font-size: 16px;
  font-weight: 600;
  margin-right: 7px;
`;

type SelectPhotoProps = StackScreenProps<LoggedInStackScreens, "Upload">;

export const SelectPhoto: React.FC<SelectPhotoProps> = ({ navigation }) => {
  const [ok, setOk] = useState<boolean>(false);
  const [photos, setPhotos] = useState<MediaLibrary.Asset[]>([]);
  const [chosenPhoto, setChosenPhoto] = useState<string>("");

  const getPhotos = async () => {
    const { assets: photos } = await MediaLibrary.getAssetsAsync();
    setPhotos(photos);
    setChosenPhoto(photos[0]?.uri);
  };

  const HeaderRight = () => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("Post", {
          file: chosenPhoto,
        })
      }
    >
      <HeaderRightText>Next</HeaderRightText>
    </TouchableOpacity>
  );

  const getPermissions = async () => {
    const { accessPrivileges, canAskAgain } =
      await MediaLibrary.getPermissionsAsync();
    if (accessPrivileges === "none" && canAskAgain) {
      const { accessPrivileges } = await MediaLibrary.requestPermissionsAsync();
      if (accessPrivileges !== "none") {
        setOk(true);
        getPhotos();
      }
    } else if (accessPrivileges !== "none") {
      setOk(true);
      getPhotos();
    }
  };

  const numColumns = 4;
  const { width } = useWindowDimensions();

  const renderItem = (photoUri: string) => {
    return (
      <ImageContainer onPress={() => setChosenPhoto(photoUri)}>
        <Image
          source={{ uri: photoUri }}
          style={{ width: width / numColumns, height: 100 }}
        />
        <IconContainer>
          <Ionicons
            name="checkmark-circle"
            size={18}
            color={photoUri === chosenPhoto ? colors.blue : "white"}
          />
        </IconContainer>
      </ImageContainer>
    );
  };

  useEffect(() => {
    getPermissions();
    console.log("I am working!");
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerRight: HeaderRight,
    });
  }, []);

  return (
    <Container>
      <Top>
        {chosenPhoto !== "" ? (
          <Image
            source={{ uri: chosenPhoto }}
            style={{ width, height: "100%" }}
          />
        ) : null}
      </Top>
      <Bottom>
        <FlatList
          data={photos as MediaLibrary.Asset[]}
          numColumns={numColumns}
          keyExtractor={(photo) => photo.id}
          renderItem={({ item }) => renderItem(item.uri)}
        />
      </Bottom>
    </Container>
  );
};
