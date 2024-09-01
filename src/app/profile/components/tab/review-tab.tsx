import { memo, useMemo, useState } from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import ReviewListItem, {
  ReviewListItem_Skeleton,
} from '@/app/profile/components/review-list-item';
import { notTrue } from '@/core/utils/boolean';
import { FpSpacing, FpVSpace } from '@/design-system/spacing';
import { useMemberReviewQuery } from '@/app/profile/hooks/use-member-review-query';
import EmptyPage from '@/design-system/components/empty-page';
import { useNavigation } from '@react-navigation/native';
import { ReviewPageTag } from '@/app/review/review.page';
import { FpButton } from '@/design-system/button';
import CityFilterBottomsheetModal_Review from '@/app/profile/components/review-city-filter-bottomsheet';
import {
  FilterConsumer_Review,
  FilterProvider_Review,
  useFilter_Review,
} from '@/app/profile/context/review-filter-context';

function _ReviewsTab_Profile() {
  const { isLoading, isError, reviews, retryFetch } = useMemberReviewQuery();
  const [filterModalOpen, setFilterModalOpen] = useState(notTrue);
  const navigation = useNavigation();

  if (isLoading) {
    return (
      <View>
        <ReviewListItem_Skeleton />
        <ReviewListItem_Skeleton />
        <ReviewListItem_Skeleton />
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

  if (reviews.length == 0) {
    return (
      <EmptyPage
        header='No reviews yet'
        title="You haven't reviewed any vendor yet."
        withSadFace
      />
    );
  }

  return (
    <FilterProvider_Review>
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={notTrue}>
          <FilterConsumer_Review>
            {({ city }) =>
              reviews
                .filter((review) =>
                  city == 'all' ? true : review.vendor.address['city'] == city,
                )
                .map((review) => (
                  <ReviewListItem
                    key={review.id}
                    review={review}
                    onPress={() => {
                      const param = {
                        vendor: { ...review.vendor, review: review },
                      };
                      // @ts-ignore
                      navigation.navigate(ReviewPageTag, { activation: param });
                    }}
                  />
                ))
            }
          </FilterConsumer_Review>
          <FpVSpace.md />
        </ScrollView>
        <View style={styles.filter}>
          <_FilterBtn onPress={() => setFilterModalOpen(true)} />
        </View>
      </View>
      <CityFilterBottomsheetModal_Review
        reviews={reviews}
        open={filterModalOpen}
        onChange={setFilterModalOpen}
      />
    </FilterProvider_Review>
  );
}

function _FilterBtn({ onPress }: { onPress: () => void }) {
  const { city } = useFilter_Review();

  const filterApplied = useMemo(() => city != 'all', [city]);

  return (
    <FpButton
      elevation={2}
      type={filterApplied ? 'dark' : 'primary'}
      size='sm'
      onPress={onPress}
    >
      <Image
        style={{ height: 13, width: 14, objectFit: 'contain' }}
        source={require('@/assets/icons/filter-light.png')}
      />
      {filterApplied ? 'Filtered' : 'Filter'}
    </FpButton>
  );
}

const ReviewsTab_Profile = memo(_ReviewsTab_Profile);

export default ReviewsTab_Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  filter: {
    alignItems: 'center',
    position: 'absolute',
    bottom: FpSpacing.lg,
    right: 0,
    left: 0,
    zIndex: 99,
  },
});
