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
import { useAuthStore } from "@/store";
import { StatusBar } from "expo-status-bar";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient({});

// TODO: Hardcoded auth token
const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ODhkM2VhLWNhM2YtNGYyZi05ZTI0LWM2ZmQxOTcxY2ExYyIsImVtYWlsIjoibXV0dGFraW5faGFzaWJAaWdvdC5haSIsIndzX2lkIjoiaWdvdGFpIiwid29ya3NwYWNlX2lkIjoiaWdvdGFpIiwiZXhwIjoxNzQ5NjE2MDU1fQ.ORfaAyqvTmtgg8jXYBAMRa0DhKQIo0LNt-Q4ZRBE9X4";

export default function MainLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../../assets/fonts/SpaceMono-Regular.ttf"),
  });
  const { isLoggedIn, setIsLoggedIn } = useAuthStore();

  useReactQueryDevTools(queryClient);

  useEffect(() => {
    const checkAuthToken = async () => {
      const token = await SecureStore.getItemAsync(AUTH_TOKEN_KEY);
      setIsLoggedIn(!!token);
    };

    if (loaded) {
      SplashScreen.hideAsync();
      checkAuthToken();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      {!isLoggedIn ? <Auth /> :
        <>
          <StatusBar style="dark" />
          <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
            <Stack>
              <Stack.Screen name="(main)" options={{ headerShown: false }} />
              <Stack.Screen
                name="(search)/search"
                options={{ headerShown: false }}
              />
              <Stack.Screen name="(bot)/info" options={{ headerShown: false }} />
              <Stack.Screen name="+not-found" />
            </Stack>
          </ThemeProvider>
        </>
      }
    </QueryClientProvider>
  );
}
