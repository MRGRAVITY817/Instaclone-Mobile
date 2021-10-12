import { Camera } from "expo-camera";
import React, { LegacyRef, useEffect, useRef, useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { StatusBar } from "expo-status-bar";
import { StackScreenProps } from "@react-navigation/stack";
import { UploadStackScreen } from "../navigators/UploadNav";

const CloseButton = styled.TouchableOpacity`
  position: absolute;
  top: 50px;
  left: 20px;
`;

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

type SelectPhotoProps = StackScreenProps<UploadStackScreen, "Select">;

export const TakePhoto: React.FC<SelectPhotoProps> = ({ navigation }) => {
  const camera = useRef<Camera>();
  const [ok, setOk] = useState<boolean>(false);
  const [cameraReady, setCameraReady] = useState<boolean>(false);
  const [flashMode, setFlashMode] = useState<"off" | "on" | "auto">(
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

  const onFlashChange = () => {
    if (flashMode === Camera.Constants.FlashMode.off) {
      setFlashMode(Camera.Constants.FlashMode.on);
    } else if (flashMode === Camera.Constants.FlashMode.on) {
      setFlashMode(Camera.Constants.FlashMode.auto);
    } else if (flashMode === Camera.Constants.FlashMode.auto) {
      setFlashMode(Camera.Constants.FlashMode.off);
    }
  };

  const onCameraReady = () => setCameraReady(true);

  const takePhoto = async () => {
    if (camera.current && cameraReady) {
      const photo = await camera.current.takePictureAsync({
        quality: 1,
        exif: true,
      });
    }
  };

  return (
    <Container>
      <StatusBar hidden={true} />
      <Camera
        type={cameraType}
        style={{ flex: 1 }}
        zoom={zoom}
        flashMode={flashMode}
        ref={camera as LegacyRef<Camera>}
        onCameraReady={onCameraReady}
      >
        <CloseButton onPress={() => navigation.navigate("Select")}>
          <Ionicons name="close" size={30} color="white" />
        </CloseButton>
      </Camera>
      <Actions>
        <SliderContainer>
          <Slider
            style={{ width: 200, height: 40 }}
            minimumValue={0}
            maximumValue={1}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#rgba(255, 255, 255, 0.5)"
            onValueChange={onZoomValueChange}
          />
        </SliderContainer>
        <ButtonsContainer>
          <TakePhotoBtn onPress={takePhoto} />
          <TouchableOpacity onPress={onFlashChange}>
            <Ionicons
              name={
                flashMode === Camera.Constants.FlashMode.off
                  ? "flash-off"
                  : flashMode === Camera.Constants.FlashMode.on
                  ? "flash"
                  : flashMode === Camera.Constants.FlashMode.auto
                  ? "eye"
                  : "eye-off"
              }
              color="white"
              size={30}
            />
          </TouchableOpacity>
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
