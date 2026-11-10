import { ReactNode } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PageName } from '../navigation';
import { colors } from '../theme';
import Header from './Header';
import Footer from './Footer';

type Props = {
  active: PageName;
  children: ReactNode;
};

export default function Page({ active, children }: Props) {
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <Header active={active} />
      <ScrollView style={styles.scroll} contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ flex: 1 }}>{children}</View>
        <Footer />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.black,
  },
  scroll: {
    flex: 1,
    backgroundColor: colors.milk,
  },
});
