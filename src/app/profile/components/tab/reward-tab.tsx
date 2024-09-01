import { memo, useMemo } from 'react';
import { ScrollView, View } from 'react-native';
import { notTrue } from '@/core/utils/boolean';
import { FpVSpace } from '@/design-system/spacing';
import EmptyPage from '@/design-system/components/empty-page';
import { useRewardsQuery } from '@/app/reward/hooks/use-rewards-query';
import RewardListItem, {
  RewardListItem_Skeleton,
} from '@/app/profile/components/reward-list-item';

function _RewardTab_Profile() {
  const { isLoading, isError, rewards, retryFetch } = useRewardsQuery();
  const claimedRewards = useMemo(
    () => rewards?.filter((reward) => reward.status === 'claimed'),
    [rewards],
  );

  if (isLoading) {
    return (
      <View>
        <RewardListItem_Skeleton />
        <RewardListItem_Skeleton />
        <RewardListItem_Skeleton />
      </View>
    );
  }

  if (isError) {
    return (
      <EmptyPage
        title='An unexpected error occured'
        withSadFace
        actionBtnText='Retry'
        actionBtnOnPress={() => retryFetch()}
      />
    );
  }

  if (claimedRewards.length == 0) {
    return (
      <EmptyPage
        header='No rewards earned'
        title="You haven't earned any rewards yet"
        withSadFace
      />
    );
  }

  return (
    <ScrollView showsVerticalScrollIndicator={notTrue}>
      {claimedRewards.map((reward) => (
        <RewardListItem key={reward.id} reward={reward} />
      ))}
      <FpVSpace.md />
    </ScrollView>
  );
}

const RewardTab_Profile = memo(_RewardTab_Profile);

export default RewardTab_Profile;
