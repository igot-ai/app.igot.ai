import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  FlatList,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import { Audio } from "expo-av";
import dummyMessages from "@/data/messages.json";

const VirtualAssistant = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(dummyMessages.messages);
  const [isInputFocused, setInputFocused] = useState(false);
  const [recording, setRecording] = useState(null);
  const recordingInstance = useRef(null);
  const soundInstance = useRef(null);
  const [recordingURI, setRecordingURI] = useState("");
  const flatListRef = useRef(null);
  const textInputRef = useRef(null);

  const chatBotData = {
    name: "Virtual Assistant for Sale",
    wallpaper: require("@/assets/dumpData/1.png"),
    avatar: require("@/assets/dumpData/avatar.png"),
    greetingText:
      "Hello, I'm the assistant here to help you create a game storyboard for a pet game, role-playing.",
    agents: { textGenerate: true, audioGenerate: true, searchOnline: true },
    data: { googleDrive1: true, googleDrive2: true },
    customTool: { custom1: true },
  };

  const handleSendMessage = () => {
    if (message.trim() !== "") {
      // Handle sending message logic here
      console.log("Sending message:", message);
      // Clear the message input
      setMessages([
        ...messages,
        {
          messageId: "unique-identifier1" + new Date().toISOString(),
          sender: {
            userId: "botid100",
            username: "Bot name",
            avatarUrl: "https://example.com/avatar.jpg",
          },
          recipient: {
            userId: "user1",
            username: "Bot name",
            avatarUrl: "https://example.com/avatar.jpg",
          },
          content: {
            text: message,
            attachments: [],
          },
          timestamp: new Date().toISOString(),
        },
      ]);
      setMessage("");
    }
  };

  const handleAttachPress = async () => {
    let result = await DocumentPicker.getDocumentAsync({});

    if (!result.canceled) {
      console.log("Document picked:", result);
      // Handle the selected document
    }
  };

  const startRecording = async () => {
    try {
      if (textInputRef.current) {
        textInputRef.current.focus();
      }
      console.log("Requesting permissions..");
      const permission = await Audio.requestPermissionsAsync();
      if (permission.status === "granted") {
        console.log("Starting recording..");
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });

        const { recording } = await Audio.Recording.createAsync(
          Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
        );
        recordingInstance.current = recording;
        setRecording(recording);
        console.log("Recording started");
      } else {
        console.log("Permission to access microphone is required!");
      }
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  };

  const stopRecording = async () => {
    console.log("Stopping recording..");
    if (recordingInstance.current) {
      await recordingInstance.current.stopAndUnloadAsync();
      const uri = recordingInstance.current.getURI();
      console.log("Recording stopped and stored at", uri);
      setRecordingURI(uri); // Save the URI for playback
      setMessages([
        ...messages,
        {
          messageId: "unique-identifier" + new Date().toISOString(),
          sender: {
            userId: "botid100",
            username: "Bot name",
            avatarUrl: "https://example.com/avatar.jpg",
          },
          recipient: {
            userId: "user1",
            username: "Bot name",
            avatarUrl: "https://example.com/avatar.jpg",
          },
          content: {
            text: "",
            attachments: [
              {
                type: "audio",
                uri: uri,
                duration: 120,
              },
            ],
          },
          timestamp: "2024-06-07T10:20:30Z",
        },
      ]);
      // Handle the recorded audio file URI
      setRecording(null);
      Keyboard.dismiss();
    }
  };

  const toggleRecording = () => {
    if (recording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const playRecording = async (uri) => {
    if (recordingURI) {
      try {
        const { sound } = await Audio.Sound.createAsync(
          { uri: uri },
          { shouldPlay: true }
        );
        soundInstance.current = sound;
        await sound.playAsync();
      } catch (error) {
        console.log("Error playing the recording:", error);
      }
    }
  };

  const moveChatToBottom = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToOffset({ offset: 0, animated: true });
    }
  };

  return (
    <View style={styles.container} className="mt-2">
      <View style={styles.content}>
        <FlatList
          inverted
          ref={flatListRef}
          // onViewableItemsChanged={moveChatToBottom}
          onContentSizeChange={moveChatToBottom}
          ListFooterComponent={() => {
            return (
              <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView style={{ flex: 1 }}>
                  <Image
                    source={chatBotData.wallpaper}
                    style={{ width: "100%", height: 150, borderRadius: 16 }}
                  ></Image>
                  <Image
                    source={chatBotData.avatar}
                    style={{
                      resizeMode: "contain",
                      width: "100%",
                      height: 110,
                      position: "absolute",
                      top: 100,
                      borderColor: "white",
                    }}
                  ></Image>
                  <Text
                    style={{
                      textAlign: "center",
                      marginTop: 70,
                      fontWeight: "bold",
                    }}
                  >
                    {chatBotData.name}
                  </Text>
                  <Text
                    style={{
                      textAlign: "center",
                      marginTop: 10,
                      marginHorizontal: 10,
                    }}
                  >
                    {chatBotData.greetingText}
                  </Text>
                  <View className="mt-5 p-2" style={styles.grayBox}>
                    <Text className="mb-1" style={styles.grayColorText}>
                      Agents
                    </Text>
                    <View className="flex flex-row gap-4 ">
                      {chatBotData.agents.textGenerate && (
                        <View className="basis-1/2 items-center	flex-row">
                          <MaterialIcons
                            name="text-format"
                            size={20}
                            color="black"
                          />
                          <Text>Text generate</Text>
                        </View>
                      )}
                      {chatBotData.agents.audioGenerate && (
                        <View className="basis-1/2 items-center	flex-row">
                          <MaterialIcons
                            name="audio-file"
                            size={20}
                            color="black"
                          />
                          <Text> Generate Audio</Text>
                        </View>
                      )}
                    </View>
                    {chatBotData.agents.searchOnline && (
                      <View className="items-center	flex-row mt-2">
                        <MaterialIcons
                          name="manage-search"
                          size={20}
                          color="black"
                        />
                        <Text> Search online</Text>
                      </View>
                    )}
                    <Text className="mt-3 mb-1" style={styles.grayColorText}>
                      Data
                    </Text>
                    <View className="flex flex-row gap-4 ">
                      {chatBotData.data.googleDrive1 && (
                        <View className="basis-1/2 items-center	flex-row">
                          <MaterialIcons
                            name="add-to-drive"
                            size={20}
                            color="black"
                          />
                          <Text> Google drive 1</Text>
                        </View>
                      )}
                      {chatBotData.data.googleDrive2 && (
                        <View className="basis-1/2 items-center	flex-row">
                          <MaterialIcons
                            name="add-to-drive"
                            size={20}
                            color="black"
                          />
                          <Text> Google drive 2</Text>
                        </View>
                      )}
                    </View>
                    <Text className="mt-3 mb-1" style={styles.grayColorText}>
                      Custom Tool
                    </Text>
                    {chatBotData.agents.searchOnline && (
                      <View className="items-center	flex-row">
                        <MaterialIcons
                          name="app-settings-alt"
                          size={20}
                          color="black"
                        />
                        <Text> Custom 1</Text>
                      </View>
                    )}
                  </View>

                  <View>
                    <Text className="mt-6 font-bold">Try saying</Text>
                    <TouchableOpacity>
                      <View
                        className="mt-2 p-4 items-center flex-row justify-between"
                        style={styles.grayBox}
                      >
                        <Text>Write a storyboard for a samurai game</Text>
                        <MaterialIcons name="arrow-forward" size={20} />
                      </View>
                    </TouchableOpacity>
                  </View>
                </ScrollView>
              </TouchableWithoutFeedback>
            );
          }}
          data={messages.toReversed()}
          keyExtractor={(item) => item.messageId}
          renderItem={({ item }) => {
            return item.sender.userId == "user1" ? (
              <View className="mt-3 mb-2">
                <View className="items-center	flex-row">
                  <Image
                    source={chatBotData.avatar}
                    style={{ width: 40, height: 40 }}
                  ></Image>
                  <Text className="ml-2 font-bold mt-7 mb-4">
                    {item.sender.username}
                  </Text>
                </View>
                <Text className="leading-5">{item.content.text}</Text>
                <View className="flex-row my-3">
                  <TouchableOpacity className="border border-black self-start flex-row py-1 px-2  rounded-md">
                    <MaterialIcons name="autorenew" size={20} color="black" />
                    <Text> Re-generate</Text>
                  </TouchableOpacity>
                  <TouchableOpacity className="ml-3 self-start border border-gray-200 flex-row p-1  rounded-3xl">
                    <MaterialIcons name="autorenew" size={20} color="black" />
                  </TouchableOpacity>
                  <TouchableOpacity className="ml-3 self-start border border-gray-200 flex-row p-1  rounded-3xl">
                    <MaterialIcons
                      name="bookmark-outline"
                      size={20}
                      color="black"
                    />
                  </TouchableOpacity>
                  <TouchableOpacity className="ml-3 self-start border border-gray-200 flex-row p-1  rounded-3xl">
                    <MaterialIcons
                      name="thumb-up-off-alt"
                      size={20}
                      color="black"
                    />
                  </TouchableOpacity>
                  <TouchableOpacity className="ml-3 self-start border border-gray-200 flex-row p-1  rounded-3xl">
                    <MaterialIcons
                      name="thumb-down-off-alt"
                      size={20}
                      color="black"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            ) : // User Message
            // Check Message Type
            item.content.attachments.length > 0 &&
              item.content.attachments[0].type === "audio" ? (
              <View className="bg-purple-100 p-5 rounded-l-xl rounded-b-xl mt-3 mb-2">
                <TouchableOpacity
                  onPress={() => playRecording(item.content.attachments[0].uri)}
                >
                  <View className="items-center	flex-row">
                    <MaterialIcons name="play-circle" size={20} color="black" />
                    <Text style={{ marginLeft: 5 }}>Play Recording</Text>
                  </View>
                </TouchableOpacity>
              </View>
            ) : (
              <View className="bg-purple-100 p-5 rounded-l-xl rounded-b-xl mt-3 mb-2">
                <Text>{item.content.text}</Text>
              </View>
            );
          }}
        />
      </View>
      {/* Chat Input */}
      <KeyboardAvoidingView
        keyboardVerticalOffset={-7}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.inputContainer}
      >
        {/* Attach Button */}
        <TouchableOpacity
          style={styles.attachButton}
          onPress={handleAttachPress}
        >
          <MaterialIcons name="attach-file" size={24} color="black" />
        </TouchableOpacity>
        {/* TextInput */}
        <TextInput
          ref={textInputRef}
          placeholder="Write to start"
          placeholderTextColor={"#6B7280"}
          value={message}
          onChangeText={setMessage}
          onSubmitEditing={handleSendMessage} // Handle submit when the "Go" button is pressed
          multiline={false}
          returnKeyType="send" // Display "Go" button on iOS keyboard
          onFocus={() => setInputFocused(true)}
          onBlur={() => setInputFocused(false)}
          style={[styles.input, isInputFocused && styles.inputFocused]}
        />
        {/* Record Button */}
        <TouchableOpacity style={styles.recordButton} onPress={toggleRecording}>
          <MaterialIcons
            name={recording ? "stop" : "mic"}
            size={24}
            color="black"
            style={{ marginRight: 5 }}
          />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  content: {
    flex: 1,
    paddingTop: 100, // Adjust based on the height of the fixed view
    paddingHorizontal: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "white",
  },
  input: {
    flex: 1,
    minHeight: 40,
    maxHeight: 100,
    borderWidth: 1,
    backgroundColor: "#F9FAFB",
    borderColor: "#D1D5DB",
    borderRadius: 50,
    paddingHorizontal: 15,
    paddingVertical: 20,
    marginBottom: 15,
  },
  inputFocused: {
    borderColor: "#111928",
  },
  attachButton: {
    paddingLeft: 10,
    paddingRight: 17,
    paddingBottom: 10,
  },
  recordButton: {
    paddingLeft: 15,
    paddingRight: 5,
    paddingBottom: 10,
  },
  grayColorText: {
    color: "#6B7280",
  },
  grayBox: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
  },
});

export default VirtualAssistant;
