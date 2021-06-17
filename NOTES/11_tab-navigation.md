# tab-navigator

[doc 보러가기](https://reactnavigation.org/docs/tab-based-navigation/)

```
npm install @react-navigation/bottom-tabs
```

```js
// LoggedInNav.js

import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Feed from "../screens/Feed";

const Tabs = createBottomTabNavigator();

export default function LoggedInNav() {
  return (
    <Tabs.Navigator>
      <Tabs.Screen name="Feed" component={Feed} />
    </Tabs.Navigator>
  );
}
```

```js
// apollo.js

// 유저의 로그인 여부 확인
export const isLoggedInVar = makeVar(false);
```

```js
// app.js - 에러
export default function App() {
  //...
  if(loading) {
      return <AppLoading /*...*/>
  }

  const isLoggedIn = useReactiveVar(isLoggedInVar);
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        // 로그인 여부에 따라 다른 navigator를 보여줌
        {isLoggedIn ? <LoggedInNav /> : <LoggedOutNav />}
      </NavigationContainer>
    </ApolloProvider>
  );
}
```

만나게 되는 에러 메세지

```
Component Exception
Rendered more hooks than during the previous render
```

- 컴포넌트를 만들 때 우리가 만드는 hooks는 모든 렌더링에서 다 똑같아야 함 (언제는 hooks를 만들고 또 언제는 안만들 수 없음)
- 위와 같은 상황에서
  - loading 때: AppLoading 컴포넌트는 렌더링하지만, `isLoggedIn`은 렌더링하지 않음
  - loading이 아닐 때: `isLoggedIn` 훅이 렌더링 됨 -> 로딩때보다 더 많은 훅을 렌더링
- 해결방법
  - `const isLoggedIn = useReactiveVar(isLoggedInVar);` 을 상위로 올려줘, 로딩 여부에 상관없이 훅이 렌더링 될 수 있도록 함

```js
// app.js
export default function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  //...
  if(loading) {
      return <AppLoading /*...*/>
  }

  return(
    //...
  )
}
```
