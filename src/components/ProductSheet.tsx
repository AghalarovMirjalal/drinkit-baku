import { useEffect, useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { MenuItem, sizes, milks, formatPrice, isDrink, hasMilk } from '../data/menu';
import { useCart } from '../cart';
import { colors, fonts, radius } from '../theme';
import Button from './Button';
import ProductImage from './ProductImage';

type Props = {
  item: MenuItem | null;
  onClose: () => void;
};

export default function ProductSheet({ item, onClose }: Props) {
  const insets = useSafeAreaInsets();
  const { add } = useCart();
  const [size, setSize] = useState(0);
  const [milk, setMilk] = useState(0);

  useEffect(() => {
    setSize(0);
    setMilk(0);
  }, [item?.id]);

  if (!item) return null;

  const drinkItem = isDrink(item);
  const milkItem = hasMilk(item);
  const price = item.price + (drinkItem ? sizes[size].extra : 0) + (milkItem && milk > 0 ? 0.5 : 0);

  const onAdd = () => {
    add({
      id: item.id,
      name: item.name,
      size: drinkItem ? sizes[size].title : '',
      milk: milkItem ? milks[milk] : '',
      price,
    });
    onClose();
  };

  return (
    <Modal visible transparent animationType="slide" onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose} />

      <View style={[styles.sheet, { paddingBottom: insets.bottom + 16 }]}>
        <View style={styles.handle} />

        <Pressable style={styles.close} onPress={onClose} hitSlop={10}>
          <Ionicons name="close" size={20} color={colors.text} />
        </Pressable>

        <View style={styles.image}>
          <ProductImage item={item} size={110} />
        </View>

        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.desc}>
          {item.desc}
          {item.volume ? ` · ${item.volume}` : ''}
        </Text>

        {drinkItem && (
          <>
            <Text style={styles.label}>Размер</Text>
            <View style={styles.segment}>
              {sizes.map((s, i) => (
                <Pressable
                  key={s.title}
                  onPress={() => setSize(i)}
                  style={[styles.segmentItem, size === i && styles.segmentActive]}
                >
                  <Text style={[styles.segmentText, size === i && { color: colors.text }]}>{s.title}</Text>
                </Pressable>
              ))}
            </View>
          </>
        )}

        {milkItem && (
          <>
            <Text style={styles.label}>Молоко</Text>
            <View style={styles.chips}>
              {milks.map((m, i) => (
                <Pressable
                  key={m}
                  onPress={() => setMilk(i)}
                  style={[styles.chip, milk === i && styles.chipActive]}
                >
                  <Text style={[styles.chipText, milk === i && { color: colors.white }]}>{m}</Text>
                </Pressable>
              ))}
            </View>
          </>
        )}

        <Button title={`Добавить · ${formatPrice(price)}`} onPress={onAdd} style={{ marginTop: 24 }} />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  sheet: {
    width: '100%',
    maxWidth: 430,
    alignSelf: 'center',
    backgroundColor: colors.card,
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.line,
    alignSelf: 'center',
    marginBottom: 12,
  },
  close: {
    position: 'absolute',
    right: 16,
    top: 16,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  image: {
    height: 230,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  name: {
    fontFamily: fonts.medium,
    fontSize: 26,
    color: colors.text,
    letterSpacing: -0.5,
  },
  desc: {
    fontFamily: fonts.regular,
    fontSize: 15,
    lineHeight: 20,
    color: colors.muted,
    marginTop: 6,
  },
  label: {
    fontFamily: fonts.medium,
    fontSize: 15,
    color: colors.text,
    marginTop: 20,
    marginBottom: 10,
  },
  segment: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: radius.pill,
    padding: 4,
  },
  segmentItem: {
    flex: 1,
    height: 40,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  segmentActive: {
    backgroundColor: colors.surface2,
  },
  segmentText: {
    fontFamily: fonts.semibold,
    fontSize: 15,
    color: colors.muted,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    height: 38,
    paddingHorizontal: 16,
    borderRadius: radius.pill,
    backgroundColor: colors.surface,
    justifyContent: 'center',
  },
  chipActive: {
    backgroundColor: colors.blue,
  },
  chipText: {
    fontFamily: fonts.medium,
    fontSize: 14,
    color: colors.text,
  },
});
