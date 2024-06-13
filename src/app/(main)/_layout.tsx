import { Tabs } from "expo-router";
import React from "react";

import { useColorScheme } from "@/hooks/useColorScheme.web";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { COLORS } from "@/constants";

export default function HomeLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#1F2A37",
        tabBarInactiveTintColor: "#1F2A37",
          // COLORS[(colorScheme as keyof typeof COLORS) ?? "light"].tint,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle:{
          height:75,
          paddingTop:15,
          borderTopWidth:0
        }
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "home" : "home-outline"}
              color={color}
              size={38}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="chatlist"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={
                focused ? "message-processing" : "message-processing-outline"
              }
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "account-circle" : "account-circle-outline"}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
