import { ActivityIndicator, Platform, StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, LinkingOptions } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  useFonts,
  Onest_400Regular,
  Onest_500Medium,
  Onest_600SemiBold,
  Onest_700Bold,
} from '@expo-google-fonts/onest';

import { TabParamList } from './src/navigation';
import { colors } from './src/theme';
import TabBar from './src/components/TabBar';
import { CartProvider } from './src/cart';
import HomeScreen from './src/screens/HomeScreen';
import MenuScreen from './src/screens/MenuScreen';
import PlacesScreen from './src/screens/PlacesScreen';

const Tab = createBottomTabNavigator<TabParamList>();

const linking: LinkingOptions<TabParamList> = {
  prefixes: [],
  config: {
    screens: {
      Home: '',
      Menu: 'menu',
      Places: 'places',
    },
  },
};

export default function App() {
  const [loaded] = useFonts({
    Onest_400Regular,
    Onest_500Medium,
    Onest_600SemiBold,
    Onest_700Bold,
  });

  if (!loaded) {
    return (
      <View style={[styles.root, { justifyContent: 'center' }]}>
        <ActivityIndicator color={colors.blue} />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <View style={styles.root}>
        {/* в браузере показываем приложение в ширину телефона */}
        <View style={styles.phone}>
          <CartProvider>
            <NavigationContainer linking={linking} documentTitle={{ formatter: () => 'Drinkit Baku' }}>
              <StatusBar style="dark" />
              <Tab.Navigator
                tabBar={(props) => <TabBar {...props} />}
                screenOptions={{ headerShown: false }}
              >
                <Tab.Screen name="Home" component={HomeScreen} />
                <Tab.Screen name="Menu" component={MenuScreen} />
                <Tab.Screen name="Places" component={PlacesScreen} />
              </Tab.Navigator>
            </NavigationContainer>
          </CartProvider>
        </View>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Platform.OS === 'web' ? '#DCE3F0' : colors.bg,
  },
  phone: {
    flex: 1,
    width: '100%',
    maxWidth: Platform.OS === 'web' ? 430 : undefined,
    alignSelf: 'center',
    backgroundColor: colors.bg,
    overflow: 'hidden',
  },
});
