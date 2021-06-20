import React, { useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { logUserOut } from "../apollo";
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
      <TouchableOpacity onPress={logUserOut}>
        <View style={{ color: "white" }}>
          <Text style={{ color: "white" }}>Log out</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
