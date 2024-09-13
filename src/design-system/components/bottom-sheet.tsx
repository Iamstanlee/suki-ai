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
import { FpSpacing } from '@/design-system/spacing';

export type FpBottomSheetModalProps = {
  open: boolean;
  onClose: () => void;
  snapPoints?: [string, string];
  children?: ReactNode;
  scrollable?: boolean;
  initialSnapIndex?: number;
};

export default function FpBottomSheetModal({
  open,
  onClose,
  initialSnapIndex,
  snapPoints,
  scrollable,
  children,
}: FpBottomSheetModalProps) {
  const bottomSheetModalRef = useRef<BottomSheetModal>();

  useEffect(() => {
    if (open) {
      bottomSheetModalRef.current?.present();
    }
  }, [open]);

  const handleSheetChanges = useCallback((index: number) => {
    if (index === -1) onDismiss();
  }, []);

  const onDismiss = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
    onClose();
  }, []);

  return (
    <BottomSheetModal
      snapPoints={useMemo(() => snapPoints ?? ['25%', '50%'], [snapPoints])}
      index={initialSnapIndex}
      ref={bottomSheetModalRef}
      onChange={handleSheetChanges}
      backgroundStyle={styles.modelBg}
      backdropComponent={(props) => (
        <BottomSheetBackdrop
          {...props}
          opacity={0.25}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          onPress={onDismiss}
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
    backgroundColor: FpColor.primary100,
    borderColor: FpColor.gray500,
  },
  container: {
    flex: 1,
    padding: FpSpacing.md,
    backgroundColor: FpColor.primary100,
  },
});
