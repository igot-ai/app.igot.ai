import { useState, useRef, useCallback } from "react";
import { Audio } from "expo-av";
import { useChatBot } from "./useChatBot";

type WebSocketAudioHook = {
  isRecording: boolean;
  toggleRecording: () => void;
};

interface UseAudioStreamingOptions {
  sessionId: string;
  userId?: string;
  onStart?: (session: string) => void;
  onStop?: (session: string) => void;
}

export const useAudioStreaming = ({
  sessionId,
  userId,
  onStart,
  onStop,
}: UseAudioStreamingOptions): WebSocketAudioHook => {
  const { createNewSession } = useChatBot();

  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [audioRecording, setAudioRecording] = useState<Audio.Recording | null>(
    null
  );
  const webSocketRef = useRef<WebSocket | null>(null);

  const startRecording = async () => {
    try {
      if (!sessionId) {
        sessionId = await createNewSession();
      }
      console.log("Requesting permissions..");
      await Audio.requestPermissionsAsync();

      setIsRecording(true);
      console.log("Starting recording..");
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      console.log("🚀 ~ startRecording ~ recording:", recording);

      // Initialize WebSocket connection
      webSocketRef.current = new WebSocket("wss://webrtc.igot.app/ws");

      // if (!sessionId || !userId) return;

      webSocketRef.current.onopen = () => {
        console.log("WebSocket connection opened");
        console.log({ sessionId, userId });
        webSocketRef.current?.send(
          JSON.stringify({ session_id: sessionId, user_id: userId })
        );
      };

      webSocketRef.current.onclose = () => {
        console.log("WebSocket connection closed");
      };

      webSocketRef.current.onmessage = (e) => console.log(e.data);

      webSocketRef.current.onerror = (error) => {
        console.error("WebSocket error", error);
      };

      setAudioRecording(recording);
      onStart && onStart?.(sessionId);
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  };

  const stopRecording = async () => {
    console.log("Stopping recording..");
    if (audioRecording) {
      setIsRecording(false);
      await audioRecording.stopAndUnloadAsync();

      const uri = audioRecording.getURI();
      console.log("Recording stopped and stored at", uri);

      if (uri) {
        console.log("🚀 ~ stopRecording ~ uri:", uri);
        const response = await fetch(uri);
        console.log("🚀 ~ stopRecording ~ response:", response);
        const recordingBuffer = await response.arrayBuffer();
        console.log("🚀 ~ stopRecording ~ recordingBuffer:", recordingBuffer);

        if (webSocketRef.current?.readyState === WebSocket.OPEN) {
          console.log("triggering");
          webSocketRef.current.send(recordingBuffer);
        } else {
          console.error("WebSocket is not open");
        }
      }

      setAudioRecording(null);
      webSocketRef.current?.close();
      webSocketRef.current = null;
      onStop && onStop?.(sessionId);
    }
  };

  console.log({ sessionId, userId });

  const toggleRecording = useCallback(() => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  }, [isRecording, audioRecording]);

  return { isRecording, toggleRecording };
};
