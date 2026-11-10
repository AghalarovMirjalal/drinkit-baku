import { StyleSheet, Text, View } from 'react-native';
import { colors, fonts } from '../theme';

// стаканчик drinkit, нарисованный через View, без картинок
type Props = {
  color: string;
  size?: number;
  label?: string;
  tilt?: number;
};

export default function Cup({ color, size = 160, label = 'drinkit', tilt = 0 }: Props) {
  const w = size;
  const h = size * 1.35;

  return (
    <View style={{ width: w, height: h + w * 0.12, alignItems: 'center', transform: [{ rotate: `${tilt}deg` }] }}>
      <View style={[styles.lid, { width: w * 1.04, height: w * 0.12 }]} />
      <View
        style={[
          styles.body,
          {
            width: w,
            height: h,
            backgroundColor: color,
            borderBottomLeftRadius: w * 0.22,
            borderBottomRightRadius: w * 0.22,
          },
        ]}
      >
        <View style={[styles.sleeve, { height: h * 0.34 }]}>
          <Text style={[styles.label, { fontSize: w * 0.15 }]}>{label}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  lid: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
  },
  body: {
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  sleeve: {
    backgroundColor: colors.black,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    color: colors.white,
    fontFamily: fonts.title,
    letterSpacing: -0.5,
  },
});
