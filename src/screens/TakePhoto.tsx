import { Camera } from "expo-camera";
import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";

const Container = styled.View`
  flex: 1;
  background-color: black;
`;

const Actions = styled.View`
  flex: 0.35;
  justify-content: space-around;
  align-items: center;
  padding: 0px 50px;
`;

const ButtonsContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const TakePhotoBtn = styled.TouchableOpacity`
  width: 100px;
  height: 100px;
  background-color: rgba(255, 255, 255, 0.5);
  border: 2px solid rgba(255, 255, 255, 0.8);
  border-radius: 50px;
`;

const SliderContainer = styled.View``;

export const TakePhoto = () => {
  const [ok, setOk] = useState<boolean>(false);
  const [flashMode, setFlashMode] = useState<"off" | "on">(
    Camera.Constants.FlashMode.off
  );
  const [zoom, setZoom] = useState<number>(0);
  const [cameraType, setCameraType] = useState<"back" | "front">(
    Camera.Constants.Type.back
  );
  const getPermissions = async () => {
    const { granted } = await Camera.requestPermissionsAsync();
    setOk(granted);
  };

  const onCameraSwitch = () => {
    if (cameraType === Camera.Constants.Type.front) {
      setCameraType(Camera.Constants.Type.back);
    } else {
      setCameraType(Camera.Constants.Type.front);
    }
  };

  useEffect(() => {
    getPermissions();
  }, []);

  const onZoomValueChange = (e: number) => {
    setZoom(e);
  };
  return (
    <Container>
      <Camera type={cameraType} style={{ flex: 1 }} zoom={zoom} />
      <Actions>
        <SliderContainer>
          <Slider
            style={{ width: 200, height: 40 }}
            minimumValue={0}
            maximumValue={1}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#rgba(255, 255, 255, 0.5)"
            onValueChange={(e) => onZoomValueChange(e)}
          />
        </SliderContainer>
        <ButtonsContainer>
          <TakePhotoBtn />
          <TouchableOpacity onPress={() => onCameraSwitch()}>
            <Ionicons
              name={
                cameraType === Camera.Constants.Type.front
                  ? "camera-reverse"
                  : "camera"
              }
              color="white"
              size={30}
            />
          </TouchableOpacity>
        </ButtonsContainer>
      </Actions>
    </Container>
  );
};
