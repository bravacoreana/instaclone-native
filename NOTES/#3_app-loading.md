- app-loading: https://docs.expo.io/versions/latest/sdk/app-loading/
- expo-font: https://docs.expo.io/versions/latest/sdk/font/
- asset: https://docs.expo.io/versions/latest/sdk/asset/
- asset.loadAsync: https://docs.expo.io/versions/latest/sdk/asset/#assetloadasyncmodules

---

- 앱로딩: 앱 로딩을 원할 때 까지 앱 로딩을 막아줌

  ```
  $ expo install expo-app-loading
  ```

- 폰트

  ```
  $ expo install expo-font
  ```

- preload: 유저가 앱으로 갔을 때 앱이 준비된 상태여야 함 (앱 로고, 폰트...)
- expo가 아이콘도 지원해 주는데(ex. vertor-icons) 이것들은 이미 expo 에 깔려있고, "폰트"임
- preload assets: 그 중 loadAsync는 이미지 preload
  ```
  $ expo install expo-asset
  ```

---

```js
import React, { useState } from "react";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { Asset } from "expo-asset";

export default function App() {
  const [loading, setLoading] = useState(true);
  const onFinish = () => setLoading(false); // #3 AppLoading 이 끝나면 setLoading에 false를 반환
  const preload = () => {
    // #2 여기 안에 있는 것들을 로드: 로고 / 폰트 / 유저 토큰 확인 / 유저 프로필 불러오기 ...
    const fontsToLoad = [Ionicons.font];
    const fontPromises = fontsToLoad.map((font) => Font.loadAsync(font));

    const imageToLoad = [require("./assets/logo.png")]; // [require("파일경로"), "URL"] 로 써도 가능
    const imagePromises = imageToLoad.map((image) => Asset.loadAsync(image));

    //return Promise.all(fontPromises);
    return Promise.all([...fontPromises, ...imagePromises]);
    // Promise.all 안에는 배열을 넣어줘야 함 -> fontPromises가 map을 사용하므로 배열을 반환
  };
  if (loading) {
    return (
      <AppLoading // #1 앱로딩은 몇개의 속성을 가짐  - startAsync 부터 시작
        startAsync={preload}
        onError={console.warn}
        onFinish={onFinish}
      />
    );
  }
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
```
