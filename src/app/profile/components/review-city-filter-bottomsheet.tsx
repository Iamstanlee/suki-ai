import FpText from '@/design-system/text';
import { FpSpacing, FpVSpace } from '@/design-system/spacing';
import FpBottomSheetModal, {
  FpBottomSheetModalProps,
} from '@/design-system/components/bottom-sheet';
import { RadioButton, RadioGroup } from 'react-native-ui-lib';
import { StyleSheet, View } from 'react-native';
import { FpColor } from '@/design-system/color';
import { useFilter_Review } from '@/app/profile/context/review-filter-context';
import { useMemo } from 'react';
import _ from 'lodash';
import { ReviewWithVendor } from '@/core/types/review';

export default function CityFilterBottomsheetModal_Review(
  props: FpBottomSheetModalProps & { reviews: ReviewWithVendor[] },
) {
  const { city, update } = useFilter_Review();

  const locationAndVendor = useMemo(
    () =>
      _.countBy(props.reviews, (value) => {
        return value.vendor.address['city'];
      }),
    [],
  );

  return (
    <FpBottomSheetModal
      scrollable
      open={props.open}
      onChange={props.onChange}
      initialSnapIndex={0}
      snapPoints={['40%', '70%']}
    >
      <FpText type='h4'>Pick a city</FpText>
      <FpVSpace.md />
      <RadioGroup
        initialValue={city}
        onValueChange={(value: string) => {
          update('city', value);
          props.onChange(!props.open);
        }}
      >
        {locationAndVendor &&
          ['all', ...Object.keys(locationAndVendor)].map((city) => {
            if (city === 'all')
              return (
                <View style={styles.container} key={city}>
                  <FpText type='h5'>All</FpText>
                  <RadioButton value={city} />
                </View>
              );

            const numOfVendors = locationAndVendor[city];

            return (
              <View style={styles.container} key={city}>
                <View>
                  <FpText type='h5'>{city}</FpText>
                  <FpText color={FpColor.primary500} bold>
                    {numOfVendors} vendor(s)
                  </FpText>
                </View>
                <RadioButton value={city} />
              </View>
            );
          })}
      </RadioGroup>
      <FpVSpace.lg />
    </FpBottomSheetModal>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: FpSpacing.sm,
    marginBottom: FpSpacing.md,
  },
});
