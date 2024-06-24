import ListWithImages from "@/components/list-with-image";
import { useBot } from "@/hooks";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useRef, useState } from "react";
import {
  Keyboard,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const ChatList = () => {
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [currentInputValue, setSearchData] = useState("");
  const [pastInputValues, setPastInputValues] = useState<string[]>([]);
  const [searchResult, setSearchResult] = useState("");
  const { bots } = useBot();

  const textInputRef = useRef<TextInput | null>(null);
  const handleContainerPress = () => {
    if (textInputRef.current) {
      textInputRef.current.focus();
    }
  };

  const handleSearch = () => {
    // Your search logic here
    setSearchResult(currentInputValue);
    setPastInputValues([...pastInputValues, currentInputValue]);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="flex-1 bg-white">
        <View className="flex-row mt-14">
          <TouchableWithoutFeedback onPress={handleContainerPress}>
            <View
              className="mx-3 p-3 flex-row items-center flex-1 bg-gray-50 border rounded-full"
              style={{
                borderColor: isInputFocused ? "black" : "#6B7280",
              }}
            >
              <MaterialIcons
                name="search"
                size={24}
                color="#6B7280"
                style={{ marginRight: 5 }}
              />
              <TextInput
                className="flex-1"
                ref={textInputRef}
                placeholder="Search"
                placeholderTextColor={"#6B7280"}
                value={currentInputValue}
                onChangeText={setSearchData}
                onSubmitEditing={handleSearch} // Handle submit when the "Go" button is pressed
                multiline={false}
                returnKeyType="go"
                onFocus={() => setIsInputFocused(true)}
                onBlur={() => {
                  setIsInputFocused(false);
                }}
              />
              {currentInputValue && (
                <TouchableOpacity
                  onPress={() => {
                    setSearchData("");
                  }}
                >
                  <MaterialIcons name="close" size={20} color="black" />
                </TouchableOpacity>
              )}
            </View>
          </TouchableWithoutFeedback>
        </View>

        {/* Display chat list here */}
        {/* ListWithImage here is only used for demo */}  
        <ScrollView className="flex-1 mt-1 pt-2 ml-3">
          <Text className="text-base font-medium text-gray-500">Today</Text>
            <ListWithImages items={bots.data || []} />
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
};
export default ChatList;
