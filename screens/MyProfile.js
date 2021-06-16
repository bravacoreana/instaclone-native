import React, { useEffect } from "react";
import { View, Text } from "react-native";
import useMe from "../hooks/useMe";

export default function MyProfile({ navigation }) {
  const { data } = useMe();
  useEffect(() => {
    navigation.setOptions({
      title: data?.me?.username,
    });
  }, []);
  return (
    <View
      style={{
        backgroundColor: "black",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={{ color: "white" }}>My Profile</Text>
    </View>
  );
}
