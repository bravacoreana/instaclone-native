### styled-component

- react와 react-native 에서 styled-component 의 차이점
  - div -> `View`
  - span -> `Text`
  - `styled-components/native`

```
$ npm install styled-components/native
```

### Expo Appearance

#### 1. 설정

Appearance: 유저가 라이트모드나 다크모드의 설정이 있는지 체크(SDK43에서 사라질 예정) [[doc 보러가기]](https://docs.expo.io/versions/latest/sdk/appearance/)

```
$ expo install react-native-appearance
```

```js
// app.json

{
  "expo": {
    "userInterfaceStyle": "automatic",
    "ios": {
      "userInterfaceStyle": "light"
    },
    "android": {
      "userInterfaceStyle": "dark"
    }
  }
}
```

```js
import { AppearanceProvider } from "react-native-appearance";

export default () => (
  // 앱을 AppearanceProvider 로 감싸줘야 함
  <AppearanceProvider>
    <App />
  </AppearanceProvider>
);
```

#### 2-1. 사용방법 1

- 스타일 컴포넌트의 ThemeProvider 이용

```js
export default function App() {
  //...
  const light = Appearance.getColorScheme() === "light";
  return (
    <ThemeProvider theme={light ? lightTheme : darkTheme}>
      <AppearanceProvider>
        <App />
      </AppearanceProvider>
    </ThemeProvider>
  );
}
```

#### 2-1. 사용방법 2

- useColorScheme 훅 사용(appearance doc 참고) -> [[doc 보러가기]](https://docs.expo.io/versions/latest/sdk/appearance/)
  - 다크, 라이트 color scheme을 제공
  - [블로그 참고](https://medium.com/@sidibemouhamed/add-dark-mode-to-your-react-native-app-1d81f75aa4fa)

```js
export default function App() {
  //...
  // 유저가 현제 어떤 모드인지 알려줌
  const subscription = Appearance.addChangeListener(({ colorScheme }) => {
    // ...
  });
  return (
    <ThemeProvider theme={light ? lightTheme : darkTheme}>
      <AppearanceProvider>
        <App />
      </AppearanceProvider>
    </ThemeProvider>
  );
}
```

### Input(TextInput)

- Input에는 Props가 정말정말 많음 [[doc 보러가기]](https://reactnative.dev/docs/textInput)
  - keyboardType: `email-address`, `password`, `numbers-and-punctuation`, `url`...
  - secureTextEntry: boolean (첫글자 대문자로 시작)
  - returnKeyType: 공용/아이폰용/안드로이드용 따로 있는 경우도 있음에 주의
