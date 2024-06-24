import React, { useRef, useState } from "react";
import {
  Image,
  ImageBackground,
  Pressable,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Alert,
  Button,
  ActivityIndicator,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { AUTH_TOKEN_KEY } from "@/constants";
import { useAuth } from "@/hooks";
import { Login } from "@/types";
import * as SecureStore from "expo-secure-store";
import { useAuthStore } from "@/store";
import { StatusBar } from "expo-status-bar";

interface FormData {
  email: string;
}

export default function Auth() {
  const [showOTP, setShowOTP] = useState(false);
  const { login, getTokenFromOTP } = useAuth();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const refs = useRef<(TextInput | null)[]>([]);
  const { setIsLoggedIn } = useAuthStore();

  const handleChangeOTP = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value.length === 1 && index < 5) {
      refs.current[index + 1]?.focus();
    } else if (value === "" && index > 0) {
      refs.current[index - 1]?.focus();
    }
  };

  const handleSubmitOTP = async () => {
    if (otp.some((x) => x === "")) {
      Alert.alert("Please enter OTP");
      return;
    }
    setLoading(true);
    await getTokenFromOTP.mutateAsync(Number(otp.join("")), {
      onSuccess: (res: any) => {
        SecureStore.setItemAsync(AUTH_TOKEN_KEY, res?.token);
        setIsLoggedIn(true);
        setLoading(false);
      },
      onError: (error: Error) => {
        Alert.alert(error.message);
        setLoading(false);
      },
    });
  };

  const onLoginWithGoogle = () => {
    Alert.alert("Coming soon!");
  };

  const onLoginWithEmail = async (data: { email: string }) => {
    setLoading(true);
    const payload: Login = {
      email: data.email,
      is_mobile: true,
    };
    login.mutateAsync(payload, {
      onSuccess: () => {
        setShowOTP(true);
        setLoading(false);
      },
      onError: (error: Error) => {
        Alert.alert("Something went wrong");
        setLoading(false);
      },
    });
  };

  return (
    <ImageBackground
      source={require("@/assets/images/bg-login.png")}
      resizeMode="cover"
      className="h-full justify-center px-8"
    >
      <StatusBar style="dark" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1 justify-center"
      >
        <View className="gap-2 items-center mb-5 space-y-10">
          <Image
            source={require("@/assets/company-logo.png")}
            style={{ width: 50, height: 50 }}
          />
          <Text className="text-3xl font-semibold">
            {showOTP ? "Enter OTP" : "Login"}
          </Text>
        </View>
        {showOTP ? (
          <View>
            <View className="flex flex-row justify-between items-center mb-5">
              {otp.map((data, index) => (
                <TextInput
                  key={index}
                  className="w-12 h-12 border border-black rounded-lg text-center text-lg"
                  maxLength={1}
                  keyboardType="numeric"
                  onChangeText={(value) => handleChangeOTP(value, index)}
                  value={data}
                  ref={(ref) => (refs.current[index] = ref)}
                />
              ))}
            </View>
            <TouchableOpacity
              className="bg-white border flex flex-row justify-center border-gray-500 items-center rounded-lg p-4"
              onPress={handleSubmitOTP}
              disabled={loading}
            >
              <Text className="text-base font-medium text-gray-900 ml-2">
                {loading && <ActivityIndicator className="mr-2" />}
                Login with OTP
              </Text>
            </TouchableOpacity>
            <View className="mt-2">
              <Button title="Back to login" onPress={() => setShowOTP(false)} />
            </View>
          </View>
        ) : (
          <View className="space-y-2">
            <Text className="text-sm font-medium text-gray-900 mb-2">
              Your Email
            </Text>
            <Controller
              control={control}
              rules={{
                required: "Email is required!",
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                  message: "Enter a valid email address!",
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  className={`border ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } text-base font-normal rounded-lg w-full p-4`}
                  placeholder="Enter Email Address"
                  placeholderTextColor="#d1d1d1"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="email"
            />
            {errors.email && (
              <Text className="text-red-500">{errors.email.message}</Text>
            )}
            <View className="space-y-3">
              <Pressable
                className="bg-gray-800 items-center p-4 rounded-lg"
                onPress={handleSubmit(onLoginWithEmail)}
                disabled={loading}
              >
                <Text className="text-base font-medium text-white">
                  {loading && <ActivityIndicator className="mr-2" />}
                  Continue
                </Text>
              </Pressable>
              <Text className="text-center w-full text-base font-medium text-gray-600">
                or
              </Text>
              <Pressable
                className="bg-white border flex flex-row justify-center border-gray-800 items-center rounded-lg p-4"
                onPress={onLoginWithGoogle}
              >
                <Image
                  source={require("@/assets/images/google.png")}
                  style={{ width: 20, height: 20 }}
                />
                <Text className="text-base font-medium text-gray-800 ml-2">
                  Login with Google
                </Text>
              </Pressable>
            </View>
          </View>
        )}
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}
