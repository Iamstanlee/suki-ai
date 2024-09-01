import { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { FpHSpace, FpSpacing } from '@/design-system/spacing';
import FpText from '@/design-system/text';
import { FpColor } from '@/design-system/color';
import {
  CalendarBlank,
  CookingPot,
  Cube,
  FireSimple,
  Tag,
  TShirt,
  Wine,
} from '@/design-system/icons';

const _perks: PerkItemProps[] = [
  {
    icon: <Tag color={FpColor.primary500} weight='fill' />,
    title: '10% Discount',
    description:
      'On eligible orders at partners venues (capped at $25 per visit)',
  },
  {
    icon: <Cube color={FpColor.primary500} weight='fill' />,
    title: 'Partner Exclusives',
    description:
      'Partners are able to offer up product exclusives to their FeastPass followers',
  },
  {
    icon: <TShirt color={FpColor.primary500} weight='fill' />,
    title: 'Access to SWAG!',
    description: 'Entrance to private events held by FeastPass & Partners',
  },
  {
    icon: <CalendarBlank color={FpColor.primary500} weight='fill' />,
    title: 'Event Entrance',
    description: 'Entrance to private events held by FeastPass & Partners',
  },
  {
    icon: <FireSimple color={FpColor.primary500} weight='fill' />,
    title: 'Curated Experience',
    description: 'Entrance to private events held by FeastPass & Partners',
  },
  {
    icon: <CookingPot color={FpColor.primary500} weight='fill' />,
    title: 'Private Dinner',
    description: 'Get all the juicy updates for discount, experience and fun',
  },
  {
    icon: <Wine color={FpColor.primary500} weight='fill' />,
    title: 'Vendor Classes',
    description: 'Get all the juicy updates for discount, experience and fun',
  },
];

type PerkItemProps = {
  icon: ReactNode;
  title: string;
  description: string;
};

export default function PerkRow() {
  return (
    <View style={styles.perkRow}>
      {_perks.map((perk, index) => (
        <_PerkItem key={index} {...perk} />
      ))}
    </View>
  );
}

function _PerkItem(props: PerkItemProps) {
  return (
    <View style={styles.perkItem}>
      {props.icon}
      <FpHSpace.sm />
      <View>
        <FpText type='h6' color={FpColor.white}>
          {props.title}
        </FpText>
        <FpText type='label' opacity={0.85} color={FpColor.white}>
          {props.description}
        </FpText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  perkRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  perkItem: {
    flexDirection: 'row',
    width: '45%',
    paddingHorizontal: FpSpacing.md,
    paddingVertical: FpSpacing.sm,
  },
});
