import React, { useState } from "react";
import client, { isLoggedInVar } from "./apollo";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { Asset } from "expo-asset";
import {
  Appearance,
  AppearanceProvider,
  useColorScheme,
} from "react-native-appearance";
import { ApolloProvider, useReactiveVar } from "@apollo/client";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import LoggedOutNav from "./navigators/LoggedOutNav";
import LoggedInNav from "./navigators/LoggedInNav";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const [loading, setLoading] = useState(true);
  const onFinish = () => setLoading(false);
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const preloadAssets = () => {
    // always return promise
    const fontsToLoad = [Ionicons.font];
    const fontPromises = fontsToLoad.map((font) => Font.loadAsync(font));
    const imagesToLoad = [require("./assets/logo.png")];
    const imagePromises = imagesToLoad.map((image) => Asset.loadAsync(image));
    return Promise.all([...fontPromises, ...imagePromises]); // promise in an array([Promise, Promise, Promise])
  };

  const preload = async () => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      isLoggedInVar(true);
      tokenVar(token);
    }
    return preloadAssets();
  };

  if (loading) {
    return (
      <AppLoading
        startAsync={preload}
        onError={console.warn}
        onFinish={onFinish}
      />
    );
  }

  // * Darkmode with ThemeProvider
  // const subscription = Appearance.addChangeListener(({ colorScheme }) =>
  //   console.log(colorScheme)
  // );

  return (
    <ApolloProvider client={client}>
      <AppearanceProvider>
        <NavigationContainer>
          {isLoggedIn ? <LoggedInNav /> : <LoggedOutNav />}
        </NavigationContainer>
      </AppearanceProvider>
    </ApolloProvider>
  );
}
