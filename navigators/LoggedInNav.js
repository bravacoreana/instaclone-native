import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image, View } from "react-native";
import TabIcon from "../components/nav/TabIcons";
import SharedStackNav from "./SharedStackNav";
import useMe from "../hooks/useMe";

const Tabs = createBottomTabNavigator();

export default function LoggedInNav() {
  const { data } = useMe();
  return (
    <Tabs.Navigator
      tabBarOptions={{
        activeTintColor: "white",
        showLabel: false,
        style: {
          borderTopColor: "rgba(255,255,255,0.2)",
          backgroundColor: "black",
        },
      }}
    >
      <Tabs.Screen
        name="Feed"
        options={{
          tabBarIcon: ({ focused, color }) => (
            <TabIcon iconName={"ios-home"} color={color} focused={focused} />
          ),
        }}
      >
        {() => <SharedStackNav screenName="Feed" />}
      </Tabs.Screen>

      <Tabs.Screen
        name="Search"
        options={{
          tabBarIcon: ({ focused, color }) => (
            <TabIcon iconName={"ios-search"} color={color} focused={focused} />
          ),
        }}
      >
        {() => <SharedStackNav screenName="Search" />}
      </Tabs.Screen>

      <Tabs.Screen
        name="Camera"
        component={View}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <TabIcon
              iconName={"ios-camera"}
              color={color}
              focused={focused}
              size={28}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Notifications"
        options={{
          tabBarIcon: ({ focused, color }) => (
            <TabIcon iconName={"ios-heart"} color={color} focused={focused} />
          ),
        }}
      >
        {() => <SharedStackNav screenName="Notifications" />}
      </Tabs.Screen>

      <Tabs.Screen
        name="MyProfile"
        options={{
          tabBarIcon: ({ focused, color, size }) =>
            data?.me?.avatar ? (
              <Image
                source={{ uri: data.me.avatar }}
                style={{
                  height: 30,
                  width: 30,
                  borderRadius: 15,
                  ...(focused && { borderColor: "white", borderWidth: 1 }),
                }}
              />
            ) : (
              <TabIcon iconName={"person"} color={color} focused={focused} />
            ),
        }}
      >
        {() => <SharedStackNav screenName="MyProfile" />}
      </Tabs.Screen>
    </Tabs.Navigator>
  );
}

/*

tab navigation
$ npm install @react-navigation/bottom-tabs
*/
