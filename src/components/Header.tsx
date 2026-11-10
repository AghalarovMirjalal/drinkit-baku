import { useState } from 'react';
import { Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, PageName } from '../navigation';
import { colors, fonts, radius } from '../theme';
import Container from './Container';
import Button from './Button';

const links: { title: string; page: PageName }[] = [
  { title: 'Главная', page: 'Home' },
  { title: 'Меню', page: 'Menu' },
  { title: 'Кофейни', page: 'Places' },
];

type Props = {
  active: PageName;
};

export default function Header({ active }: Props) {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { width } = useWindowDimensions();
  const [open, setOpen] = useState(false);
  const mobile = width < 760;

  const go = (page: PageName) => {
    setOpen(false);
    navigation.navigate(page);
  };

  return (
    <View style={styles.wrap}>
      <Container style={styles.row}>
        <Pressable onPress={() => go('Home')}>
          <Text style={styles.logo}>drinkit</Text>
        </Pressable>

        {!mobile && (
          <View style={styles.links}>
            {links.map((l) => (
              <Pressable
                key={l.page}
                onPress={() => go(l.page)}
                style={[styles.link, active === l.page && styles.linkActive]}
              >
                <Text style={[styles.linkText, active === l.page && { color: colors.black }]}>
                  {l.title}
                </Text>
              </Pressable>
            ))}
          </View>
        )}

        {mobile ? (
          <Pressable style={styles.burger} onPress={() => setOpen(!open)}>
            <View style={[styles.bar, open && { transform: [{ translateY: 4 }, { rotate: '45deg' }] }]} />
            <View style={[styles.bar, open && { transform: [{ translateY: -4 }, { rotate: '-45deg' }] }]} />
          </Pressable>
        ) : (
          <Button title="Заказать в приложении" small onPress={() => go('Menu')} />
        )}
      </Container>

      {mobile && open && (
        <Container style={styles.mobileMenu}>
          {links.map((l) => (
            <Pressable key={l.page} onPress={() => go(l.page)} style={styles.mobileLink}>
              <Text style={[styles.mobileLinkText, active === l.page && { color: colors.lime }]}>
                {l.title}
              </Text>
            </Pressable>
          ))}
        </Container>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: colors.black,
    borderBottomWidth: 1,
    borderBottomColor: colors.line,
    zIndex: 10,
  },
  row: {
    height: 72,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    fontFamily: fonts.title,
    fontSize: 26,
    color: colors.white,
    letterSpacing: -1,
  },
  links: {
    flexDirection: 'row',
    gap: 6,
    backgroundColor: '#1A1A1A',
    padding: 5,
    borderRadius: radius.pill,
  },
  link: {
    paddingVertical: 9,
    paddingHorizontal: 18,
    borderRadius: radius.pill,
  },
  linkActive: {
    backgroundColor: colors.white,
  },
  linkText: {
    fontFamily: fonts.textBold,
    fontSize: 14,
    color: colors.white,
  },
  burger: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.lime,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  bar: {
    width: 18,
    height: 2,
    backgroundColor: colors.black,
  },
  mobileMenu: {
    paddingBottom: 20,
  },
  mobileLink: {
    paddingVertical: 12,
  },
  mobileLinkText: {
    fontFamily: fonts.title,
    fontSize: 28,
    color: colors.white,
  },
});
