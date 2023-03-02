import { View, SafeAreaView, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import { Map } from '../components/Map';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigateCard } from '../components/NavigateCard';
import { NAVIGATION } from '../constants';
import { RideOptionsCard } from '../components/RideOptionsCard';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

export const MapScreen = () => {
  const Stack = createNativeStackNavigator();
  const navigation = useNavigation();

  return (
    <SafeAreaView style={tw`h-full`}>
      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate(NAVIGATION.HOME_SCREEN)}
          style={tw`bg-gray-100 absolute top-6 left-6
         z-50 rounded-full shadow-lg p-2`}
        >
          <Icon name="menu" />
        </TouchableOpacity>
        <View style={tw`h-1/2`}>
          <Map />
        </View>
        <View style={tw`h-1/2`}>
          <Stack.Navigator>
            <Stack.Screen
              options={{ headerShown: false }}
              name={NAVIGATION.NAVIGATE_CARD}
              component={NavigateCard}
            />
            <Stack.Screen
              options={{ headerShown: false }}
              name={NAVIGATION.RIDE_OPTIONS_CARD}
              component={RideOptionsCard}
            />
          </Stack.Navigator>
        </View>
      </View>
    </SafeAreaView>
  );
};
