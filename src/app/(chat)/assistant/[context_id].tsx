import EventSource from "react-native-sse";
import "react-native-url-polyfill/auto";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
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
  Button,
} from "react-native";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import {
  useAudioStreaming,
  useChatBot,
  useOpacityAnimation,
  useSpinAnimation,
} from "@/hooks";
import { API_URLS, LLM_MODELS, SystemPromptType } from "@/constants";
import { TASK_ICONS } from "@/configs";
import { useChatStore, useSessionStore } from "@/store";
import { SESSION_ASSETS } from "@/types";
import { CHAT_API } from "@/services";
import { useQueryClient } from "@tanstack/react-query";
import { debounce, isEmpty, isObject, startCase } from "lodash";
import { Controller, useForm } from "react-hook-form";
import Markdown from "react-native-markdown-display";
import { RenderMessageContent } from "@/components";
import { Cog, Lightbulb } from "lucide-react-native";
import Animated from "react-native-reanimated";
import { DrawerItem, createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { router, useLocalSearchParams } from "expo-router";
import dayjs from 'dayjs';

const MESSAGE_PROCESSING_MODE = "**Processing...**";
const AUDIO_MESSAGE_RECORDING_MODE = "**Recording...**";

const Drawer = createDrawerNavigator();

interface Session {
  session_id: string;
  response: string;
  created_at: string;
  rank: number;
}

interface VirtualAssistantProps {
  contextId: string;
  sessionId: string;
}

interface CustomDrawerContentProps {
  sessions: any;
  navigation: any;
  contextInfo: any;
  contextId?: string;
}

const VirtualAssistant = (props: VirtualAssistantProps) => {
  const { contextId, sessionId } = props;
  const queryClient = useQueryClient();
  const opacityStyle = useOpacityAnimation();
  const spinStyle = useSpinAnimation();
  const { register, setValue, setFocus, reset, handleSubmit, control } =
    useForm<{
      message: string;
      session_id: string;
    }>();

  const {
    contextInfo,
    agentTasks,
    dataTasks,
    createNewSession,
    sendPrompt,
    getTaskType,
  } = useChatBot({ contextId, sessionId });

  const {
    conversations,
    setConversations,
    task_type,
    setTaskType,
    setLastConversationSize,
  } = useChatStore();

  const { session_id, setRunningSessionId } = useSessionStore();
  const [isRunning, setIsRunning] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [typingResponse, setTypingResponse] = useState("");
  const [response, setResponse] = useState("");
  const flatListRef = useRef<FlatList>(null);

  const { toggleRecording, isRecording } = useAudioStreaming({
    sessionId: session_id,
    userId: contextInfo?.data?.user_id,
    onStart: (session) => {
      setRunningSessionId(session);
      setTypingResponse(AUDIO_MESSAGE_RECORDING_MODE);
    },
    onStop: async (session) => {
      await sseRunner(session);
    },
  });

  useEffect(() => {
    if (!session_id) return;
    register("session_id");
    setValue("session_id", session_id);
  }, [register, session_id, setValue]);

  const handleSendMessage = handleSubmit(async (data) => {
    setTypingResponse(MESSAGE_PROCESSING_MODE);
    if (!data.session_id && session_id) {
      data.session_id = session_id;
    }

    if (!data.message) return;

    if (!data.session_id && !session_id) {
      data.session_id = await createNewSession();
    }
    await sendPrompt(data);
    reset({ message: "" });
    await sseRunner(data.session_id);
  });

  const sseRunner = async (session_id: string) => {
    try {
      const timestamp = parseInt((new Date().getTime() / 1000).toString());

      const eventSource = new EventSource(
        `${API_URLS.BASE_API_URL}/sse/sub/${session_id}?time=${timestamp}`
      );

      setLastConversationSize(null);
      eventSource.addEventListener("message", async (event) => {
        if (!event.data) return;

        const data = JSON.parse(event.data);

        setResponse(data.response);

        if (data.response === "_SUCCESS" || data.response === "_ERROR") {
          eventSource.close();
        }

        if (data.id > 0 && SESSION_ASSETS.includes(data.role)) {
          const conversation = {
            ...data,
            content: (data.response as string).replace(/```/, ""),
            created_at: data.timestamp,
          };

          setConversations({ conversations: [conversation], prepend: false });
        }
      });

      eventSource.addEventListener("error", (error) => {
        console.error("EventSource failed:", error);
        eventSource.close();
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (response) {
      const taskType = getTaskType(response);
      if (taskType) {
        setTaskType(taskType);
      }

      if (response === "_SUCCESS" || response === "_ERROR") {
        setIsRunning(false);
        setIsThinking(false);
        setTaskType("");
        setResponse("");
        setRunningSessionId("");
        setTypingResponse("");
        setFocus("message");
        queryClient.invalidateQueries({
          queryKey: [CHAT_API.getSessions.name],
        });
        queryClient.invalidateQueries({
          queryKey: [CHAT_API.getConversations.name],
        });

        return;
      }
      if (response === "[" || response === "```" || response === "```yaml") {
        setIsRunning(false);
        setIsThinking(true);
        setTypingResponse("**Thinking...**");
      }
      if (isThinking && !isRunning) {
        setTypingResponse("**Thinking...**");
        // setTypingResponse(
        //   isObject(response) ? JSON.stringify(response) : response
        // );
      }
      const regex = /Answer:\s*(.*?)(?=\n|$)/;
      const match = regex.exec(response);
      const answer = match ? match[1].trim() : "";

      if (
        (!isObject(response) && answer) ||
        response === "STARTING" ||
        String(response).includes("[/answer]")
      ) {
        setIsThinking(false);
        setIsRunning(true);
        setTypingResponse("**Running...**\n");
      }

      if (isRunning && !isThinking) {
        if ((response as any)?.action) {
          setTypingResponse(
            () =>
              `${typingResponse}\n\n${startCase((response as any)?.action)}: ${(response as any)?.key
              }\n`
          );
        } else {
          setTypingResponse(`${answer || "**Running...**"}\n`);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

  const handleAttachPress = async () => {
    let result = await DocumentPicker.getDocumentAsync({});

    if (!result.canceled) {
      console.log("Document picked:", result);
      // Handle the selected document
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
      keyboardVerticalOffset={100}
    >
      <View className="flex-1 bg-white">
        <View className="flex-1 px-3">
          <FlatList
            inverted={conversations.length !== 0 || typingResponse ? true : false}
            ref={flatListRef}
            data={conversations.toReversed()}
            keyExtractor={(conversation) => "id_" + conversation.id}
            ListFooterComponent={() => {
              return (
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                  <ScrollView style={{ flex: 1 }}>
                    <Image
                      source={{ uri: contextInfo?.data?.snapshot?.cover }}
                      style={{ width: "100%", height: 150, borderRadius: 16 }}
                    />
                    <Image
                      source={{ uri: contextInfo?.data?.snapshot?.logo }}
                      style={{
                        resizeMode: "contain",
                        width: "100%",
                        height: 110,
                        position: "absolute",
                        top: 100,
                        borderColor: "white",
                      }}
                    />
                    <Text
                      style={{
                        textAlign: "center",
                        marginTop: 70,
                        fontWeight: "bold",
                      }}
                    >
                      {contextInfo?.data?.name}
                    </Text>
                    <Text
                      style={{
                        textAlign: "center",
                        marginTop: 10,
                        marginHorizontal: 10,
                      }}
                    >
                      {contextInfo?.data?.snapshot?.bio}
                    </Text>
                    <View className="mt-5 p-2" style={styles.grayBox}>
                      <Text className="mb-1" style={styles.grayColorText}>
                        Agents
                      </Text>
                      <View className="flex flex-row gap-4 ">
                        {agentTasks?.map((task) => {
                          const Icon = TASK_ICONS[task];
                          return (
                            <View
                              key={task}
                              className="basis-1/2 items-center	flex-row space-x-2"
                            >
                              <Icon size={20} color="black" />
                              <Text>{SystemPromptType[task]}</Text>
                            </View>
                          );
                        })}
                      </View>
                      {dataTasks.length > 0 && (
                        <React.Fragment>
                          <Text
                            className="mt-3 mb-1"
                            style={styles.grayColorText}
                          >
                            Data
                          </Text>
                          <View className="flex flex-row gap-4 ">
                            {dataTasks?.map((task) => {
                              const Icon = TASK_ICONS[task];
                              return (
                                <View
                                  key={task}
                                  className="basis-1/2 items-center	flex-row space-x-2"
                                >
                                  <Icon size={20} color="black" />
                                  <Text>{SystemPromptType[task]}</Text>
                                </View>
                              );
                            })}
                          </View>
                        </React.Fragment>
                      )}
                    </View>

                    <View>
                      <Text className="mt-6 font-bold">Try saying</Text>
                      <View>
                        {contextInfo.data?.label?.map((item) => (
                          <TouchableOpacity
                            key={item}
                            className="mt-2 p-4 items-center flex-row justify-between"
                            style={styles.grayBox}
                            onPress={() => setValue("message", item)}
                          >
                            <Text>{item}</Text>
                            <MaterialIcons name="arrow-forward" size={20} />
                          </TouchableOpacity>
                        ))}
                      </View>
                    </View>
                  </ScrollView>
                </TouchableWithoutFeedback>
              );
            }}
            ListHeaderComponent={() => {
              const Icon = TASK_ICONS[task_type];
              return (
                typingResponse && (
                  <View>
                    <View className="items-center	flex-row space-x-2">
                      <Image
                        source={{ uri: contextInfo?.data?.snapshot?.logo }}
                        style={{ width: 40, height: 40 }}
                      ></Image>
                      <Text className="font-bold mt-7 mb-4">
                        {contextInfo?.data?.name}
                      </Text>
                      {task_type && (
                        <Icon size={20} className="text-indigo-400" />
                      )}
                      {isThinking && (
                        <Animated.View style={[opacityStyle]}>
                          <Lightbulb />
                        </Animated.View>
                      )}
                      {isRunning && (
                        <Animated.View style={[spinStyle]}>
                          <Cog />
                        </Animated.View>
                      )}
                    </View>
                    <Markdown>{typingResponse}</Markdown>
                  </View>
                )
              );
            }}
            renderItem={({ item }) => {
              return item.role !== "user" ? (
                <View className="mt-3 mb-2 w-10/12">
                  <View className="items-center	flex-row">
                    <Image
                      source={{ uri: contextInfo?.data?.snapshot?.logo }}
                      style={{ width: 40, height: 40 }}
                    ></Image>
                    <Text className="ml-2 font-bold mt-7 mb-4">
                      {contextInfo?.data?.name}
                    </Text>
                  </View>
                  <RenderMessageContent message={item} />
                  <View className="flex-row my-3">
                    <TouchableOpacity className="border border-black self-start flex-row py-1 px-2 rounded-md">
                      <MaterialIcons name="autorenew" size={20} color="black" />
                      <Text> Re-generate</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="ml-3 self-start border border-gray-200 flex-row p-1.5  rounded-3xl">
                      <MaterialIcons
                        name="content-copy"
                        size={17}
                        color="black"
                      />
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
              ) : (
                // User Message
                // Check Message Type
                // item.content.attachments.length > 0 &&
                //   item.content.attachments[0].type === "audio" ? (
                //   <View className="bg-purple-100 p-5 rounded-l-xl rounded-b-xl mt-3 mb-2">
                //     <TouchableOpacity
                //       onPress={() => playRecording(item.content.attachments[0].uri)}
                //     >
                //       <View className="items-center	flex-row">
                //         <MaterialIcons name="play-circle" size={20} color="black" />
                //         <Text style={{ marginLeft: 5 }}>Play Recording</Text>
                //       </View>
                //     </TouchableOpacity>
                //   </View>
                // ) : (
                <View className="bg-purple-100 py-2 px-3 rounded-l-xl rounded-b-xl mt-3 mb-2 w-10/12 ml-auto">
                  <Markdown>{item.content}</Markdown>
                </View>
              );
              // );
            }}
          />
        </View>
        {/* Chat Input */}
        <View
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
          <Controller
            {...{ control }}
            name="message"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Write to start"
                placeholderTextColor={"#6B7280"}
                onSubmitEditing={handleSendMessage} // Handle submit when the "Go" button is pressed
                multiline={false}
                returnKeyType="send" // Display "Go" button on iOS keyboard
                onChangeText={onChange}
                {...{ value, onBlur }}
                style={[styles.input]}
              />
            )}
          />
          {/* Record Button */}
          <TouchableOpacity style={styles.recordButton} onPress={toggleRecording}>
            <MaterialIcons
              name={isRecording ? "stop" : "mic"}
              size={24}
              color="black"
              style={{ marginRight: 5 }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

function CustomDrawerContent(props: CustomDrawerContentProps) {
  const { sessions, navigation, contextInfo, contextId } = props;
  const [search, setSearch] = useState('');
  const [initialSession, setInitialSession] = useState<Record<string, Session[]>>({});
  const [filteredSession, setFilteredSession] = useState<Record<string, Session[]>>({});
  const { getConversations, createNewSession } = useChatBot({ contextId });
  const { session_id, setSessionId } = useSessionStore();
  const { setLastConversationSize, resetConversations } = useChatStore();

  const handleChange = (keyword: string) => {
    setSearch(keyword);
    handleSearch(keyword);
  };

  const handleSearch = debounce((keyword) => {
    if (isEmpty(keyword)) {
      setFilteredSession(initialSession);
      return;
    }
    const filtered: Record<string, Session[]> = {};
    for (const [date, items] of Object.entries(initialSession)) {
      const filteredItems = items.filter((item: Session) =>
        item.response.toLowerCase().includes(keyword.toLowerCase())
      );
      if (filteredItems.length > 0) {
        filtered[date] = filteredItems;
      }
    }
    setFilteredSession(filtered);
  }, 300);


  const groupDataByDate = (data: Record<string, any>[]) => {
    return data.reduce((acc, item) => {
      const date = dayjs(item.created_at).format('DD/MM/YYYY');
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(item);
      return acc;
    }, {});
  };

  const selectSession = useCallback(
    async (id: string, response: string) => {
      setLastConversationSize(null);
      await getConversations.mutateAsync({ session_id: id });
      setSessionId(id);
      navigation.navigate(`${response?.substring(0, 100)}-${id}`)
    },
    [getConversations, setSessionId]
  );

  useEffect(() => {
    if (sessions.data) {
      setInitialSession(groupDataByDate(sessions.data));
      setFilteredSession(groupDataByDate(sessions.data));
    }
  }, [sessions?.data]);

  return (
    <View className="space-y-1 mt-16">
      <View className="px-2 flex-row items-center">
        <View className="flex-row gap-2">
          <Image
            source={{ uri: contextInfo?.data?.snapshot?.logo }}
            style={{
              resizeMode: "contain",
              width: 50,
              height: 50,
              borderRadius: 10
            }}
          />
          <View>
            <Text className="text-lg text-gray-500">{LLM_MODELS.find((item) => item.value === contextInfo?.data?.snapshot?.model)?.name}</Text>
            <Text className="text-lg font-semibold truncate">{contextInfo?.data?.name}</Text>
          </View>
        </View>
        <View
          className="ml-auto rounded-full border border-gray-300 p-3 items-center"
        >
          <TouchableOpacity onPress={() => {
            createNewSession()
            navigation.closeDrawer();
          }}>
            <FontAwesome5 name="edit" size={16} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <Button
        title="Back to list bot"
        onPress={() => {
          resetConversations();
          router.back()
        }}
      />
      <View>
        <KeyboardAvoidingView
          keyboardVerticalOffset={-7}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.inputContainer}
        >
          <TextInput
            className="border border-gray-300 text-gray-900 text-base font-normal rounded-lg block w-full p-2.5"
            placeholder="Search by conversation name"
            onChangeText={handleChange}
            value={search}
          />
        </KeyboardAvoidingView>
      </View>
      <ScrollView>
        {!isEmpty(filteredSession) ? Object.entries(filteredSession).map(([date, items]) => (
          <View key={date} className="px-2">
            <Text className="text-gray-900 font-medium">
              {dayjs().format('DD/MM/YYYY') === date ? 'Today' : date}
            </Text>
            {items.map((item: Session, idx: number) => (
              <DrawerItem
                style={{ backgroundColor: item.session_id === session_id ? '#DDDDDD' : '#fff' }}
                key={idx}
                label={item?.response?.substring(0, 100)}
                onPress={() => selectSession(item.session_id, item.response)}
              />
            ))}
          </View>
        )) :
          <View className="p-6 flex flex-col items-center justify-center space-y-1">
            <Text className="text-gray-500 text-sm">No data available</Text>
          </View>
        }
      </ScrollView>
    </View>
  );
}

const NavigationSession = () => {
  const { context_id } = useLocalSearchParams();
  const { sessions, contextInfo } = useChatBot({ contextId: context_id?.toString() });

  return (
    <NavigationContainer independent={true}>
      <Drawer.Navigator
        initialRouteName="new"
        drawerContent={props =>
          <CustomDrawerContent
            {...props}
            sessions={sessions}
            contextInfo={contextInfo}
            contextId={context_id?.toString()}
          />
        }
      >
        <Drawer.Screen
          key="new"
          name="new"
          options={{
            title: contextInfo?.data?.name,
            headerRight: () => (
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
            )
          }}
        >
          {(props: any) => <VirtualAssistant sessionId={null} contextId={context_id} {...props} />}
        </Drawer.Screen>
        {sessions.data.map((item, index) => (
          <Drawer.Screen
            key={index}
            name={`${item?.response?.substring(0, 100)}-${item.session_id}`}
            options={{
              title: contextInfo?.data?.name,
              headerRight: () => (
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
              )
            }}
          >
            {(props: any) => <VirtualAssistant sessionId={item.session_id} contextId={context_id} {...props} />}
          </Drawer.Screen>
        ))}
      </Drawer.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
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

export default NavigationSession;
