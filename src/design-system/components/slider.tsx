import { StyleSheet, View } from 'react-native';
import FpText from '@/design-system/text';
import { FpSpacing, FpVSpace } from '@/design-system/spacing';
import { FpColor } from '@/design-system/color';
import Clickable from '@/design-system/components/clickable';

export type FpSliderItemProps = {
  label: string;
  value: string;
};

export type Props = {
  items: FpSliderItemProps[];
  selectedValue: string;
  onChange: (value: string) => void;
};

export default function FpSlider(props: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.track} />
      <View
        style={{
          ...styles.selectedTrack,
          width: `${(props.items.findIndex((item) => item.value === props.selectedValue) / (props.items.length - 1)) * 100}%`,
        }}
      />
      {props.items.map((item, index) => {
        const isSelected = item.value === props.selectedValue;
        const isBeforeOrSelected =
          props.items.findIndex((item) => item.value === props.selectedValue) >=
          index;
        return (
          <View
            key={index}
            style={{
              alignItems: 'center',
              position: 'absolute',
              marginLeft: -20,
              top: isSelected ? -17 : -10,
              left: `${(index / (props.items.length - 1)) * 100}%`,
            }}
          >
            <Clickable onPress={() => props.onChange(item.value)}>
              <View
                style={[
                  styles.thumb,
                  isSelected && styles.selectedThumb,
                  isBeforeOrSelected && styles.passedThumb,
                ]}
              ></View>
            </Clickable>
            <FpVSpace.md />
            <FpText
              type='label'
              color={isBeforeOrSelected ? FpColor.black : FpColor.gray500}
            >
              {item.label}
            </FpText>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 2,
    margin: FpSpacing.md,
    marginBottom: 50,
  },
  track: {
    height: '100%',
    backgroundColor: FpColor.gray300,
  },
  selectedTrack: {
    position: 'absolute',
    height: '100%',
    backgroundColor: FpColor.black,
  },
  thumb: {
    width: 20,
    height: 20,
    borderRadius: 50,
    backgroundColor: FpColor.gray300,
  },
  selectedThumb: {
    width: 36,
    height: 36,
    backgroundColor: FpColor.black,
  },
  passedThumb: {
    backgroundColor: FpColor.black,
  },
});
