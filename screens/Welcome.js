import React from "react";
import styled from "styled-components/native";
import AuthButton from "../components/auth/AuthButton";
import AuthLayout from "../components/auth/AuthLayout";
import { TouchableOpacity } from "react-native";
import { colors } from "../colors";

const LogInLink = styled.Text`
  color: ${colors.blue};
  font-weight: 600;
  margin-top: 20px;
  font-size: 16px;
`;

export default function Welcome({ navigation }) {
  const goToCreateAccount = () => navigation.navigate("CreateAccount");
  const goToLogIn = () => navigation.navigate("LogIn");
  return (
    <AuthLayout>
      <AuthButton
        text="Crate New Account"
        disabled={false}
        onPress={goToCreateAccount}
      />
      <TouchableOpacity onPress={goToLogIn}>
        <LogInLink>Log In</LogInLink>
      </TouchableOpacity>
    </AuthLayout>
  );
}
