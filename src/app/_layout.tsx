import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { useReactQueryDevTools } from "@dev-plugins/react-query";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import Auth from "./auth";

import { AUTH_TOKEN_KEY } from "@/constants";
import { StatusBar } from "expo-status-bar";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient({});

// TODO: Hardcoded auth token
const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ODhkM2VhLWNhM2YtNGYyZi05ZTI0LWM2ZmQxOTcxY2ExYyIsImVtYWlsIjoibXV0dGFraW5faGFzaWJAaWdvdC5haSIsIndzX2lkIjoiaWdvdGFpIiwid29ya3NwYWNlX2lkIjoiaWdvdGFpIiwiZXhwIjoxNzUwMzE2Njc1fQ.9TMqMxboiD8xZCp-Awz5HcX6J4uLqQf4tghM0IRPmyw";

export default function MainLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useReactQueryDevTools(queryClient);
  const isLoggedIn = true;

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
      SecureStore.setItemAsync(AUTH_TOKEN_KEY, TOKEN);
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  if (!isLoggedIn) {
    return <Auth />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <StatusBar style="dark" />
        <Stack>
          <Stack.Screen name="(main)" options={{ headerShown: false }} />
          <Stack.Screen
            name="(search)/search"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="(chat)/many-chats"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="(chat)/assistant/[context_id]"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="(chat)/chat-info"
            options={{ headerShown: false }}
          />
          <Stack.Screen name="+not-found" />
        </Stack>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
