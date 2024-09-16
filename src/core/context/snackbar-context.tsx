import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import FpText from '@/design-system/text';
import { StyleSheet, View } from 'react-native';
import { FpColor } from '@/design-system/color';
import { FpSpacing } from '@/design-system/spacing';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CheckCircle } from 'phosphor-react-native';

type _SnackBarFactoryType = 'error' | 'info' | 'success';

type SnackBarState = {
  open?: boolean;
  message?: string;
  type?: _SnackBarFactoryType;
  show?: (message: string, type?: _SnackBarFactoryType) => void;
};

const initialState: SnackBarState = {
  open: false,
};

export const SnackBarContext =
  createContext<Partial<SnackBarState>>(initialState);

export const SnackBarContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const initialTop = -100;
  const top = useSharedValue(initialTop);
  const insets = useSafeAreaInsets();

  const [{ type, message, open }, setState] =
    useState<Partial<SnackBarState>>(initialState);

  const bgColor = useMemo(
    () =>
      type == 'error'
        ? FpColor.error500
        : type == 'info'
          ? FpColor.primary500
          : FpColor.success500,
    [type],
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setState(initialState);
      top.value = withSpring(initialTop);
    }, 5000);

    return () => clearTimeout(timer);
  }, [open]);

  const show = (message: string, type: _SnackBarFactoryType = 'info') => {
    setState({ message, type, open: true });
    top.value = withSpring(insets.top, { duration: 500 });
  };

  return (
    <SnackBarContext.Provider value={{ type, message, open, show }}>
      {children}
      {open && message && (
        <Animated.View
          style={[styles.container, { backgroundColor: bgColor, top: top }]}
        >
          <View style={styles.messageContainer}>
            {type == 'success' && (
              <CheckCircle weight='fill' size={18} color={FpColor.white} />
            )}
            <FpText color={FpColor.white} type='spanSm' bold>
              {message}
            </FpText>
          </View>
        </Animated.View>
      )}
    </SnackBarContext.Provider>
  );
};

export const useSnackBar = () => {
  const context = useContext(SnackBarContext);

  if (!context) {
    throw new Error(
      'useSnackBar must be used within a SnackBarContextProvider',
    );
  }

  return {
    INFO: (message: string) => context.show?.(message, 'info'),
    ERROR: (message: string) => context.show?.(message, 'error'),
    SUCCESS: (message: string) => context.show?.(message, 'success'),
  };
};

const styles = StyleSheet.create({
  container: {
    padding: FpSpacing.md,
    margin: FpSpacing.sm,
    borderRadius: FpSpacing.xs,
    flexDirection: 'row',
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 999999,
  },
  messageContainer: {
    flexDirection: 'row',
    gap: FpSpacing.sm,
  },
});
