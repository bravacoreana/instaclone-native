import { Camera } from "expo-camera";
import React, { useState, useEffect, useRef } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Alert, Image, Text, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import Slider from "@react-native-community/slider";
import { StatusBar } from "expo-status-bar";
import * as MediaLibrary from "expo-media-library";

const Container = styled.View`
  flex: 1;
  background-color: black;
`;

const Actions = styled.View`
  flex: 0.2;
  padding: 0px 50px;
  align-items: center;
  justify-content: space-around;
`;

const ButtonsContainer = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

const TakePhotoBtn = styled.TouchableOpacity`
  width: 100px;
  height: 100px;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 50px;
  border: 1px solid white;
`;

const CloseBtn = styled.TouchableOpacity`
  position: absolute;
  top: 15px;
  left: 15px;
`;

const PhotoAction = styled.TouchableOpacity`
  background-color: white;
  padding: 5px 10px;
`;
const PhotoActionText = styled.Text`
  font-weight: 600;
`;

const SliderContainer = styled.View``;

const PostActions = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: space-around;
  margin: 50px 0;
`;

export default function TakePhoto({ navigation }) {
  const camera = useRef();
  const [takenPhoto, setTakenPhoto] = useState("");
  const [cameraReady, setCameraReady] = useState(false);
  const [ok, setOk] = useState(false);
  const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off);
  const [zoom, setZoom] = useState(0);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.front);

  const getPermissions = async () => {
    const { granted } = await Camera.requestPermissionsAsync();
    setOk(granted); // granted is boolean
  };

  const onCameraReady = () => setCameraReady(true);

  const takePhoto = async () => {
    if (camera.current && cameraReady) {
      // takePhoto: it's still in cache
      const photo = await camera.current.takePictureAsync({
        quality: 1,
        exif: true,
      });
      const { uri } = photo;
      setTakenPhoto(uri);
      // save it on user's phone
      // saveToLibraryAsync(uri) : 어떤 객체도 반환하지 않음
      // createAssetAsync(uri) : asset 객체 반환
      // const asset = await MediaLibrary.createAssetAsync(uri);
    }
  };

  useEffect(() => {
    getPermissions();
  }, []);

  const onCameraSwitch = () => {
    cameraType === Camera.Constants.Type.front
      ? setCameraType(Camera.Constants.Type.back)
      : setCameraType(Camera.Constants.Type.front);
  };

  const onZoomValueChange = (e) => {
    setZoom(e);
  };

  const onFlashChanged = () => {
    if (flashMode === Camera.Constants.FlashMode.off) {
      setFlashMode(Camera.Constants.FlashMode.on);
    } else if (flashMode === Camera.Constants.FlashMode.on) {
      setFlashMode(Camera.Constants.FlashMode.auto);
    } else if (flashMode === Camera.Constants.FlashMode.auto) {
      setFlashMode(Camera.Constants.FlashMode.off);
    }
  };
  const goToUpload = async (save) => {
    if (save) {
      await MediaLibrary.saveToLibraryAsync(takenPhoto);
    }
    console.log("will upload taken photo", takenPhoto);
  };

  const onUpload = () => {
    Alert.alert("Save Photo?", "Save Photo & Upload or just Upload", [
      {
        text: "Save & Upload",
        onPress: () => goToUpload(true),
      },
      {
        text: "Upload Only",
        onPress: () => goToUpload(false),
      },
      {
        text: "Retake",
        style: "destructive",
        onPress: () => onDismiss(),
      },
    ]);
  };
  const onDismiss = () => setTakenPhoto("");

  return (
    <Container>
      <StatusBar hidden={true} />
      {takenPhoto === "" ? (
        <Camera
          type={cameraType}
          style={{ flex: 1 }}
          zoom={zoom}
          flashMode={flashMode}
          ref={camera}
          onCameraReady={onCameraReady}
        >
          <CloseBtn onPress={() => navigation.navigate("Tabs")}>
            <Ionicons name="close" color="white" size={30} />
          </CloseBtn>
        </Camera>
      ) : (
        <Image source={{ uri: takenPhoto }} style={{ flex: 1 }} />
      )}
      {takenPhoto === "" ? (
        <Actions>
          <SliderContainer>
            <Slider
              style={{ width: 200, height: 40 }}
              minimumValue={0}
              maximumValue={0.5}
              minimumTrackTintColor="#fff"
              maximumTrackTintColor="rgba(255,255,255,0.5)"
              onValueChange={onZoomValueChange}
            />
          </SliderContainer>
          <ButtonsContainer>
            <TouchableOpacity onPress={onFlashChanged}>
              <Ionicons
                size={36}
                color="white"
                name={
                  flashMode === Camera.Constants.FlashMode.off
                    ? "flash-off"
                    : flashMode === Camera.Constants.FlashMode.on
                    ? "flash"
                    : flashMode === Camera.Constants.FlashMode.auto
                    ? "eye"
                    : ""
                }
              />
            </TouchableOpacity>
            <TakePhotoBtn onPress={takePhoto} />
            <TouchableOpacity onPress={onCameraSwitch}>
              <Ionicons size={36} color="white" name="camera-reverse" />
            </TouchableOpacity>
          </ButtonsContainer>
        </Actions>
      ) : (
        <PostActions>
          <PhotoAction onPress={onDismiss}>
            <PhotoActionText>Retake</PhotoActionText>
          </PhotoAction>
          <PhotoAction onPress={onUpload}>
            <PhotoActionText>Upload</PhotoActionText>
          </PhotoAction>
        </PostActions>
      )}
    </Container>
  );
}
