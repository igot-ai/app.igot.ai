import React, { useState } from 'react';
import { Image, ImageBackground, Pressable, Text, TextInput, View, KeyboardAvoidingView, Platform } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import * as SecureStore from "expo-secure-store";
import { AUTH_TOKEN_KEY } from "@/constants";
import { useAuth } from "@/hooks";
import { Login } from "@/types";
import { useAuthStore } from "@/store";

// TODO: Hardcoded auth token
const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ODhkM2VhLWNhM2YtNGYyZi05ZTI0LWM2ZmQxOTcxY2ExYyIsImVtYWlsIjoibXV0dGFraW5faGFzaWJAaWdvdC5haSIsIndzX2lkIjoiaWdvdGFpIiwid29ya3NwYWNlX2lkIjoiaWdvdGFpIiwiZXhwIjoxNzQ5NjE2MDU1fQ.ORfaAyqvTmtgg8jXYBAMRa0DhKQIo0LNt-Q4ZRBE9X4";

export default function Auth() {
  const [showVerifyEmail, setShowVerifyEmail] = useState(false);
  const { login } = useAuth()
  const { control, handleSubmit, setError, formState: { errors } } = useForm();
  const { setIsLoggedIn } = useAuthStore()

  const onLoginWithGoogle = () => {
    // TODO
  }

  const onLoginWithEmail = async (data: Login) => {
    // await login(data)
    if (data.email === 'admin@gmail.com') {
      SecureStore.setItemAsync(AUTH_TOKEN_KEY, TOKEN);
      setIsLoggedIn(true)
    } else {
      setError('email', {
        type: "manual",
        message: "Invalid account!",
      })
    }
  }

  return (
    <ImageBackground
      source={require('@/assets/images/bg-login.png')}
      resizeMode="cover"
      className='h-full justify-center px-8'
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className='flex-1 justify-center'
      >
        <View className='gap-2 items-center mb-5 space-y-10'>
          <Image
            source={require('../../../assets/company-logo.png')}
            style={{ width: 50, height: 50 }}
          />
          <Text className='text-3xl font-semibold'>{showVerifyEmail ? 'Verify email' : 'Login'}</Text>
        </View>
        {showVerifyEmail ?
          <View className='items-center space-y-2'>
            <Image
              source={require('@/assets/images/verify-email.png')}
              style={{ width: 150, height: 150 }}
            />
            <Text className='text-base font-medium text-gray-600 text-center'>A verification link has been sent to your email. Please check your inbox.</Text>
            <Pressable
              className='bg-gray-800 items-center p-4 rounded-lg w-full'
            >
              <Text className='text-base font-medium text-white'>Open your mail</Text>
            </Pressable>
          </View>
          :
          <View className='space-y-2'>
            <Text className="block text-sm font-medium text-gray-900 dark:text-white">Your email</Text>
            <Controller
              control={control}
              rules={{
                required: 'Email is required!',
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                  message: 'Enter a valid email address!'
                }
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  className={`border ${errors.email ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-base font-normal rounded-lg block w-full p-4`}
                  placeholder="Enter Email Address"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="email"
            />
            {errors.email && <Text className='text-red-500'>{errors.email.message}</Text>}
            <View className='space-y-3'>
              <Pressable
                className='bg-gray-800 items-center p-4 rounded-lg'
                onPress={handleSubmit(onLoginWithEmail)}
              >
                <Text className='text-base font-medium text-white'>Continue</Text>
              </Pressable>
              <Text className='text-center w-full text-base font-medium text-gray-600'>or</Text>
              <Pressable
                className='bg-white border flex flex-row justify-center border-gray-800 items-center rounded-lg p-4'
                onPress={onLoginWithGoogle}
              >
                <Image
                  source={require('@/assets/images/google.png')}
                  style={{ width: 20, height: 20 }}
                />
                <Text className='text-base font-medium text-gray-800 ml-2'>
                  Login with Google
                </Text>
              </Pressable>
            </View>
          </View>
        }
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}
