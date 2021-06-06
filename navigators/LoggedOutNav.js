import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Welcome from "../screens/Welcome";
import LogIn from "../screens/LogIn";
import CreateAccount from "../screens/CreateAccount";

const Stack = createStackNavigator();

export default function LoggedOutNav() {
  return (
    <Stack.Navigator
      headerMode="float"
      screenOptions={{
        headerBackTitleVisible: false,
        headerTintColor: "pink",
      }}
    >
      <Stack.Screen
        name="Welcome"
        options={{ title: "Hi there" }}
        component={Welcome}
      />

      <Stack.Screen
        name="LogIn"
        // options={{ headerShown: false }}
        component={LogIn}
      />

      <Stack.Screen
        name="CreateAccount"
        options={{ headerBackTitle: false, headerTintColor: "red" }}
        component={CreateAccount}
      />
    </Stack.Navigator>
  );
}
