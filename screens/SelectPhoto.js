import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import * as MediaLibrary from "expo-media-library";
import styled from "styled-components/native";
import {
  FlatList,
  Image,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { colors } from "../colors";
import { StatusBar } from "expo-status-bar";

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
  margin-right: 5px;
`;

export default function SelectPhoto({ navigation }) {
  const [ok, setOk] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState("");

  const getPhotos = async () => {
    const { assets: photos } = await MediaLibrary.getAssetsAsync();
    setPhotos(photos);
    setSelectedPhoto(photos[0]?.uri);
  };

  const getPermissions = async () => {
    const permissions = await MediaLibrary.getPermissionsAsync();
    const { accessPrivileges, canAskAgain } = permissions;

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

  useEffect(() => {
    getPermissions();
  }, []);

  const HeaderRight = () => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("UploadPhotoForm", {
          file: selectedPhoto,
        })
      }
    >
      <HeaderRightText>Next</HeaderRightText>
    </TouchableOpacity>
  );
  useEffect(() => {
    navigation.setOptions({
      headerRight: HeaderRight,
    });
  }, [selectedPhoto]);

  const numColumns = 4;
  const { width } = useWindowDimensions();

  const selectPhoto = (uri) => {
    setSelectedPhoto(uri);
  };

  const renderItem = ({ item: photo }) => (
    <ImageContainer onPress={() => selectPhoto(photo.uri)}>
      <Image
        source={{ uri: photo.uri }}
        style={{ width: width / numColumns, height: 100 }}
      />
      <IconContainer>
        <Ionicons
          name="checkmark-circle"
          size={18}
          color={photo.uri === selectedPhoto ? "yellowgreen" : "white"}
        />
      </IconContainer>
    </ImageContainer>
  );

  return (
    <Container>
      <StatusBar hidden={false} />
      <Top>
        {selectedPhoto !== "" ? (
          <Image
            source={{ uri: selectedPhoto }}
            style={{ width, height: "100%" }}
          />
        ) : null}
      </Top>
      <Bottom>
        <FlatList
          data={photos}
          numColumns={numColumns}
          keyExtractor={(photo) => photo.id}
          renderItem={renderItem}
        />
      </Bottom>
    </Container>
  );
}
