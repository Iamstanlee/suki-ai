import { Image, StyleSheet, View } from 'react-native';
import { FpColor } from '@/design-system/color';
import FpText from '@/design-system/text';
import { FpSpacing } from '@/design-system/spacing';
import Clickable from '@/design-system/components/clickable';

export type LocationVendorProps = {
  location: string;
  numOfVendors: number;
  bgColor?: string;
  onPress?: () => void;
};

export default function LocationAndVendorCard(props: LocationVendorProps) {
  return (
    <View style={styles.darkBg}>
      <Clickable onPress={props.onPress}>
        <View style={styles.bg}>
          <View>
            <FpText type='h5' color={FpColor.white}>
              {props.location}
            </FpText>
            <FpText color={FpColor.white}>
              {props.numOfVendors} Vendor(s)
            </FpText>
          </View>
          <Image
            source={require('@/assets/icons/arrow-right.png')}
            style={{ alignSelf: 'flex-end', height: 15, width: 15 }}
          />
        </View>
      </Clickable>
    </View>
  );
}

const styles = StyleSheet.create({
  darkBg: {
    flex: 1,
    backgroundColor: FpColor.black,
    position: 'relative',
    height: 188,
    marginVertical: FpSpacing.md,
    borderRadius: FpSpacing.sm,
    marginHorizontal: 12,
  },
  bg: {
    justifyContent: 'space-between',
    top: -10,
    right: -10,
    height: 188,
    borderWidth: 2,
    borderColor: FpColor.black,
    backgroundColor: FpColor.primary500,
    padding: FpSpacing.md,
    borderRadius: FpSpacing.sm,
  },
});
