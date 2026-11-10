import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

import { MenuItem } from '../data/menu';
import { colors, drink } from '../theme';

type Props = {
  item: MenuItem;
  size?: number;
};

const FOAM = ['#F1E2D0', '#DCC0A2'] as const;

// латте-арт сердечком из двух кругов и квадрата
function Heart({ size }: { size: number }) {
  const d = size * 0.5;
  return (
    <View style={{ width: size, height: size * 0.8, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ width: d, height: d, transform: [{ rotate: '45deg' }], marginTop: size * 0.12 }}>
        <View style={[styles.artPart, { width: d, height: d, borderRadius: d * 0.2 }]} />
        <View style={[styles.artPart, { width: d, height: d, borderRadius: d / 2, top: -d / 2, position: 'absolute' }]} />
        <View style={[styles.artPart, { width: d, height: d, borderRadius: d / 2, left: -d / 2, position: 'absolute' }]} />
      </View>
    </View>
  );
}

// верхняя поверхность напитка (эллипс)
function Top({ width, art, cream }: { width: number; art?: boolean; cream?: boolean }) {
  if (cream) {
    return (
      <View style={{ alignItems: 'center', marginBottom: -width * 0.08, zIndex: 2 }}>
        <View style={[styles.cream, { width: width * 0.5, height: width * 0.22, borderRadius: width }]} />
        <View style={[styles.cream, { width: width * 0.85, height: width * 0.24, borderRadius: width, marginTop: -width * 0.1 }]} />
      </View>
    );
  }
  return (
    <LinearGradient
      colors={['#F4E6D6', '#D9BC9C']}
      style={{
        width,
        height: width * 0.24,
        borderRadius: width,
        marginBottom: -width * 0.12,
        zIndex: 2,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {art && <Heart size={width * 0.24} />}
    </LinearGradient>
  );
}

function Highlight({ height }: { height: number }) {
  return (
    <LinearGradient
      colors={['rgba(255,255,255,0.22)', 'rgba(255,255,255,0)']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={{ position: 'absolute', left: '8%', top: '10%', width: '14%', height: height * 0.75, borderRadius: 20 }}
    />
  );
}

function MilkDrink({ item, w, h, bottom }: { item: MenuItem; w: number; h: number; bottom: number }) {
  const c = drink[item.color ?? 'latte'];
  const milky = item.color !== 'black';
  return (
    <View style={{ alignItems: 'center' }}>
      {milky ? <Top width={w} art={item.art} cream={item.cream} /> : <View style={[styles.blackTop, { width: w, height: w * 0.24, borderRadius: w }]} />}
      <LinearGradient
        colors={milky ? [FOAM[0], FOAM[1], c[0], c[1]] : [c[0], c[1]]}
        locations={milky ? [0, 0.14, 0.2, 1] : undefined}
        style={{
          width: w,
          height: h,
          borderTopLeftRadius: 6,
          borderTopRightRadius: 6,
          borderBottomLeftRadius: bottom,
          borderBottomRightRadius: bottom,
        }}
      >
        <Highlight height={h} />
      </LinearGradient>
    </View>
  );
}

function IcedDrink({ item, size }: { item: MenuItem; size: number }) {
  const w = size * 0.74;
  const h = size * 1.2;
  const c = drink[item.color ?? 'latte'];
  const withMilk = ['latte', 'coffee', 'berry'].includes(item.color ?? '');
  const layers = withMilk ? ['#EFE3D6', c[0], c[1]] : [c[0], c[0], c[1]];

  return (
    <View style={{ width: size, height: size * 1.35, alignItems: 'center', justifyContent: 'flex-end' }}>
      <View style={[styles.straw, { height: h * 1.05, width: w * 0.08, left: size * 0.58, top: 0 }]} />
      {item.cream && (
        <View style={[styles.cream, { width: w * 0.96, height: w * 0.28, borderRadius: w, marginBottom: -w * 0.12, zIndex: 2 }]} />
      )}
      <View
        style={[
          styles.glass,
          { width: w, height: h, borderBottomLeftRadius: w * 0.14, borderBottomRightRadius: w * 0.14 },
        ]}
      >
        <LinearGradient
          colors={layers as unknown as [string, string, ...string[]]}
          locations={[0, 0.4, 1]}
          style={{ position: 'absolute', left: 0, right: 0, bottom: 0, top: h * 0.12 }}
        />
        {[0, 1, 2].map((i) => (
          <View
            key={i}
            style={[
              styles.ice,
              {
                width: w * 0.32,
                height: w * 0.32,
                top: h * (0.14 + i * 0.1),
                left: w * (0.12 + (i % 2) * 0.4),
                transform: [{ rotate: `${15 + i * 25}deg` }],
              },
            ]}
          />
        ))}
        <Highlight height={h} />
      </View>
    </View>
  );
}

function Food({ item, size }: { item: MenuItem; size: number }) {
  if (item.shape === 'croissant') {
    return (
      <View style={{ width: size * 1.2, height: size * 0.8, alignItems: 'center', justifyContent: 'center' }}>
        {[-1, 0, 1].map((i) => (
          <LinearGradient
            key={i}
            colors={['#F2B66A', '#B86A24']}
            style={{
              position: 'absolute',
              width: size * (i === 0 ? 0.55 : 0.42),
              height: size * (i === 0 ? 0.5 : 0.38),
              borderRadius: size,
              left: size * (0.6 + i * 0.32) - size * (i === 0 ? 0.275 : 0.21),
              transform: [{ rotate: `${i * 35}deg` }],
              zIndex: i === 0 ? 2 : 1,
            }}
          />
        ))}
      </View>
    );
  }
  if (item.shape === 'toast') {
    return (
      <View style={{ width: size * 1.1, height: size * 0.9, alignItems: 'center', justifyContent: 'center' }}>
        <View style={[styles.toast, { width: size * 0.8, height: size * 0.32, transform: [{ rotate: '-8deg' }] }]}>
          <View style={{ height: '30%', backgroundColor: '#7FA65A', marginTop: '35%' }} />
        </View>
        <View style={[styles.toast, { width: size * 0.8, height: size * 0.3, marginTop: -size * 0.06, transform: [{ rotate: '4deg' }] }]} />
      </View>
    );
  }
  // чизкейк
  return (
    <View style={{ width: size, height: size * 0.85, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ width: size * 0.25, height: size * 0.12, borderRadius: size, backgroundColor: '#C8304A', marginBottom: -4, zIndex: 1 }} />
      <LinearGradient
        colors={['#FFF6E6', '#F1DDB8']}
        style={{ width: size * 0.85, height: size * 0.45, borderTopLeftRadius: 10, borderTopRightRadius: 40, borderBottomWidth: size * 0.08, borderBottomColor: '#A8723E' }}
      />
    </View>
  );
}

export default function ProductImage({ item, size = 80 }: Props) {
  let content;

  if (item.category === 'food') {
    content = <Food item={item} size={size} />;
  } else if (item.shape === 'iced') {
    content = <IcedDrink item={item} size={size} />;
  } else if (item.shape === 'shot') {
    content = <MilkDrink item={item} w={size * 0.5} h={size * 0.45} bottom={size * 0.12} />;
  } else if (item.shape === 'tea') {
    const c = drink[item.color ?? 'tea'];
    const w = size * 0.78;
    content = (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={[styles.glass, { width: w, height: size * 0.95, borderBottomLeftRadius: w * 0.3, borderBottomRightRadius: w * 0.3 }]}>
          <LinearGradient colors={[c[0], c[1]]} style={{ position: 'absolute', left: 0, right: 0, bottom: 0, top: '15%' }} />
          <Highlight height={size * 0.95} />
        </View>
        <View style={[styles.handle, { width: size * 0.26, height: size * 0.42, borderRadius: size }]} />
      </View>
    );
  } else if (item.shape === 'cup') {
    content = <MilkDrink item={item} w={size} h={size * 0.72} bottom={size * 0.3} />;
  } else {
    content = <MilkDrink item={item} w={size * 0.74} h={size * 1.15} bottom={size * 0.16} />;
  }

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      {content}
      {item.winter && (
        <>
          <Ionicons name="sparkles" size={size * 0.34} color={colors.glow} style={[styles.spark, { left: -size * 0.35, top: size * 0.1 }]} />
          <Ionicons name="sparkles" size={size * 0.22} color={colors.glow} style={[styles.spark, { right: -size * 0.3, top: size * 0.45 }]} />
          <Ionicons name="sparkles" size={size * 0.4} color={colors.glow} style={[styles.spark, { left: -size * 0.25, bottom: -size * 0.05 }]} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  artPart: {
    backgroundColor: '#FFF8EF',
  },
  cream: {
    backgroundColor: '#FBF4EA',
  },
  blackTop: {
    backgroundColor: '#3A2216',
    marginBottom: -12,
    zIndex: 2,
    borderWidth: 2,
    borderColor: '#6B4630',
  },
  glass: {
    overflow: 'hidden',
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.28)',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  straw: {
    position: 'absolute',
    backgroundColor: colors.blueLight,
    borderRadius: 4,
    transform: [{ rotate: '10deg' }],
  },
  ice: {
    position: 'absolute',
    borderRadius: 6,
    backgroundColor: 'rgba(255,255,255,0.22)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.4)',
  },
  handle: {
    borderWidth: 6,
    borderColor: 'rgba(255,255,255,0.3)',
    marginLeft: -6,
  },
  toast: {
    backgroundColor: '#E9C27E',
    borderRadius: 14,
    borderWidth: 4,
    borderColor: '#A8692C',
    overflow: 'hidden',
  },
  spark: {
    position: 'absolute',
    textShadowColor: colors.glow,
    textShadowRadius: 12,
  },
});
