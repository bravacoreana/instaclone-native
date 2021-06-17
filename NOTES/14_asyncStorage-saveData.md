# 앱이 로그인 여부를 기억하도록 하기 - AsyncStorage

- web에서는 localStorage에 저장할 수 있지만 RN에는 localStorage 없음
- 토큰 저장하고, 로그인 상태를 알려주는 함수를 만들어야 함
- 또한, isLoggedInVar 값을 바꾸기도 해야 함

- RN에서 AsyncStorage 더이상 지원하지 않음 -> [커뮤니티 패키지 활용](https://github.com/sunnylqm/react-native-storage)
- expo 에도 똑같은 거 있음 -> [doc 보러가기](https://docs.expo.io/versions/latest/sdk/async-storage/)

1. 설치

```
$ expo install @react-native-async-storage/async-storage
```

2. 저장하기

```js
// apollo.js

import AsyncStorage from "@react-native-async-storage/async-storage";

// 언제나 false로 시작
export const isLoggedInVar = makeVar(false);

export const logUserIn = async (token) => {
  // 방법1. item을 하나만 보내는 경우
  await AsyncStorage.setItem([["token", JSON.stringify(token)]]);

  // 방법2. 2개 이상 보내는 경우
  await AsyncStorage.multiSet([
    ["token", JSON.stringify(token)],
    ["loggedIn", JSON.stringify("yes")],
  ]);

  isLoggedInVar(true);
};
```

```js
// logIn.js
import { isLoggedInVar, logUserIn } from "../apollo";

const onCompleted = async (data) => {
  const {
    login: { ok, token },
  } = data;

  if (ok) {
    await logUserIn(token); // 토큰을 휴대폰에 저장할 수 있게 됨
  }
};
```

3. 불러오기 - `AppLoading` 활용!

```js
import AppLoading from "expo-app-loading";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import * as Font from "expo-font";
import { Asset } from "expo-asset";
import LoggedOutNav from "./navigators/LoggedOutNav";
import { NavigationContainer } from "@react-navigation/native";
import { ApolloProvider, useReactiveVar } from "@apollo/client";
import client, { isLoggedInVar, tokenVar } from "./apollo";
import LoggedInNav from "./navigators/LoggedInNav";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const [loading, setLoading] = useState(true);
  const onFinish = () => setLoading(false); // 5. loading 값을 false로 바꿈
  const isLoggedIn = useReactiveVar(isLoggedInVar); // 6. isLoggedInVar 값이 true임 -> isLoggedIn 도 true

  const preloadAssets = () => {
    const fontsToLoad = [Ionicons.font];
    const fontPromises = fontsToLoad.map((font) => Font.loadAsync(font));
    const imagesToLoad = [require("./assets/logo.png")];
    const imagePromises = imagesToLoad.map((image) => Asset.loadAsync(image));
    return Promise.all([...fontPromises, ...imagePromises]);
  };

  const preload = async () => {
    // 2. 토큰 값 여부를 확인 - getItem()
    const token = await AsyncStorage.getItem("token");

    if (token) {
      isLoggedInVar(true);
      tokenVar(token);
      /*
        // apollo.js
        export const isLoggedInVar = makeVar(false); // true로 바꿈
        export const tokenVar = makeVar(""); // "" 대신 token 값 줌
      */
    }
    return preloadAssets(); // 3. 필요한 것들을 로드함 (폰트, 이미지..)
  };

  if (loading) {
    return (
      <AppLoading
        startAsync={preload} // 1. preload 실행
        onError={console.warn}
        onFinish={onFinish} // 4. 로드가 끝나면 onFinish 실행
      />
    );
  }

  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        // 7. isLoggedIn 값이 true이므로 LoggedInNav 실행
        {isLoggedIn ? <LoggedInNav /> : <LoggedOutNav />}
      </NavigationContainer>
    </ApolloProvider>
  );
}
```
