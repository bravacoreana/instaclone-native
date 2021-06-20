import React from "react";
// import { Text, View, Image } from "react-native";
import styled from "styled-components/native";

const HeaderContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  width: 100%;
`;

const HeaderAvatar = styled.View`
  border: 1px solid white;
  width: 40px;
  height: 40px;
  border-radius: 20px;
  margin-right: 10px;
`;
const Avatar = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 20px;
`;
const HeaderUsername = styled.Text`
  color: white;
  font-weight: 600;
`;

export default function RoomHeader({ route }) {
  return (
    <HeaderContainer>
      <HeaderAvatar>
        <Avatar source={{ uri: route?.params?.avatar }} />
      </HeaderAvatar>
      <HeaderUsername>{route?.params?.talkingTo?.username}</HeaderUsername>
    </HeaderContainer>
  );
}
