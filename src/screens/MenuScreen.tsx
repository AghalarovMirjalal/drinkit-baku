import { useState } from 'react';
import { Alert, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import ProductImage from '../components/ProductImage';
import ProductSheet from '../components/ProductSheet';
import { categories, menu, formatPrice, Category, MenuItem } from '../data/menu';
import { useCart } from '../cart';
import { colors, fonts, radius } from '../theme';

type Filter = Category | 'all';

export default function MenuScreen() {
  const insets = useSafeAreaInsets();
  const cart = useCart();
  const [filter, setFilter] = useState<Filter>('all');
  const [selected, setSelected] = useState<MenuItem | null>(null);

  const items = filter === 'all' ? menu : menu.filter((m) => m.category === filter);

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
      <View style={[styles.top, { paddingTop: insets.top + 12 }]}>
        <Text style={styles.title}>Меню</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filters}>
          {categories.map((c) => {
            const active = filter === c.key;
            return (
              <Pressable
                key={c.key}
                onPress={() => setFilter(c.key)}
                style={[styles.filter, active && styles.filterActive]}
              >
                <Text style={[styles.filterText, active && { color: colors.white }]}>{c.title}</Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      <ScrollView
        contentContainerStyle={[styles.grid, { paddingBottom: cart.count ? 190 : 120 }]}
        showsVerticalScrollIndicator={false}
      >
        {items.map((item) => (
          <Pressable key={item.id} style={styles.card} onPress={() => setSelected(item)}>
            <View style={styles.cardImg}>
              {item.isNew && (
                <View style={styles.newBadge}>
                  <Text style={styles.newText}>Новинка</Text>
                </View>
              )}
              <ProductImage item={item} size={50} />
            </View>
            <Text style={styles.name} numberOfLines={2}>
              {item.name}
            </Text>
            <Text style={styles.volume}>{item.volume ?? '1 шт'}</Text>
            <View style={styles.priceBtn}>
              <Text style={styles.priceText}>{formatPrice(item.price)}</Text>
            </View>
          </Pressable>
        ))}
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
    backgroundColor: colors.bg,
    paddingBottom: 12,
  },
  title: {
    fontFamily: fonts.bold,
    fontSize: 32,
    color: colors.black,
    letterSpacing: -1,
    paddingHorizontal: 20,
    marginBottom: 14,
  },
  filters: {
    paddingHorizontal: 20,
    gap: 8,
  },
  filter: {
    height: 38,
    paddingHorizontal: 18,
    borderRadius: radius.pill,
    backgroundColor: colors.white,
    justifyContent: 'center',
  },
  filterActive: {
    backgroundColor: colors.blue,
  },
  filterText: {
    fontFamily: fonts.medium,
    fontSize: 14,
    color: colors.black,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
    gap: 8,
    paddingTop: 4,
  },
  card: {
    width: '48.8%',
    backgroundColor: colors.white,
    borderRadius: radius.m,
    padding: 8,
    paddingBottom: 12,
  },
  cardImg: {
    height: 150,
    borderRadius: radius.s + 2,
    backgroundColor: colors.sky,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  newBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: colors.blue,
    borderRadius: radius.pill,
    paddingHorizontal: 8,
    paddingVertical: 3,
    zIndex: 1,
  },
  newText: {
    fontFamily: fonts.medium,
    fontSize: 11,
    color: colors.white,
  },
  name: {
    fontFamily: fonts.medium,
    fontSize: 15,
    lineHeight: 19,
    color: colors.black,
    paddingHorizontal: 4,
    minHeight: 38,
  },
  volume: {
    fontFamily: fonts.regular,
    fontSize: 13,
    color: colors.gray,
    paddingHorizontal: 4,
    marginTop: 2,
  },
  priceBtn: {
    marginTop: 10,
    height: 36,
    borderRadius: radius.pill,
    backgroundColor: colors.sky,
    alignItems: 'center',
    justifyContent: 'center',
  },
  priceText: {
    fontFamily: fonts.semibold,
    fontSize: 14,
    color: colors.blue,
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
