import { Pressable, StyleSheet, Text, View } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, fonts, radius } from '../theme';

const tabs: Record<string, { title: string; icon: keyof typeof Ionicons.glyphMap }> = {
  Home: { title: 'Главная', icon: 'home' },
  Menu: { title: 'Меню', icon: 'cafe' },
  Places: { title: 'Кофейни', icon: 'location' },
};

export default function TabBar({ state, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.wrap, { paddingBottom: Math.max(insets.bottom, 12) }]}>
      <View style={styles.bar}>
        {state.routes.map((route, index) => {
          const focused = state.index === index;
          const tab = tabs[route.name];

          return (
            <Pressable
              key={route.key}
              onPress={() => {
                if (!focused) navigation.navigate(route.name);
              }}
              style={[styles.item, focused && styles.itemActive]}
            >
              <Ionicons
                name={focused ? tab.icon : (`${tab.icon}-outline` as any)}
                size={20}
                color={focused ? colors.white : colors.gray}
              />
              {focused && <Text style={styles.label}>{tab.title}</Text>}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 20,
  },
  bar: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: radius.pill,
    padding: 6,
    justifyContent: 'space-between',
    shadowColor: '#1B2A80',
    shadowOpacity: 0.12,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
  item: {
    height: 48,
    minWidth: 56,
    borderRadius: radius.pill,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    gap: 8,
  },
  itemActive: {
    backgroundColor: colors.blue,
    flexGrow: 1,
  },
  label: {
    fontFamily: fonts.semibold,
    fontSize: 15,
    color: colors.white,
  },
});
