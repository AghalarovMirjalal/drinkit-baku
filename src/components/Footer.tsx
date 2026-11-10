import { Linking, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, fonts } from '../theme';
import Container from './Container';

const socials = [
  { title: 'Instagram', url: 'https://instagram.com' },
  { title: 'TikTok', url: 'https://tiktok.com' },
  { title: 'Telegram', url: 'https://t.me' },
];

export default function Footer() {
  return (
    <View style={styles.wrap}>
      <Container>
        <Text style={styles.big}>drinkit</Text>

        <View style={styles.row}>
          <View style={styles.col}>
            <Text style={styles.head}>Связь</Text>
            <Text style={styles.text}>hello@drinkit.az</Text>
            <Text style={styles.text}>+994 12 000 00 00</Text>
          </View>

          <View style={styles.col}>
            <Text style={styles.head}>Соцсети</Text>
            {socials.map((s) => (
              <Pressable key={s.title} onPress={() => Linking.openURL(s.url)}>
                <Text style={styles.text}>{s.title}</Text>
              </Pressable>
            ))}
          </View>

          <View style={styles.col}>
            <Text style={styles.head}>Приложение</Text>
            <Text style={styles.text}>App Store</Text>
            <Text style={styles.text}>Google Play</Text>
          </View>
        </View>

        <Text style={styles.copy}>© {new Date().getFullYear()} Drinkit Baku. Учебный проект.</Text>
      </Container>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: colors.black,
    paddingTop: 60,
    paddingBottom: 30,
  },
  big: {
    fontFamily: fonts.title,
    fontSize: 72,
    color: colors.lime,
    letterSpacing: -3,
    marginBottom: 40,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 40,
    marginBottom: 50,
  },
  col: {
    minWidth: 160,
    gap: 8,
  },
  head: {
    fontFamily: fonts.textBold,
    color: colors.gray,
    fontSize: 13,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 4,
  },
  text: {
    fontFamily: fonts.text,
    color: colors.white,
    fontSize: 16,
  },
  copy: {
    fontFamily: fonts.text,
    color: colors.gray,
    fontSize: 13,
    borderTopWidth: 1,
    borderTopColor: colors.line,
    paddingTop: 20,
  },
});
