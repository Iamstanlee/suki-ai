import {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { useEffect } from 'react';

export const useTranslateXAnim = () => {
  const xOffset = useSharedValue<number>(0);
  const styles = useAnimatedStyle(() => ({
    transform: [
      {
        rotateY: `${xOffset.value}deg`,
      },
    ],
  }));

  useEffect(() => {
    xOffset.value = withSpring(180, { duration: 5000 });
  }, []);

  return styles;
};
