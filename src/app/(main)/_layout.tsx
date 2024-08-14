import { Tabs } from "expo-router";
import React from "react";

import { useColorScheme } from "@/hooks/useColorScheme.web";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { COLORS } from "@/constants";
import { Text } from "react-native";

export default function HomeLayout() {
  const colorScheme = useColorScheme();
  const nav_color =
    "linear-gradient(to right, rgba(48, 190, 147, 1), rgba(42, 164, 174, 1), rgba(34, 149, 213, 1), rgba(30, 111, 231, 1))";

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#1F2A37",
        tabBarInactiveTintColor: "#1F2A37",
        // COLORS[(colorScheme as keyof typeof COLORS) ?? "light"].tint,
        headerShown: false,
        tabBarStyle: {
          height: 75,
          paddingTop: 15,
          borderTopWidth: 0,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        // tabBarLabel="asd"
        options={{
          tabBarLabel: ({ color, focused }) => (
            <Text
              className="font-normal text-xs mb-3"
              style={{color: focused ? nav_color : color}}
            >
              Home
            </Text>
          ),
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "home" : "home-outline"}
              color={focused ? nav_color : color}
              size={35}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="recents"
        options={{
          tabBarLabel: ({ color, focused }) => (
            <Text
              className="font-normal text-xs mb-3"
              style={{color: focused ? nav_color : color}}
            >
              Recents
            </Text>
          ),
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "clock-outline" : "clock-outline"}
              color={focused ? nav_color : color}
              size={32}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="chat-list"
        options={{
          tabBarLabel: ({ color, focused }) => (
            <Text
              className="font-normal text-xs mb-3"
              style={{color: focused ? nav_color : color}}
            >
              Chat List
            </Text>
          ),
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={
                focused ? "message-processing" : "message-processing-outline"
              }
              color={focused ? nav_color : color}
              size={28}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: ({ color, focused }) => (
            <Text
              className="font-normal text-xs mb-3"
              style={{color: focused ? nav_color : color}}
            >
              Profile
            </Text>
          ),
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "account-circle" : "account-circle-outline"}
              color={focused ? nav_color : color}
              size={29}
            />
          ),
        }}
      />
    </Tabs>
  );
}
