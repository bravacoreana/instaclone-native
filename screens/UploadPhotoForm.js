import { useMutation } from "@apollo/client";
import { gql } from "@apollo/client/core";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { ActivityIndicator, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { colors } from "../colors";
import DismissKeyboard from "../components/DismissKeyboard";
import { FEED_PHOTO } from "../fragments";
import { ReactNativeFile } from "apollo-upload-client";

const UPLOAD_PHOTO_MUTATION = gql`
  mutation uploadPhoto($file: Upload!, $caption: String) {
    uploadPhoto(file: $file, caption: $caption) {
      ...FeedPhotoFragment
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
  height: 40%;
`;
const CaptionContainer = styled.View`
  margin-top: 30px;
`;
const Caption = styled.TextInput`
  background-color: white;
  color: black;
  padding: 10px 20px;
  border-radius: 3px;
`;

const HeaderRightText = styled.Text`
  color: ${colors.blue};
  font-size: 16px;
  font-weight: 600;
  margin-right: 5px;
`;

export default function UploadPhotoForm({ route, navigation }) {
  const updateUploadPhoto = (cache, result) => {
    const {
      data: { uploadPhoto },
    } = result;
    if (uploadPhoto.id) {
      cache.modify({
        id: "ROOT_QUERY",
        fields: {
          seeFeed(prev) {
            return [uploadPhoto, ...prev]; // adding one more photo in seeFeed
          },
        },
      });
      navigation.navigate("Tabs");
    }
  };

  const [uploadPhotoMutation, { loading, error }] = useMutation(
    UPLOAD_PHOTO_MUTATION,
    {
      update: updateUploadPhoto,
    }
  );

  const HeaderRight = () => (
    <TouchableOpacity onPress={handleSubmit(onValid)}>
      <HeaderRightText>Next</HeaderRightText>
    </TouchableOpacity>
  );

  const HeaderRightLoading = () => (
    <ActivityIndicator size="small" color="white" style={{ marginRight: 10 }} />
  );

  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    register("caption");
  }, [register]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: loading ? HeaderRightLoading : HeaderRight,
      // ...(loading && { headerLeft: () => null }),
    });
  }, [loading]);

  const onValid = ({ caption }) => {
    const file = new ReactNativeFile({
      uri: route.params.file,
      name: `1.jpeg`, // rn take pics in jpeg
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
            placeholder="Caption"
            placeholderTextColor="rgba(0,0,0,0.5)"
            onSubmitEditing={handleSubmit(onValid)}
            onChangeText={(text) => setValue("caption", text)}
          />
          {/* TODO
          : caption이 아니라 제출 버튼을 누르게 하는게 나을 거 같다!
          */}
        </CaptionContainer>
      </Container>
    </DismissKeyboard>
  );
}
