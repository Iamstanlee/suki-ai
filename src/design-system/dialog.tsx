import React, { ReactNode } from 'react';
import { StyleSheet } from 'react-native';
import { FpColor } from '@/design-system/color';
import { FpSpacing } from '@/design-system/spacing';
import { Dialog, PanningProvider } from 'react-native-ui-lib';
import Clickable from '@/design-system/components/clickable';
import { X } from 'phosphor-react-native';

export type FpDialogProps = {
  open: boolean;
  onClose: () => void;
  children?: ReactNode;
};

export default function FpDialog({ open, onClose, children }: FpDialogProps) {
  return (
    <Dialog
      visible={open}
      panDirection={PanningProvider.Directions.DOWN}
      containerStyle={styles.container}
      onDismiss={() => onClose()}
      ignoreBackgroundPress={true}
    >
      <Clickable onPress={() => onClose()} style={styles.xCircle}>
        <X weight='bold' size={15} />
      </Clickable>
      {children}
    </Dialog>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: FpSpacing.md,
    backgroundColor: FpColor.white,
    borderRadius: FpSpacing.md,
    marginBottom: 99,
  },
  xCircle: {
    width: 27,
    height: 27,
    borderRadius: 50,
    backgroundColor: FpColor.gray300,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
  },
});
