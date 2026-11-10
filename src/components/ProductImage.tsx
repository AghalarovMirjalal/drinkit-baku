import { View } from 'react-native';
import { MenuItem } from '../data/menu';
import Cup from './Cup';

type Props = {
  item: MenuItem;
  size?: number;
};

export default function ProductImage({ item, size = 70 }: Props) {
  if (item.category === 'food') {
    // тарелка с едой
    return (
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
    );
  }

  return <Cup color={item.color} size={size} foam={!!item.foam} straw={item.cold} />;
}
