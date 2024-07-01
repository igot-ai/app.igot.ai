import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { Conversation, SESSION_ASSETS, TASK_TYPE_ROLE } from "@/types";
import Markdown from "react-native-markdown-display";
import { Audio } from "expo-av";
import { MaterialIcons } from "@expo/vector-icons";
import { Chart } from "../chart";
import { extractJson } from "@/utils";

interface Props {
  message: Conversation;
}

export const RenderMessageContent = ({ message }: Props) => {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const playSound = async () => {
    if (sound) {
      if (isPlaying) {
        await sound.pauseAsync();
      } else {
        await sound.playAsync();
      }
      setIsPlaying(!isPlaying);
    } else {
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: message.content },
        { shouldPlay: true }
      );
      setSound(newSound);
      setIsPlaying(true);
    }
  };

  switch (message.role as TASK_TYPE_ROLE) {
    case TASK_TYPE_ROLE.TASK_CHART_QUERY_JSON:
      return <Chart content={extractJson(message.content)} />;
    case TASK_TYPE_ROLE.TASK_COMPOSE_IMAGE:
      return (
        <View className="aspect-square bg-gray-100 p-2 rounded-md">
          <Image
            source={{ uri: message.content }}
            className="w-full h-full resize"
            onError={(error) =>
              console.log("Image loading error:", error.nativeEvent.error)
            }
          />
        </View>
      );
    case TASK_TYPE_ROLE.TASK_COMPOSE_AUDIO:
      return (
        <View className="bg-gray-100 p-5 rounded-r-xl rounded-b-xl mt-3 mb-2">
          <TouchableOpacity onPress={playSound}>
            <View className="items-center	flex-row">
              <MaterialIcons
                name={isPlaying ? "pause" : "play-circle"}
                size={20}
                color="black"
              />
              <Text style={{ marginLeft: 5 }}>Play audio</Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    default:
      return <Markdown>{message.content}</Markdown>;
  }
};
