import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";

export default function LogIn({ navigation }) {
  return (
    <View>
      <Text>Login</Text>
      <TouchableOpacity onPress={() => navigation.navigate("CreateAccount")}>
        <View>
          <Text>Go to Create Account</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
