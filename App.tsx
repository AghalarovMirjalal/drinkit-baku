import { ActivityIndicator, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, LinkingOptions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts, Unbounded_600SemiBold, Unbounded_800ExtraBold } from '@expo-google-fonts/unbounded';
import { Manrope_500Medium, Manrope_700Bold } from '@expo-google-fonts/manrope';

import { RootStackParamList } from './src/navigation';
import { colors } from './src/theme';
import HomeScreen from './src/screens/HomeScreen';
import MenuScreen from './src/screens/MenuScreen';
import PlacesScreen from './src/screens/PlacesScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const linking: LinkingOptions<RootStackParamList> = {
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
    Unbounded_600SemiBold,
    Unbounded_800ExtraBold,
    Manrope_500Medium,
    Manrope_700Bold,
  });

  if (!loaded) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.black, justifyContent: 'center' }}>
        <ActivityIndicator color={colors.lime} />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer linking={linking} documentTitle={{ formatter: () => 'Drinkit Baku' }}>
        <StatusBar style="light" />
        <Stack.Navigator screenOptions={{ headerShown: false, animation: 'fade' }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Menu" component={MenuScreen} />
          <Stack.Screen name="Places" component={PlacesScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
