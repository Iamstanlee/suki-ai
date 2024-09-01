import FpScaffold from '@/design-system/scaffold';
import { useWindowDimensions } from 'react-native';
import { FpVSpace } from '@/design-system/spacing';
import { TabView } from 'react-native-tab-view';
import { useState } from 'react';
import { notTrue } from '@/core/utils/boolean';
import TabBar_Profile from '@/app/profile/components/tab/tab-bar';
import MemberBio from '@/app/profile/components/member-bio';
import BookMarkTab_Profile from '@/app/profile/components/tab/bookmark-tab';
import ReviewsTab_Profile from '@/app/profile/components/tab/review-tab';
import RewardTab_Profile from '@/app/profile/components/tab/reward-tab';

export const ProfilePageTag = 'Profile';

export default function ProfilePage() {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'bookmark', title: 'Bookmark' },
    { key: 'review', title: 'Reviews' },
    { key: 'rewards', title: 'Rewards' },
  ]);

  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'bookmark':
        return <BookMarkTab_Profile />;
      case 'review':
        return <ReviewsTab_Profile />;
      case 'rewards':
        return <RewardTab_Profile />;
    }
  };

  return (
    <FpScaffold withBackButton>
      <MemberBio />
      <FpVSpace.sm />
      <TabView
        lazy
        renderTabBar={(props) => <TabBar_Profile {...props} />}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        swipeEnabled={notTrue}
        pagerStyle={{ height: layout.height }}
        initialLayout={{ width: layout.width, height: layout.height }}
      />
    </FpScaffold>
  );
}
