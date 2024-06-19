import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { router } from "expo-router";

interface ChatHeaderProps {
  type: string;
  currentPageString?: string;
  botName?:string;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ type, currentPageString, botName }) => {
  return (
    <View
      className={`fixed top-0 bg-white start-0 w-full pt-10 pb-5 pl-5 flex-row items-center justify-between ${
        type == "many-chats" && "bg-gray-50"
      }`}
    >
      <TouchableOpacity
        style={{ width: 50 }}
        onPress={() => {
          router.back();
        }}
      >
        {type == "chat-info" ? (
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
      {type == "many-chats" && (
        <View className="mr-3">
          <Text className="font-semibold text-gray-500">
            {currentPageString}
          </Text>
        </View>
      )}

      {type == "chat" && (
        <>
          <View className="mr-3 flex-row items-center">
            <Text className="font-semibold mr-3">{botName ? botName : "Bot Name"}</Text>
            <FontAwesome5 name="edit" size={16} color="black" />
          </View>
          <TouchableOpacity
            className="items-end"
            style={{ width: 50 }}
            onPress={() => {
              router.push("(chat)/chat-info");
            }}
          >
            <View className="mr-3">
              <MaterialIcons name="more-horiz" size={20} color="black" />
            </View>
          </TouchableOpacity>
        </>
      )}
      {type == "chat-info" && (
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
