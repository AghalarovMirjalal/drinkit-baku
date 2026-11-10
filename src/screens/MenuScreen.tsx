import { useMemo, useState } from 'react';
import { Alert, Platform, Pressable, ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import ProductImage from '../components/ProductImage';
import ProductSheet from '../components/ProductSheet';
import { tabs, subTabs, menu, formatPrice, MenuItem, TabKey } from '../data/menu';
import { useCart } from '../cart';
import { colors, fonts, radius } from '../theme';

function filterMenu(tab: TabKey, sub: string | null) {
  if (tab === 'for-you') return menu.filter((m) => m.hit);
  if (tab === 'winter') return menu.filter((m) => m.winter);
  return menu.filter((m) => m.category === tab && (!sub || m.sub === sub));
}

export default function MenuScreen() {
  const insets = useSafeAreaInsets();
  const cart = useCart();
  const { width } = useWindowDimensions();
  const [tab, setTab] = useState<TabKey>('coffee');
  const [sub, setSub] = useState<string | null>('milk coffee');
  const [selected, setSelected] = useState<MenuItem | null>(null);

  const items = useMemo(() => filterMenu(tab, sub), [tab, sub]);
  const subs = subTabs[tab];

  // две колонки: экран минус отступы по краям и промежуток
  const cardWidth = Math.floor((Math.min(width, 430) - 46) / 2);

  const chooseTab = (key: TabKey) => {
    setTab(key);
    setSub(subTabs[key]?.[0] ?? null);
  };

  const checkout = () => {
    const text = `Заказ на ${formatPrice(cart.total)} отправлен. Заберите его с умной полки через 5 минут`;
    if (Platform.OS === 'web') {
      window.alert(text);
    } else {
      Alert.alert('Готово!', text);
    }
    cart.clear();
  };

  return (
    <View style={styles.screen}>
      <View style={[styles.top, { paddingTop: insets.top + 16 }]}>
        {/* мягкое свечение за вкладками */}
        <View style={styles.glow} pointerEvents="none">
          {[260, 210, 160, 110, 70].map((d) => (
            <View
              key={d}
              style={{
                position: 'absolute',
                width: d,
                height: d,
                borderRadius: d / 2,
                backgroundColor: 'rgba(255,214,160,0.035)',
              }}
            />
          ))}
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabs}>
          {tabs.map((t) => (
            <Pressable key={t.key} onPress={() => chooseTab(t.key)} hitSlop={8}>
              <Text style={[styles.tab, tab === t.key && styles.tabActive]}>{t.title}</Text>
            </Pressable>
          ))}
        </ScrollView>

        {subs && (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.subs}>
            {subs.map((s) => (
              <Pressable key={s} onPress={() => setSub(s)} hitSlop={8}>
                <Text style={[styles.sub, sub === s && styles.subActive]}>{s}</Text>
              </Pressable>
            ))}
          </ScrollView>
        )}
      </View>

      <ScrollView
        contentContainerStyle={[styles.grid, { paddingBottom: cart.count ? 190 : 120 }]}
        showsVerticalScrollIndicator={false}
      >
        {items.map((item) => (
          <Pressable
            key={item.id}
            style={({ pressed }) => [styles.card, { width: cardWidth }, pressed && { opacity: 0.8 }]}
            onPress={() => setSelected(item)}
          >
            <View style={styles.cardImg}>
              <ProductImage item={item} size={cardWidth * 0.48} />
            </View>
            <Text style={styles.name} numberOfLines={2}>
              {item.name}
            </Text>
            <View style={styles.priceRow}>
              <Text style={styles.price}>{formatPrice(item.price)}</Text>
              <Ionicons name="chevron-forward" size={20} color={colors.muted} />
            </View>
          </Pressable>
        ))}
        {items.length === 0 && <Text style={styles.empty}>Скоро здесь что-то появится</Text>}
      </ScrollView>

      {cart.count > 0 && (
        <Pressable style={styles.cartBar} onPress={checkout}>
          <View style={styles.cartCount}>
            <Text style={styles.cartCountText}>{cart.count}</Text>
          </View>
          <Text style={styles.cartText}>Оформить заказ</Text>
          <Text style={styles.cartTotal}>{formatPrice(cart.total)}</Text>
          <Ionicons name="arrow-forward" size={18} color={colors.white} />
        </Pressable>
      )}

      <ProductSheet item={selected} onClose={() => setSelected(null)} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  top: {
    backgroundColor: colors.surface,
    paddingBottom: 18,
    overflow: 'hidden',
  },
  glow: {
    position: 'absolute',
    top: -70,
    left: 50,
    width: 260,
    height: 260,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabs: {
    paddingHorizontal: 20,
    gap: 26,
    alignItems: 'baseline',
  },
  tab: {
    fontFamily: fonts.regular,
    fontSize: 24,
    color: colors.dim,
    letterSpacing: -0.3,
  },
  tabActive: {
    color: colors.text,
  },
  subs: {
    paddingHorizontal: 20,
    gap: 22,
    marginTop: 18,
  },
  sub: {
    fontFamily: fonts.regular,
    fontSize: 16,
    color: colors.dim,
  },
  subActive: {
    color: colors.text,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 14,
    gap: 14,
    paddingTop: 14,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: radius.xl,
    paddingHorizontal: 18,
    paddingTop: 16,
    paddingBottom: 18,
  },
  cardImg: {
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  name: {
    fontFamily: fonts.regular,
    fontSize: 17,
    lineHeight: 21,
    color: colors.text,
    minHeight: 42,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  price: {
    fontFamily: fonts.regular,
    fontSize: 16,
    color: colors.text,
  },
  empty: {
    fontFamily: fonts.regular,
    fontSize: 15,
    color: colors.muted,
    padding: 20,
  },
  cartBar: {
    position: 'absolute',
    left: 20,
    right: 20,
    bottom: 96,
    height: 56,
    borderRadius: radius.pill,
    backgroundColor: colors.blue,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingRight: 20,
    gap: 10,
  },
  cartCount: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartCountText: {
    fontFamily: fonts.bold,
    fontSize: 15,
    color: colors.white,
  },
  cartText: {
    flex: 1,
    fontFamily: fonts.semibold,
    fontSize: 16,
    color: colors.white,
  },
  cartTotal: {
    fontFamily: fonts.semibold,
    fontSize: 16,
    color: colors.white,
  },
});
