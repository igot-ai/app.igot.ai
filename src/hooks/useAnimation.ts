import { useEffect } from "react";
import {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

// Hook for opacity animation
export const useOpacityAnimation = (duration: number = 1000) => {
  const opacityValue = useSharedValue(0);

  const opacityStyle = useAnimatedStyle(() => {
    return {
      opacity: withRepeat(
        withTiming(opacityValue.value, { duration }),
        -1,
        true
      ),
    };
  });

  useEffect(() => {
    opacityValue.value = 1; // Set to 1 to start the animation
  }, []);

  return opacityStyle;
};

// Hook for spin animation
export const useSpinAnimation = (
  rotation: number = 360,
  duration: number = 1000
) => {
  const rotateValue = useSharedValue(0);

  const rotateStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: withRepeat(
            withTiming(`${rotateValue.value}deg`, { duration }),
            -1
          ),
        },
      ],
    };
  });

  useEffect(() => {
    rotateValue.value = rotation;
  }, []);

  return rotateStyle;
};
