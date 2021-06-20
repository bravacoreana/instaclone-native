import { gql, useMutation, useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FlatList, KeyboardAvoidingView, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components/native";
import RoomHeader from "../components/room/RoomHeader";
import ScreenLayout from "../components/ScreenLayout";
import useMe from "../hooks/useMe";

const SEND_MESSAGE_MUTATION = gql`
  mutation sendMessage($payload: String!, $roomId: Int, $userId: Int) {
    sendMessage(payload: $payload, roomId: $roomId, userId: $userId) {
      ok
      id
    }
  }
`;

const ROOM_QUERY = gql`
  query seeRoom($id: Int!) {
    seeRoom(id: $id) {
      id
      messages {
        id
        payload
        user {
          username
          avatar
        }
        read
      }
    }
  }
`;

const MessageContainer = styled.View`
  /* padding: 10px 0px; */
  flex-direction: ${(props) => (props.incoming ? "row" : "row-reverse")};
  align-items: flex-end;
`;
const Author = styled.View`
  margin: 0px 10px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 20px;
`;
const Avatar = styled.Image`
  width: 20px;
  height: 20px;
  border-radius: 10px;
`;

const Message = styled.Text`
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 8px 18px;
  border-radius: 18px;
  overflow: hidden;
  font-size: 16px;
`;

const InputContainer = styled.View`
  width: 100%;
  margin-bottom: 50px;
  margin-top: 30px;
  flex-direction: row;
  align-items: center;
`;

const TextInput = styled.TextInput`
  width: 100%;
  padding: 15px;
  border-radius: 30px;
  border: 1px solid white;
  color: white;
`;

const SendButton = styled.TouchableOpacity`
  position: absolute;
  right: 20px;
  background-color: black;
`;

export default function Room({ route, navigation }) {
  const { data: meData } = useMe();
  const { register, setValue, handleSubmit, getValues, watch } = useForm();
  const updateSendMessage = (cache, result) => {
    const {
      data: {
        sendMessage: { ok, id },
      },
    } = result;

    if (ok && meData) {
      const { message } = getValues();
      setValue("message", "");
      const messageObj = {
        id,
        payload: message,
        user: {
          username: meData.me.username,
          avatar: meData.me.avatar,
        },
        read: true,
        __typename: "Message",
      };
      const messageFragment = cache.writeFragment({
        fragment: gql`
          fragment NewMessage on Message {
            id
            payload
            user {
              username
              avatar
            }
            read
          }
        `,
        data: messageObj,
      });
      cache.modify({
        id: `Room:${route.params.id}`,
        fields: {
          messages(prev) {
            return [...prev, messageFragment];
          },
        },
      });
    }
  };

  const [sendMessageMutation, { loading: sendingMessage }] = useMutation(
    SEND_MESSAGE_MUTATION,
    {
      update: updateSendMessage,
    }
  );

  const { data, loading } = useQuery(ROOM_QUERY, {
    variables: {
      id: route?.params?.id,
    },
  });
  const onValid = ({ message }) => {
    if (!sendingMessage) {
      sendMessageMutation({
        variables: {
          payload: message,
          roomId: route?.params?.id,
        },
      });
    }
  };
  useEffect(() => {
    register("message", { required: true });
  }, [register]);

  useEffect(() => {
    navigation.setOptions({
      title: <RoomHeader route={route} />,
    });
  }, []);

  const renderItem = ({ item: message }) => (
    <MessageContainer
      incoming={message.user.username === route?.params?.talkingTo?.username}
    >
      <Author>
        <Avatar source={{ uri: message.user.avatar }} />
      </Author>
      <Message>{message.payload}</Message>
    </MessageContainer>
  );

  const messages = [...(data?.seeRoom?.messages ?? [])];
  messages.reverse();
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={50}
    >
      <ScreenLayout loading={loading}>
        <FlatList
          inverted
          style={{ width: "100%", marginVertical: 15 }}
          ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
          data={messages}
          keyExtractor={(message) => "" + message.id}
          renderItem={renderItem}
        />
        <InputContainer>
          <TextInput
            placeholder="Message..."
            placeholderTextColor="rgba(255,255,255,0.3)"
            returnKeyLabel="Send Message"
            returnKeyType="send"
            onChangeText={(text) => setValue("message", text)}
            onSubmitEditing={handleSubmit(onValid)}
            value={watch("message")}
          />
          {/* <SendButton>
            <Ionicons name="send-outline" color="white" size={18} />
          </SendButton> */}
        </InputContainer>
      </ScreenLayout>
    </KeyboardAvoidingView>
  );
}

// `${route?.params?.talkingTo?.username}`
