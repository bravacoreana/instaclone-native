import AppLoading from "expo-app-loading";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import * as Font from "expo-font";
import { Asset } from "expo-asset";
import LoggedOutNav from "./navigators/LoggedOutNav";
import { NavigationContainer } from "@react-navigation/native";
import {
  Appearance,
  AppearanceProvider,
  useColorScheme,
} from "react-native-appearance";

export default function App() {
  const [loading, setLoading] = useState(true);
  const onFinish = () => setLoading(false);
  const preload = () => {
    // always return promise
    const fontsToLoad = [Ionicons.font];
    const fontPromises = fontsToLoad.map((font) => Font.loadAsync(font));
    const imagesToLoad = [require("./assets/logo.png")];
    const imagePromises = imagesToLoad.map((image) => Asset.loadAsync(image));
    return Promise.all([...fontPromises, ...imagePromises]); // promise in an array([Promise, Promise, Promise])
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
    <AppearanceProvider>
      <NavigationContainer>
        <LoggedOutNav />
      </NavigationContainer>
    </AppearanceProvider>
  );
}
