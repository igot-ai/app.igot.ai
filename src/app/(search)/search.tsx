import {
  Text,
  TextInput,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import { useState, useRef } from "react";
import ListWithImages from "@/components/list-with-image";
import { router } from "expo-router";

// Dummy Data
const searchResults = [
  {
    title: "Virtual Assistant for Sale",
    imageSource: require("@/assets/dumpData/1.png"),
    description:
      "You are a Product Spec Writer. Ask users about neccessary information, then write a product spec with sample as below: 1. Introduction Product scope:",
  },
  {
    title: "Virtual Assistant for Sale",
    imageSource: require("@/assets/dumpData/2.png"),
    description:
      "You are a Product Spec Writer. Ask users about neccessary information, then write a product spec with sample as below: 1. Introduction Product scope:",
  },
  {
    title: "Virtual Assistant for Sale",
    imageSource: require("@/assets/dumpData/3.png"),
    description:
      "You are a Product Spec Writer. Ask users about neccessary information, then write a product spec with sample as below: 1. Introduction Product scope:",
  },
];

export default function Search() {
  const [currentInputValue, setSearchData] = useState("");
  const [pastInputValues, setPastInputValues] = useState<string[]>([]);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const textInputRef = useRef<TextInput>();
  const [searchResult, setSearchResult] = useState("");

  const handleSearch = () => {
    // Your search logic here
    setSearchResult(currentInputValue);
    setPastInputValues([...pastInputValues, currentInputValue]);
  };

  const handleContainerPress = () => {
    if (textInputRef.current) {
      textInputRef.current.focus();
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="flex-1 bg-white">
        <View className="flex-row mt-14 items-center">
          <TouchableOpacity
            onPress={() => {
              router.back();
            }}
          >
            <View className="ml-4">
              <MaterialIcons name="arrow-back-ios" size={25} color="black" />
            </View>
          </TouchableOpacity>
          <TouchableWithoutFeedback
            onPress={handleContainerPress}
            className="grow"
          >
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
        {/* Past Search */}
        {pastInputValues.length > 0 && !currentInputValue && (
          <View className="mx-4 my-4">
            <View className="flex-row mb-3">
              <Feather name="clock" size={16} color="black" />
              <Text className="text-gray-500 font-medium ml-2">History</Text>
            </View>
            <FlatList
              data={pastInputValues}
              keyExtractor={(item, index) => index.toString()}
              renderItem={(item) => {
                return (
                  <View className="flex-row justify-between mb-3 border-b border-gray-100 pb-2">
                    <Text>{item.item}</Text>
                    <TouchableOpacity
                      onPress={() => {
                        setPastInputValues(
                          pastInputValues.filter(
                            (_, index) => index !== item.index
                          )
                        );
                      }}
                    >
                      <MaterialIcons name="close" size={20} color="black" />
                    </TouchableOpacity>
                  </View>
                );
              }}
            />
          </View>
        )}
        {/* Suggestion */}
        {(!searchResult || isInputFocused) && (
          <View className="mx-4 my-4">
            <Text className="text-gray-500 font-medium mb-3">Categories</Text>
            <View className="flex-row flex-wrap gap-2">
              <View className="bg-gray-100 rounded-full py-3 px-4">
                <Text className="font-medium">Content</Text>
              </View>
              <View className="bg-gray-100 rounded-full py-3 px-4">
                <Text className="font-medium">SEO</Text>
              </View>
              <View className="bg-gray-100 rounded-full py-3 px-4">
                <Text className="font-medium">Marketing</Text>
              </View>
              <View className="bg-gray-100 rounded-full py-3 px-4">
                <Text className="font-medium">Image</Text>
              </View>
              <View className="bg-gray-100 rounded-full py-3 px-4">
                <Text className="font-medium">Productivity</Text>
              </View>
            </View>
          </View>
        )}
        {/* Display result */}
        {searchResult && !isInputFocused && (
          <View className="mx-4 my-4">
            <Text className="text-gray-500 font-medium mb-3">3 result</Text>
            <ListWithImages items={[]} />
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}
