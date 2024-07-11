import { useState, useEffect, useCallback } from "react";
import Voice, {
  SpeechErrorEvent,
  SpeechResultsEvent,
} from "@react-native-voice/voice";

interface IState {
  recognized: boolean;
  pitch: string;
  error: string;
  end: boolean;
  started: boolean;
  results: string[];
  partialResults: string[];
  isRecording: boolean;
}

export const useVoiceRecognition = () => {
  const [state, setState] = useState<IState>({
    recognized: false,
    pitch: "",
    error: "",
    end: false,
    started: false,
    results: [],
    partialResults: [],
    isRecording: false,
  });

  const resetState = useCallback(() => {
    setState({
      recognized: false,
      pitch: "",
      error: "",
      started: false,
      results: [],
      partialResults: [],
      end: false,
      isRecording: false,
    });
  }, [setState]);

  const startRecognizing = useCallback(async () => {
    resetState();
    try {
      await Voice.start("en-US");
    } catch (e) {
      console.error(e);
    }
  }, [resetState]);

  const stopRecognizing = useCallback(async () => {
    try {
      await Voice.stop();
      setState((prevState) => ({ ...prevState, isRecording: false }));
    } catch (e) {
      console.error(e);
    }
  }, []);

  const cancelRecognizing = useCallback(async () => {
    try {
      await Voice.cancel();
      setState((prevState) => ({ ...prevState, isRecording: false }));
    } catch (e) {
      console.error(e);
    }
  }, []);

  const destroyRecognizer = useCallback(async () => {
    try {
      await Voice.destroy();
    } catch (e) {
      console.error(e);
    }
    resetState();
  }, [resetState]);

  useEffect(() => {
    Voice.onSpeechStart = (e: any) => {
      setState((prevState) => ({
        ...prevState,
        started: true,
        isRecording: true,
      }));
    };
    Voice.onSpeechRecognized = () => {
      setState((prevState) => ({ ...prevState, recognized: true }));
    };
    Voice.onSpeechEnd = (e: any) => {
      setState((prevState) => ({
        ...prevState,
        end: true,
        started: false,
        isRecording: false,
      }));
    };
    Voice.onSpeechError = (e: SpeechErrorEvent) => {
      setState((prevState) => ({
        ...prevState,
        error: JSON.stringify(e.error),
        isRecording: false,
      }));
    };
    Voice.onSpeechResults = (e: SpeechResultsEvent) => {
      if (e.value) {
        setState((prevState) => ({ ...prevState, results: e.value! }));
      }
    };
    Voice.onSpeechPartialResults = (e: SpeechResultsEvent) => {
      if (e.value) {
        setState((prevState) => ({ ...prevState, partialResults: e.value! }));
      }
    };
    Voice.onSpeechVolumeChanged = (e: any) => {
      setState((prevState) => ({ ...prevState, pitch: e.value }));
    };

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  return {
    state,
    setState,
    resetState,
    startRecognizing,
    stopRecognizing,
    cancelRecognizing,
    destroyRecognizer,
  };
};
