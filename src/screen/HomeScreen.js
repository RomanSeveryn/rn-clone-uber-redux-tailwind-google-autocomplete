import { Text, View, SafeAreaView } from 'react-native';
import tw from 'twrnc';
import { NavOptions } from '../components/NavOptions';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY } from '@env';
import { useDispatch } from 'react-redux';
import { setDestination, setOrigin } from '../store/slices/navSlices';
import { NavFavorites } from '../components/NavFavorites';

export const HomeScreen = () => {
  const dispatch = useDispatch();

  return (
    <SafeAreaView style={tw`bg-white h-full`}>
      <View style={tw`p-5`}>
        <Text style={{ fontSize: 32, fontWeight: '500', marginLeft: 7 }}>
          Uber
        </Text>
        <GooglePlacesAutocomplete
          placeholder="Where from?"
          enablePoweredByContainer={false}
          minLength={2}
          fetchDetails={true}
          // returnKeyType={'search'}
          onPress={(data, details = null) => {
            dispatch(
              setOrigin({
                location: details.geometry.location,
                description: data.description,
              }),
            );
            dispatch(setDestination(null));
          }}
          styles={{
            container: {
              flex: 0,
            },
            textInput: {
              fontSize: 18,
            },
          }}
          query={{
            key: GOOGLE_MAPS_APIKEY,
            language: 'en',
          }}
          debounce={400}
          nearbyPlacesAPI="GooglePlacesSearch"
        />
      </View>
      <NavOptions />
      <NavFavorites />
    </SafeAreaView>
  );
};
