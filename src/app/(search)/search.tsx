import {
  Text,
  TextInput,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import { useState, useRef } from "react";
import ListWithImages from "@/components/list-with-image";
import { router } from "expo-router";
import { useSearching } from "@/hooks";
import ListSearch from "@/components/list-search";
import { debounce } from "lodash";

const categories = ['Business Analysis', 'Operation', 'Content', 'Education', 'Design Creative']

const Search = () => {
  const [currentInputValue, setSearchData] = useState("");
  const [pastInputValues, setPastInputValues] = useState<string[]>([]);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const textInputRef = useRef<TextInput | null>(null);
  const [searchResult, setSearchResult] = useState("");
  const { search } = useSearching({ query: searchResult });

  const handleSearch = debounce((keyword) => {
    setSearchResult(keyword);
  }, 300);
  
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
        <View className="pt-2 ml-3">
          {search.isLoading && <ActivityIndicator className="mr-2" />}
          {search.data?.length && <Text className="text-base font-medium text-gray-500">{search.data?.length} results</Text>}
          <ListSearch items={search.data?.filter((item) => item.collection === 'BOT') || []} />
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
              {categories.map((item, idx) => (
                <TouchableOpacity onPress={() => setSearchData(item)} key={idx}>
                  <View className="bg-gray-100 rounded-full py-3 px-4">
                    <Text className="font-medium">{item}</Text>
                  </View>
                </TouchableOpacity>
              ))}
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
};
export default Search;
