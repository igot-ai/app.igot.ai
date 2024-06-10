import { Tabs } from "expo-router";
import React from "react";

import { useColorScheme } from "@/hooks/useColorScheme.web";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { COLORS } from "@/constants";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor:
          COLORS[(colorScheme as keyof typeof COLORS) ?? "light"].tint,
        headerShown: false,
        tabBarShowLabel: false,
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
        name="conversations"
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
