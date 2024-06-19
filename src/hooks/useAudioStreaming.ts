import { useEffect, useRef, useState } from "react";
import {
  mediaDevices,
  MediaStream as RNMediaStream,
} from "react-native-webrtc";
import { Audio } from "expo-av";
import { useChatBot } from "./useChatBot";

interface UseAudioStreamingProps {
  sessionId: string;
  userId?: string;
  onStop?: (session_id: string) => void;
  onStart?: (session_id: string) => void;
}

export const useAudioStreaming = ({
  sessionId,
  userId,
  onStop,
  onStart,
}: UseAudioStreamingProps) => {
  const { createNewSession } = useChatBot();
  const [isStreaming, setIsStreaming] = useState(false);
  const socketRef = useRef<WebSocket | null>(null);
  const audioStreamRef = useRef<RNMediaStream | null>(null);

  useEffect(() => {
    return () => {
      // Cleanup function to stop streaming when the component unmounts
      stopStreaming();
    };
  }, []);

  const startStreaming = async () => {
    try {
      console.log("Starting streaming...");

      if (!sessionId) {
        sessionId = await createNewSession();
      }

      const stream = await mediaDevices.getUserMedia({
        audio: true,
      });

      console.log("Streaming started successfully.");

      if (onStart) {
        onStart(sessionId);
      }

      // Assuming use of expo-av for playback, adjust as necessary for your application
      const audioStream = new Audio.Sound();
      await audioStream.loadAsync({ uri: stream.toURL() });

      audioStream.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && !status.isPlaying) {
          audioStream.playAsync();
        }
      });

      if (!sessionId || !userId) return;

      setupWebSocket(sessionId, userId);

      audioStreamRef.current = stream;
    } catch (error) {
      console.error("Error starting streaming:", error);
    }
  };

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

  const stopStreaming = () => {
    if (onStop && isStreaming) {
      onStop(sessionId);
    }

    console.log("Stopping streaming...");
    setIsStreaming(false);

    if (audioStreamRef.current) {
      audioStreamRef.current.getTracks().forEach((track) => track.stop());
    }

    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send("EOS");
    }

    console.log("Streaming stopped.");
  };

  const toggleStreaming = () => {
    if (isStreaming) {
      stopStreaming();
    } else {
      setIsStreaming(true);
      startStreaming();
    }
  };

  return { isStreaming, startStreaming, stopStreaming, toggleStreaming };
};
