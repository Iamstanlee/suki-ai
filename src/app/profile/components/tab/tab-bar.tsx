import { memo } from 'react';
import { StyleSheet } from 'react-native';
import FpText from '@/design-system/text';
import { FpColor } from '@/design-system/color';
import { TabBar } from 'react-native-tab-view';

function _TabBar_Profile(props: any) {
  return (
    <TabBar
      {...props}
      activeColor={FpColor.black}
      inactiveColor={FpColor.gray500}
      android_ripple={{ color: undefined }}
      indicatorStyle={styles.indicator}
      tabStyle={styles.tab}
      style={styles.container}
      renderLabel={({ route, color }) => (
        <FpText type='spanSm' color={color}>
          {route.title}
        </FpText>
      )}
    />
  );
}

const TabBar_Profile = memo(_TabBar_Profile);

export default TabBar_Profile;

const styles = StyleSheet.create({
  container: {
    backgroundColor: FpColor.white,
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 2,
    borderBottomColor: FpColor.gray200,
  },
  tab: {
    width: 'auto',
  },
  indicator: {
    backgroundColor: FpColor.primary500,
  },
});
