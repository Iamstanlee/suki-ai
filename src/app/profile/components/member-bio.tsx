import { memo } from 'react';
import { Image, ImageSourcePropType, StyleSheet, View } from 'react-native';
import FpText from '@/design-system/text';
import { GearSix } from 'phosphor-react-native';
import { useUser } from '@/core/context/user-context';
import { FpHSpace, FpSpacing, FpVSpace } from '@/design-system/spacing';
import { useNavigation } from '@react-navigation/native';
import Clickable from '@/design-system/components/clickable';
import { SettingsPageTag } from '@/app/settings/settings.page';
import { useProfileInfoQuery } from '@/app/profile/hooks/use-profile-info-query';
import { useSkeletonPulseAnim } from '@/core/hooks/use-skeleton-pulse-anim';
import { FpColor } from '@/design-system/color';
import Animated from 'react-native-reanimated';

function _MemberBio() {
  const {
    user: { first_name, last_name, address, bio, reward_points },
    avatar_url,
  } = useUser();
  const { isLoading, places, feasts } = useProfileInfoQuery();
  const opacity = useSkeletonPulseAnim();
  const navigation = useNavigation();

  const _InfoItem = ({
    icon,
    count,
    title,
  }: {
    title: string;
    icon: ImageSourcePropType;
    count: number;
  }) => (
    <View style={styles.itemRow}>
      <Image style={styles.image} source={icon} />
      <FpText type='spanSm'>
        <FpText type='spanSm' bold>
          {count}
        </FpText>{' '}
        {title}
      </FpText>
    </View>
  );

  const _InfoItem_Skeleton = () => (
    <Animated.View
      style={{
        height: 16,
        width: '30%',
        backgroundColor: FpColor.gray200,
        opacity,
      }}
    />
  );

  return (
    <View>
      <View style={styles.row}>
        <Image
          style={{
            height: 70,
            width: 70,
            objectFit: 'cover',
            borderRadius: 50,
          }}
          source={{ uri: avatar_url }}
        />
        <FpHSpace.md />
        <View>
          <FpText type='h3'>
            {first_name} {last_name}
          </FpText>
          <FpText type='spanSm' bold>
            {address['city']}
          </FpText>
        </View>
        <FpHSpace.max />
        <Clickable
          onPress={() =>
            // @ts-ignore
            navigation.navigate(SettingsPageTag)
          }
        >
          <GearSix weight='fill' />
        </Clickable>
      </View>
      <FpVSpace.md />
      <FpText type='spanSm' bold>
        {bio ?? 'No bio.'}
      </FpText>
      <FpVSpace.lg />
      <View style={[styles.row, { gap: FpSpacing.md }]}>
        {isLoading ? (
          <>
            <_InfoItem_Skeleton />
            <_InfoItem_Skeleton />
            <_InfoItem_Skeleton />
          </>
        ) : (
          <>
            <_InfoItem
              title='Place(s) visited'
              count={places}
              icon={require('@/assets/icons/map-pin-dark.png')}
            />
            <_InfoItem
              title='Feasts'
              count={feasts}
              icon={require('@/assets/icons/home-fork.png')}
            />
            <_InfoItem
              title='Points'
              count={reward_points}
              icon={require('@/assets/icons/star-dark.png')}
            />
          </>
        )}
      </View>
    </View>
  );
}

const MemberBio = memo(_MemberBio);

export default MemberBio;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: FpSpacing.xs,
  },
  image: {
    width: 16,
    height: 18,
    objectFit: 'contain',
  },
});
