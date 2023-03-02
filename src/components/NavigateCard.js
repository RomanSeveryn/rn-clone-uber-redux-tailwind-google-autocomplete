import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import tw from 'twrnc';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY } from '@env';
import { useDispatch } from 'react-redux';
import { setDestination } from '../store/slices/navSlices';
import { useNavigation } from '@react-navigation/native';
import { NAVIGATION } from '../constants';
import { NavFavorites } from './NavFavorites';
import { Icon } from 'react-native-elements';

export const NavigateCard = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  return (
    <SafeAreaView style={tw`bg-white flex-1`}>
      <Text style={tw`text-center py-5 text-xl`}>Welcome</Text>
      <View style={tw`border-t border-gray-200 flex-shrink`}>
        <View>
          <GooglePlacesAutocomplete
            styles={inputBoxStyles}
            placeholder="Where to?"
            debounce={400}
            minLength={2}
            onPress={(data, details = null) => {
              dispatch(
                setDestination({
                  location: details.geometry.location,
                  description: data.description,
                }),
              );
              navigation.navigate(NAVIGATION.RIDE_OPTIONS_CARD);
            }}
            fetchDetails={true}
            nearbyPlacesAPI="GooglePlacesSearch"
            enablePoweredByContainer={false}
            query={{
              key: GOOGLE_MAPS_APIKEY,
              language: 'en',
            }}
          />
        </View>
        <NavFavorites />
      </View>
      <View
        style={tw`flex-row bg-white justify-evenly
         py-2 mt-auto border-t border-gray-100`}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate(NAVIGATION.RIDE_OPTIONS_CARD)}
          style={tw`flex flex-row justify-between bg-black
           w-24 px-4 py-3 rounded-full`}
        >
          <Icon name="car" type="font-awesome" color="white" size={16} />
          <Text style={tw`text-white text-center`}>Rides</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={tw`flex flex-row justify-between
           w-24 px-4 py-3 rounded-full`}
        >
          <Icon
            name="fast-food-outline"
            type="ionicon"
            color="black"
            size={16}
          />
          <Text style={tw`text-black text-center`}>Eats</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const inputBoxStyles = StyleSheet.create({
  container: {
    flex: 0,
    backgroundColor: 'white',
    paddingTop: 20,
  },
  textInput: {
    borderRadius: 0,
    backgroundColor: '#DDDDDF',
    fontSize: 18,
  },
  textInputContainer: {
    paddingHorizontal: 20,
    paddingBottom: 0,
  },
});
