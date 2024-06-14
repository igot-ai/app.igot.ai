import { Image, View, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { cn } from '../../../utils/cn';
import React from 'react';
import YourBots from '../(home)/your-bots';
import { router } from 'expo-router';
import Explore from '../(home)/explore';

interface TabType {
  id: number;
  name: string;
  component: React.ReactNode;
}

const tabs: TabType[] = [
  { id: 1, name: 'Explore', component: <Explore /> },
  { id: 2, name: 'Your bots', component: <YourBots /> },
];

export default function HomeScreen() {
  const [tabActiveId, setTabActiveId] = useState<number>(1)

  return (
    <View className='h-full bg-white pt-10'>
      <View className="flex flex-row items-center w-100 mt-2 px-5">
        <Image
          source={require('../../../assets/company-logo.png')}
          style={{ width: 40, height: 40 }}
        />
        <View className='flex flex-1 flex-row justify-center items-center gap-7'>
          {tabs.map((tab: TabType) => (
            <TouchableOpacity
              key={tab.id}
              className={tab.id === tabActiveId ? 'border-b-2 border-b-gray-900' : ''}
              onPress={() => setTabActiveId(tab.id)}
            >
              <Text
                className={cn(
                  ' py-2 text-sm font-medium',
                  tab.id === tabActiveId ? 'text-gray-900' : 'text-gray-500'
                )}
              >
                {tab.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity
          onPress={() => {
            router.push('(search)/search');
          }}
          className='ml-auto'
        >
          <MaterialIcons
            name="search"
            size={24}
            color="black"
          />
        </TouchableOpacity>
      </View>
      {tabs.find(tab => tab.id === tabActiveId)?.component}
    </View>
  );
}