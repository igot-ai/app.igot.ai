import { Text, View } from "react-native";
import { useState } from "react";
import PagerView from "react-native-pager-view";
import ChatHeader from "@/components/chat-header";

export default function ManyChats() {
  const totalPages = 3;
  const [currentPageString, setCurrentPageString] = useState("");
  const handlePageSelected = (event: any) => {
    setCurrentPageString(`${event.nativeEvent.position + 1}/${totalPages}`);
  };
  return (
    <View className="flex-1">
      <ChatHeader
        type="many-chats"
        currentPageString={currentPageString}
      ></ChatHeader>
      <PagerView
        onPageSelected={handlePageSelected}
        initialPage={0}
        className="flex-1"
      >
        <View key="1" className="flex-1">
          <Text>Display chat screen Bot 1 with its information here</Text>
        </View>
        <View key="2">
          <Text>Display chat screen Bot 2 with its information here</Text>
        </View>
        <View key="3">
          <Text>Display chat screen Bot 3 with its information here</Text>
        </View>
      </PagerView>
    </View>
  );
}
