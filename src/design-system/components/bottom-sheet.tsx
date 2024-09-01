import React, {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import { StyleSheet } from 'react-native';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetScrollView,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { FpColor } from '@/design-system/color';
import { notTrue } from '@/core/utils/boolean';
import { FpSpacing } from '@/design-system/spacing';

export type FpBottomSheetModalProps = {
  open: boolean;
  onChange: (state: boolean) => void;
  snapPoints?: [string, string];
  children?: ReactNode;
  scrollable?: boolean;
  initialSnapIndex?: number;
};

export default function FpBottomSheetModal({
  open,
  onChange,
  initialSnapIndex,
  snapPoints,
  scrollable,
  children,
}: FpBottomSheetModalProps) {
  const bottomSheetModalRef = useRef<BottomSheetModal>();

  useEffect(() => {
    if (open) {
      bottomSheetModalRef.current?.present();
    } else {
      bottomSheetModalRef.current?.dismiss();
    }
  }, [open]);

  const handleSheetChanges = useCallback((index: number) => {
    if (index === -1) onChange(notTrue);
  }, []);

  return (
    <BottomSheetModal
      snapPoints={useMemo(() => snapPoints ?? ['25%', '50%'], [snapPoints])}
      index={initialSnapIndex ?? 1}
      ref={bottomSheetModalRef}
      onChange={handleSheetChanges}
      backgroundStyle={styles.modelBg}
      backdropComponent={(props) => (
        <BottomSheetBackdrop
          {...props}
          opacity={0.22}
          enableTouchThrough={true}
          onPress={() => onChange(notTrue)}
        />
      )}
    >
      {scrollable ? (
        <BottomSheetScrollView style={styles.container}>
          {children}
        </BottomSheetScrollView>
      ) : (
        <BottomSheetView style={styles.container}>{children}</BottomSheetView>
      )}
    </BottomSheetModal>
  );
}

const styles = StyleSheet.create({
  modelBg: {
    borderWidth: 0.5,
    borderColor: FpColor.gray500,
  },
  container: {
    flex: 1,
    padding: FpSpacing.md,
  },
});
