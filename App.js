import { LogBox, KeyboardAvoidingView, Platform } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './src/store/store';
import { HomeScreen } from './src/screen/HomeScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NAVIGATION } from './src/constants';
import { MapScreen } from './src/screen/MapScreen';

LogBox.ignoreAllLogs();

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <NavigationContainer>
          <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            // keyboardVerticalOffset={Platform.OS === 'ios' ? -64 : 0}
          >
            <Stack.Navigator>
              <Stack.Screen
                options={{ headerShown: false }}
                name={NAVIGATION.HOME_SCREEN}
                component={HomeScreen}
              />
              <Stack.Screen
                options={{ headerShown: false }}
                name={NAVIGATION.MAP_SCREEN}
                component={MapScreen}
              />
            </Stack.Navigator>
          </KeyboardAvoidingView>
        </NavigationContainer>
      </Provider>
    </SafeAreaProvider>
  );
}
