import { StyleSheet, View } from 'react-native';
import { colors } from '../theme';

// прозрачный стакан с напитком, как на фотках в кофейне
type Props = {
  color: string;
  size?: number;
  foam?: boolean;
  straw?: boolean;
};

export default function Cup({ color, size = 80, foam = true, straw = false }: Props) {
  const w = size;
  const h = size * 1.25;

  return (
    <View style={{ width: w * 1.1, height: h + w * 0.5, alignItems: 'center', justifyContent: 'flex-end' }}>
      {straw && (
        <View
          style={[
            styles.straw,
            { height: h * 0.9, width: w * 0.07, left: w * 0.62, top: 0 },
          ]}
        />
      )}

      <View style={[styles.dome, { width: w * 1.04, height: w * 0.32, borderTopLeftRadius: w, borderTopRightRadius: w }]} />
      <View style={[styles.rim, { width: w * 1.1, height: w * 0.06 }]} />

      <View
        style={[
          styles.body,
          {
            width: w,
            height: h,
            borderBottomLeftRadius: w * 0.16,
            borderBottomRightRadius: w * 0.16,
          },
        ]}
      >
        <View style={{ flex: 1 }} />
        {foam && <View style={[styles.foam, { height: h * 0.18 }]} />}
        <View style={{ height: h * (foam ? 0.66 : 0.82), backgroundColor: color }} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  straw: {
    position: 'absolute',
    backgroundColor: colors.blue,
    borderRadius: 4,
    transform: [{ rotate: '12deg' }],
  },
  dome: {
    backgroundColor: 'rgba(255,255,255,0.55)',
    borderWidth: 1.5,
    borderBottomWidth: 0,
    borderColor: 'rgba(255,255,255,0.9)',
  },
  rim: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 4,
  },
  body: {
    overflow: 'hidden',
    backgroundColor: 'rgba(255,255,255,0.35)',
    borderWidth: 1.5,
    borderTopWidth: 0,
    borderColor: 'rgba(255,255,255,0.9)',
  },
  foam: {
    backgroundColor: '#F6EBDD',
  },
});
