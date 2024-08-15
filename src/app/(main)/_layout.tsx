import { Tabs } from "expo-router";
import React from "react";
import GradientNavIcon from "@/components/navigation/gradient-nav-icon";
import GradientNavLabel from "@/components/navigation/gradient-nav-label";

export default function HomeLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 75,
          paddingTop: 15,
          borderTopWidth: 0,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: ({ focused }) => GradientNavLabel(focused, "Home", 35),
          tabBarIcon: ({ focused }) => GradientNavIcon(focused, "home", 35, 35),
        }}
      />
      <Tabs.Screen
        name="recents"
        options={{
          tabBarLabel: ({ focused }) =>
            GradientNavLabel(focused, "Recents", 44),
          tabBarIcon: ({ focused }) =>
            GradientNavIcon(focused, "clock", 30, 30),
        }}
      />
      <Tabs.Screen
        name="chat-list"
        options={{
          tabBarLabel: ({ focused }) =>
            GradientNavLabel(focused, "Chat List", 48),
          tabBarIcon: ({ focused }) =>
            GradientNavIcon(focused, "message-processing", 28, 28),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: ({ focused }) =>
            GradientNavLabel(focused, "Profile", 36),
          tabBarIcon: ({ focused }) =>
            GradientNavIcon(focused, "account-circle", 28, 28),
        }}
      />
    </Tabs>
  );
}
