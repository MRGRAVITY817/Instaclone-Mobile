import React, { useEffect, useState } from "react";
import { FlatList, Image, Text, useWindowDimensions, View } from "react-native";
import styled from "styled-components/native";
import * as MediaLibrary from "expo-media-library";
import { Ionicons } from "@expo/vector-icons";

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

export const SelectPhoto = () => {
  const [ok, setOk] = useState<boolean>(false);
  const [photos, setPhotos] = useState<MediaLibrary.Asset[]>([]);
  const [chosenPhoto, setChosenPhoto] = useState<string>("");

  const getPhotos = async () => {
    if (ok) {
      const { assets: photos } = await MediaLibrary.getAssetsAsync();
      setPhotos(photos);
      setChosenPhoto(photos[0]?.uri);
    }
  };

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
          <Ionicons name="checkmark-circle" size={18} color="white" />
        </IconContainer>
      </ImageContainer>
    );
  };

  useEffect(() => {
    getPermissions();
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
