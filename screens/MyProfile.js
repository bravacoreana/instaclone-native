import React from "react";
import { View, Text } from "react-native";

export default function MyProfile() {
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
