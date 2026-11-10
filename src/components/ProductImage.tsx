import { useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { MenuItem } from '../data/menu';
import Cup from './Cup';

type Props = {
  item: MenuItem;
  size?: number;
};

// фото напитка на весь блок; пока грузится или если нет интернета — рисованный стакан
export default function ProductImage({ item, size = 70 }: Props) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  const fallback =
    item.category === 'food' ? (
      <View
        style={{
          width: size * 1.3,
          height: size * 1.3,
          borderRadius: size,
          backgroundColor: 'rgba(255,255,255,0.8)',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <View
          style={{
            width: size * 0.85,
            height: size * 0.55,
            borderRadius: size * 0.3,
            backgroundColor: item.color,
            transform: [{ rotate: '-12deg' }],
          }}
        />
      </View>
    ) : (
      <Cup color={item.color} size={size} foam={!!item.foam} straw={item.cold} />
    );

  if (!item.photo || failed) return fallback;

  return (
    <>
      {!loaded && fallback}
      <Image
        source={{ uri: item.photo }}
        style={[StyleSheet.absoluteFill, !loaded && { opacity: 0 }]}
        resizeMode="cover"
        onLoad={() => setLoaded(true)}
        onError={() => setFailed(true)}
      />
    </>
  );
}
