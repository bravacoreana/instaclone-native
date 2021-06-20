import React from "react";
import styled from "styled-components/native";
import { colors } from "../../colors";
import useMe from "../../hooks/useMe";
import { useNavigation } from "@react-navigation/core";
import moment from "moment";
import "moment-timezone";

const RoomContainer = styled.TouchableOpacity`
  flex-direction: row;
  padding: 15px 10px;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const Column = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const AvatarContainer = styled.View`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  border: 1px solid white;
  margin-right: 20px;
`;

const Avatar = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 25px;
`;

const Data = styled.View``;

const UnreadDot = styled.View`
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: ${colors.blue};
`;

const Username = styled.Text`
  color: white;
  font-weight: 600;
  font-size: 16px;
`;

const UnreadText = styled.Text`
  color: white;
  margin-top: 2px;
  font-weight: 500;
`;

const UpdatedAt = styled.Text`
  color: white;
`;

export default function RoomsItem({ users, unreadTotal, id, messages }) {
  const { data: meData } = useMe();
  const navigation = useNavigation();

  const talkingTo = users.find(
    (user) => user.username !== meData?.me?.username
  );
  const goToRoom = () => {
    navigation.navigate("Room", {
      id,
      talkingTo,
    });
  };

  const updatedTime = parseInt(messages[messages.length - 1].updatedAt, 10);
  const newUpdatedTime = moment(updatedTime);
  const fromNow = moment(newUpdatedTime).fromNow();

  return (
    <RoomContainer onPress={goToRoom}>
      <Column>
        <AvatarContainer>
          <Avatar source={{ uri: talkingTo.avatar }} />
        </AvatarContainer>
        <Data>
          <Username>{talkingTo.username}</Username>
          <UnreadText>
            {unreadTotal > 1
              ? `${unreadTotal} unread messages`
              : `${unreadTotal} unread message`}
            <UpdatedAt> · {fromNow}</UpdatedAt>
          </UnreadText>
        </Data>
      </Column>
      <Column>{unreadTotal !== 0 ? <UnreadDot /> : null}</Column>
    </RoomContainer>
  );
}
