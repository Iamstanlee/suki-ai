import {
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { useEffect } from 'react';

export const useSkeletonPulseAnim = () => {
  const opacity = useSharedValue(1);

  useEffect(() => {
    opacity.value = withRepeat(withTiming(0, { duration: 500 }), -1, true);
  }, []);

  return opacity;
};
