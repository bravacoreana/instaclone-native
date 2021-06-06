import React from "react";
import { TextInput } from "../components/auth/AuthCommon";
import AuthLayout from "../components/auth/AuthLayout";

export default function LogIn({ navigation }) {
  return (
    <AuthLayout>
      <TextInput
        placeholder="Username"
        returnKeyType="next"
        placeholderTextColor={"rgba(255, 255, 255, 0.8"}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        returnKeyType="done"
        lastOne={true}
        placeholderTextColor={"rgba(255, 255, 255, 0.8"}
      />
    </AuthLayout>
  );
}
