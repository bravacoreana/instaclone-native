[Tab navigation 1](./11_tab-navigation.md)

---

# Tab navigation

- Tabs.Navigator 옵션: `tabBarOptions`
- Tabs.Screen
  - [bottom-tab-navigator API doc](https://reactnavigation.org/docs/bottom-tab-navigator)

```js
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Feed from "../screens/Feed";
import Search from "../screens/Search";
import Notifications from "../screens/Notifications";
import Profile from "../screens/Profile";
import { View } from "react-native";
import TabIcon from "../components/nav/TabIcon";

const Tabs = createBottomTabNavigator();

export default function LoggedInNav() {
  return (
    <Tabs.Navigator
      //
      // tab.Navigator 옵션
      tabBarOptions={{
        activeTintColor: "white",
        // 탭 바의 label 가림
        showLabel: false,
        style: {
          borderTopColor: "rgba(255, 255, 255, 0.3)",
          backgroundColor: "black",
        },
      }}
    >
      <Tabs.Screen
        name="Feed"
        component={Feed}
        options={{
          // tabBarIcon은 focused, color, size를 받고, React.Node를 리턴하는 함수
          tabBarIcon: ({ focused, color, size }) => (
            // {color}는 activeTintColor와 같은 색상
            <TabIcon iconName="home" color={color} focused={focused} />
          ),
        }}
      />
      //...
    </Tabs.Navigator>
  );
}
```

```js
// TabIcon.js

import React from "react";
import { Ionicons } from "@expo/vector-icons";

export default function TabIcon({ iconName, color, focused }) {
  return (
    <Ionicons
      name={focused ? iconName : `${iconName}-outline`}
      color={color}
      size={22}
    />
  );
}
```
