import React, { useState } from 'react';
import { Image, ImageBackground, Pressable, Text, TextInput, View } from 'react-native';

export default function Auth() {
  const [showVerifyEmail, setShowVerifyEmail] = useState(false);

  const onLoginWithGoogle = () => {
    // TODO
  }

  const onLoginWithEmail = () => {
    // TODO
  }

  return (
    <ImageBackground
      source={require('../../../assets/images/bg-login.png')}
      resizeMode="cover"
      className='h-full justify-center px-8'
    >
      <View
        className='gap-2 items-center mb-5 space-y-10'>
        <Image
          source={require('../../../assets/company-logo.png')}
          style={{ width: 50, height: 50 }}
        />
        <Text className='text-3xl font-semibold'>{showVerifyEmail ? 'Verify email' : 'Login'}</Text>
      </View>
      {showVerifyEmail ?
        <View className='items-center space-y-2'>
          <Image
            source={require('../../../assets/images/verify-email.png')}
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
          <TextInput
            className="border border-gray-300 text-gray-900 text-base font-normal rounded-lg block w-full p-4"
            placeholder="Enter Email Address"
          />
          <View className='space-y-3'>
            <Pressable
              className='bg-gray-800 items-center p-4 rounded-lg'
              onPress={onLoginWithEmail}
            >
              <Text className='text-base font-medium text-white'>Continue</Text>
            </Pressable>
            <Text className='text-center w-full text-base font-medium text-gray-600'>or</Text>
            <Pressable
              className='bg-white border flex flex-row justify-center border-gray-800 items-center rounded-lg p-4'
              onPress={onLoginWithGoogle}
            >
              <Image
                source={require('../../../assets/images/google.png')}
                style={{ width: 20, height: 20 }}
              />
              <Text className='text-base font-medium text-gray-800 ml-2'>
                Login with Google
              </Text>
            </Pressable>
          </View>
        </View>
      }
    </ImageBackground>
  );
}
