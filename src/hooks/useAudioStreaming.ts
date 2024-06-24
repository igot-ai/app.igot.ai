import { useState, useRef, useCallback } from "react";
import { Audio } from "expo-av";
import * as FileSystem from "expo-file-system";

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
  const [isStreaming, setIsStreaming] = useState(false);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [audioRecording, setAudioRecording] = useState<Audio.Recording | null>(
    null
  );
  const socketRef = useRef<WebSocket | null>(null);

  const startRecording = useCallback(async () => {
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

      setAudioRecording(recording);

      console.log({ sessionId, userId });

      onStart && onStart?.(sessionId);
      if (!userId) return;

      setupWebSocket(sessionId, userId);
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  }, [sessionId, userId]);

  const setupWebSocket = (sessionId: string, userId: string) => {
    const socket = new WebSocket("wss://webrtc.igot.app/ws");
    socket.binaryType = "arraybuffer";

    socket.onopen = () => {
      console.log("WebSocket connection opened.");
      const initialData = { session_id: sessionId, user_id: userId };
      socket.send(JSON.stringify(initialData));
    };

    socket.onmessage = (event) => {
      console.log("Received message from server:", event.data);
      if (event.data === "EOS") {
        console.log("End of stream received");
        stopStreaming();
        socket.close();
        return;
      }
      console.log("Transcript: " + event.data);
    };

    socket.onclose = (event) => {
      console.log(
        `WebSocket closed with code: ${event.code} and reason: ${event.reason}`
      );
      if (isStreaming) {
        console.log("Attempting to reconnect WebSocket...");
        setupWebSocket(sessionId, userId);
      }
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
      if (isStreaming) {
        console.log("Attempting to reconnect WebSocket...");
        setupWebSocket(sessionId, userId);
      }
    };

    socketRef.current = socket;
  };

  const stopStreaming = async () => {
    if (onStop && isStreaming) {
      onStop(sessionId);
    }

    setIsStreaming(false);
    setIsRecording(false);
    if (audioRecording) {
      await audioRecording.stopAndUnloadAsync();

      const uri = audioRecording.getURI();

      if (uri) {
        const binaryString = await FileSystem.readAsStringAsync(uri, {
          encoding: FileSystem.EncodingType.Base64,
        });

        const buffer = Uint8Array.from(atob(binaryString), (c) =>
          c.charCodeAt(0)
        );

        if (
          socketRef.current &&
          socketRef.current.readyState === WebSocket.OPEN
        ) {
          socketRef.current.send(buffer);
        }
      }
    }

    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send("EOS");
    }

    console.log("Streaming stopped.");
  };

  const toggleRecording = useCallback(() => {
    if (isRecording) {
      stopStreaming();
    } else {
      setIsStreaming(true);
      startRecording();
    }
  }, [isRecording, audioRecording]);

  return { isRecording, toggleRecording };
};
