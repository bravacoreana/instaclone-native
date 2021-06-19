컨셉: 우리의 모든 탭 네비게이션을 위해 스택 나비게이터를 생성해야 함

우리는 탭 네비게이션으로 라우트를 이동할 수 있게 만들었지만, stack 네비게이터 안에 있는 화면만 헤더를 가짐
인스타그램에서 사진리스트 중에서 한 장의 사진을 클릭하면 그 사진 한장을 가진 피드가 사진 리스트 "위"로 올라옴 (stack!)
즉, 하나의 탭 위에 첫 화면이 tab 화면이고 그 위로 스택이 쌓이는 것. (탭은 고정)
따라서, 탭의 첫 페이지만 다르고, 나머지 스택으로 쌓이는 페이지들은 모든 탭이 공유함.

```js
// SharedStackNav.js
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Photo from "../../screens/Photo";
import Profile from "../../screens/Profile";
import Feed from "../../screens/Feed";
import Search from "../../screens/Search";
import Notifications from "../../screens/Notifications";
import Me from "../../screens/Me";

const Stack = createStackNavigator();

export default function SharedStackNav({ screenName }) {
  return (
    <Stack.Navigator>
      // 해당 탭을 눌렀을 때 그 탭의 첫 페이지로 가도록 함
      {screenName === "Feed" ? (
        <Stack.Screen name="Feed" component={Feed} />
      ) : null}
      {screenName === "Search" ? (
        <Stack.Screen name="Search" component={Search} />
      ) : null}
      {screenName === "Notifications" ? (
        <Stack.Screen name="Notifications" component={Notifications} />
      ) : null}
      {screenName === "Me" ? <Stack.Screen name="Me" component={Me} /> : null}
      // Profile과 Photo 탭에서는 딱 그 페이지만 보여줌
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Photo" component={Photo} />
    </Stack.Navigator>
  );
}
```

```js
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Feed from "../screens/Feed";
import Search from "../screens/Search";
import Notifications from "../screens/Notifications";
import { View } from "react-native";
import TabIcon from "../components/nav/TabIcon";
import Me from "../screens/Me";
import StackNavFactory from "../components/nav/StackNavFactory";

const Tabs = createBottomTabNavigator();

export default function LoggedInNav() {
  return (
    <Tabs.Navigator /*...*/>
      <Tabs.Screen name="Feed" options={/*...*/}>
        //
        // component={Feed} 대신 children을 활용
        // children은 함수여야 하고, 컴포넌트를 리턴해야 함
        {() => <StackNavFactory screenName="Feed" />}
      </Tabs.Screen>
      <Tabs.Screen name="Search">
        {() => <StackNavFactory screenName="Search" />}
      </Tabs.Screen>
      <Tabs.Screen name="Camera" component={View}/>
      <Tabs.Screen
        name="Notifications">
        {() => <StackNavFactory screenName="Notifications" />}
      </Tabs.Screen>
      <Tabs.Screen name="Me">
        {() => <StackNavFactory screenName="Me" />}
      </Tabs.Screen>
    </Tabs.Navigator>
  );
}
```
