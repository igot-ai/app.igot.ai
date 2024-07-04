import ChatHeader from "@/components/chat-header";
import { useRef, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons, Feather, FontAwesome5 } from "@expo/vector-icons";
import PagerView from "react-native-pager-view";
import { useChatBot } from "@/hooks";
import { TASK_TYPE_ROLE } from "@/types";

interface PageViewRef {
  setPage: (pageIndex: number) => void;
}

export default function ChatMore() {
  const {
    conversationsMedia: { data: conversationsMediaLink = [] },
  } = useChatBot({ filter: TASK_TYPE_ROLE.TASK_COLLECT_LINKS });
  const {
    conversationsMedia: { data: conversationsMediaAudio = [] },
  } = useChatBot({ filter: TASK_TYPE_ROLE.TASK_COMPOSE_AUDIO });
  const {
    conversationsMedia: { data: conversationsMediaImage = [] },
  } = useChatBot({ filter: TASK_TYPE_ROLE.TASK_COMPOSE_IMAGE });

  console.log(conversationsMediaAudio);
  

  const [select, setSelect] = useState("image");

  const options = [
    { key: "image", label: "Image" },
    { key: "audio", label: "Audio" },
    { key: "link", label: "Link" },
  ];
  const selection = (
    <View className="flex-row justify-between mx-20 my-4 ">
      {options.map((option, index, options) => (
        <TouchableOpacity
          key={option.key}
          style={select === option.key ? styles.select : {}}
          onPress={() => {
            setSelect(option.key);
            if (pageViewRef.current) {
              pageViewRef.current.setPage(index);
            }
          }}
        >
          <Text className={`${select !== option.key && "text-gray-500"}`}>
            {option.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const handleOptionSelected = (event: any) => {
    const key = options[event.nativeEvent.position].key;
    setSelect(key);
  };

  const pageViewRef = useRef<PagerView>(null);

  const selectionContent = (
    <PagerView
      ref={pageViewRef}
      className="flex-1"
      onPageSelected={handleOptionSelected}
    >
      <FlatList
        key={"image"}
        className="mx-2"
        columnWrapperStyle={{ justifyContent: "space-between" }}
        numColumns={3}
        data={conversationsMediaImage}
        keyExtractor={(value) => value.toString()}
        renderItem={({ item }) => {
          return (
            <View style={{ width: "32%" }}>
              <Image
                style={{ height: 120, width: "100%" }}
                source={{ uri: item.content }}
                resizeMode="contain"
              ></Image>
            </View>
          );
        }}
      ></FlatList>

      <FlatList
        key={"audio"}
        data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]}
        keyExtractor={(value) => value.toString()}
        renderItem={({ item }) => {
          return (
            <View className="bg-gray-50 mx-5 mt-2 flex-row p-4 items-center justify-between">
              <View className="flex-row items-center">
                <FontAwesome5 name="play" size={24} color="#374151" />
                <View className="ml-3">
                  <Text className="mb-1">File name.mp4</Text>
                  <Text className="text-gray-500">128 kb • 30s</Text>
                </View>
              </View>
              <Feather
                className="self-end"
                name="download"
                size={24}
                color="black"
              />
            </View>
          );
        }}
      ></FlatList>

      <FlatList
        key={"link"}
        data={conversationsMediaLink}
        keyExtractor={(value) => value.toString()}
        renderItem={({ item }) => {
          return (
            <View className="bg-gray-50 mx-5 mt-2 flex-row p-4 items-center justify-between">
              <View className="flex-row items-center">
                <Feather name="link" size={24} color="black" />
                <View className="ml-3">
                  <Text className="mb-1">{item.content}</Text>
                </View>
              </View>
              <Ionicons name="open-outline" size={24} color="black" />
            </View>
          );
        }}
      ></FlatList>
    </PagerView>
  );

  return (
    <View className="flex-1">
      <ChatHeader type="chat-info"></ChatHeader>
      <View className="flex-1 bg-white">
        <Image
          className="self-center"
          source={require("@/assets/dumpData/avatar.png")}
          style={{ width: 100, height: 100 }}
        ></Image>
        <Text className="mt-2 font-bold self-center">
          Virtual Assistant for Sale
        </Text>
        {selection}
        {selectionContent}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  select: {
    paddingBottom: 6,
    borderBottomWidth: 1,
    borderColor: "black",
  },
});
