import { View, Text, Button } from "react-native";
import React from "react";
import * as SecureStore from "expo-secure-store";
import { AUTH_TOKEN_KEY } from "@/constants";
import { useAuthStore } from '@/store';

const Profile = () => {
  const { isLoggedIn, setIsLoggedIn } = useAuthStore();
  return (
    <View className="p-20">
      <Text>AccountScreen</Text>
      {isLoggedIn &&
        <Button
          title='Logout'
          onPress={() => {
            SecureStore.deleteItemAsync(AUTH_TOKEN_KEY);
            setIsLoggedIn(false)
          }}
        />
      }
    </View>
  );
}

export default Profile;
