## 스택 네비게이션

[기본 세팅](#기본-세팅)
[스택 간 화면 이동](#스택-간-화면-이동)

### 기본 세팅

- stack: 카드 더미(카드게임할 때 쌓여있는 것!)
- 화면 이동시 새 화면이 스택의 제일 위에 쌓이는 개념

```js
// LoggedOutNav.js
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();

export default function LoggedOutNav() {
  return (
    // Stack.Navigator 컴포넌트
    <Stack.Navigator>
      // 카드 더미의 맨 위
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="LogIn" component={LogIn} />
      <Stack.Screen name="CreateAccount" component={CreateAccount} />
    </Stack.Navigator>
  );
}
```

```js
// App.js

//...
return (
  // navigator를 NavigationContainer로 감싸야 함
  <NavigationContainer>
    <LoggedOutNav />;
  </NavigationContainer>
);
```

### 스택 간 화면 이동

```js
// LoggedOutNav.js

<Stack.Screen name="Welcome" component={Welcome} />
```

여기서 `component={Welcome}`을 스크린 컴포넌트라고 부르고, 이 스크린 컴포넌트는 props 을 가짐

- 스크린 컴포넌트가 가지는 props: `navigation`, `route`
  - `navigation`: navigate, goBack...
  - `route`:

```js
// Welcome.js

import React from "react";
import { Text, View, TouchableOpacity } from "react-native";

export default function Welcome(props) {
  const { navigation } = props;
  return (
    <View>
      <Text>Welcome</Text>
      // TouchableOpacity: 클릭을 하능하게 만들어줌 // navigation.navigate("CreateAccount"):
      CreateAccount(App.js에서 지어준 screen name)로 이동
      <TouchableOpacity onPress={() => navigation.navigate("CreateAccount")}>
        <Text> Go To Create Account</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("LogIn")}>
        <Text> Go To Create Account</Text>
      </TouchableOpacity>
    </View>
  );
}
```

### createStackNavigator

[createStackNavigator](https://reactnavigation.org/docs/stack-navigator)

```
$ npm install @react-navigation/stack
```

- 2가지 종류의 props
  - one for `Stack.Navigator`: 모든 스크린에 전체적용 - [[prop 보기]](https://reactnavigation.org/docs/stack-navigator/#props)
  - one for screens: 각각 적용 - [[prop 보기]](https://reactnavigation.org/docs/stack-navigator/#options)]

```js
// 예시{

//...
<Stack.Navigator mode="modal">
  {" "}
  // 헤더 모드 변경
  <Stack.Screen
    name="Welcome"
    component={Welcome}
    options={{
      title: "Welcome", // 헤더 타이틀 변경
    }}
  />
</Stack.Navigator>
```

- 유용할 것 같은 props
  - [header](https://reactnavigation.org/docs/stack-navigator/#header) - 헤더에 리액트 컴포넌트를 넣을 수 있음(예: 검색바)
  - [headerShown](https://reactnavigation.org/docs/stack-navigator/#headershown) - 헤더 없앨 수 있음
  - [headerBackTitle](https://reactnavigation.org/docs/stack-navigator/#headerbacktitle) - 이전 페이지 버튼 설정
