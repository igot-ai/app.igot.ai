import React from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { router } from "expo-router";

interface ChatHeaderProps {
  type: string;
  currentPageString?: string;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ type, currentPageString }) => {
  return (
    <View
      className={`fixed top-0 start-0 w-full pt-10 pb-5 pl-5 flex-row items-center justify-between ${
        type == "many" && "bg-gray-50"
      }`}
    >
      <TouchableOpacity
        style={{ width: 50 }}
        onPress={() => {
          router.back();
        }}
      >
        {type == "more" ? (
          <MaterialIcons
            name="arrow-back-ios"
            size={20}
            color="black"
            style={{ marginRight: 5 }}
          />
        ) : (
          <MaterialIcons
            name="close"
            size={30}
            color="black"
            style={{ marginRight: 5 }}
          />
        )}
      </TouchableOpacity>
      {type == "many" && (
        <View className="mr-3">
          <Text className="font-semibold text-gray-500">
            {currentPageString}
          </Text>
        </View>
      )}

      {type == "one" && (
        <>
          <View className="mr-3 flex-row items-center">
            <Text className="font-semibold mr-3"> Bot Name</Text>
            <FontAwesome5 name="edit" size={16} color="black" />
          </View>
          <TouchableOpacity
            className="items-end"
            style={{ width: 50 }}
            onPress={() => {
              router.push("ChatMore");
            }}
          >
            <View className="mr-3">
              <MaterialIcons name="more-horiz" size={20} color="black" />
            </View>
          </TouchableOpacity>
        </>
      )}
      {type == "more" && (
        <TouchableOpacity onPress={() => {}}>
          <View className="mr-3">
            <FontAwesome5 name="heart" size={20} color="black" />
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};



export default ChatHeader;
