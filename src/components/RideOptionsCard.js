import {
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import tw from 'twrnc';
import { NAVIGATION } from '../constants';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectTravelTimeInformation } from '../store/slices/navSlices';

const data = [
  {
    id: 'Uber-X-123',
    title: 'UberX',
    multiplier: 1,
    image: 'car-sport',
  },
  {
    id: 'Uber-XL-456',
    title: 'Uber XL',
    multiplier: 1.2,
    image: 'car-sport',
  },
  {
    id: 'Uber-LUX-789',
    title: 'Uber LUX',
    multiplier: 1.75,
    image: 'car-sport',
  },
];
const SURGE_CHARGE_RATE = 1.5;

export const RideOptionsCard = () => {
  const navigation = useNavigation();
  const travelTimeInformation = useSelector(selectTravelTimeInformation);
  const [selected, setSelected] = useState(null);

  return (
    <SafeAreaView style={tw`bg-white flex-grow`}>
      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate(NAVIGATION.NAVIGATE_CARD)}
          style={tw`absolute top-3 left-5 z-50 p-3 rounded-full`}
        >
          <Icon
            name="chevron-left"
            type="font-awesome"
            color="black"
            size={16}
          />
        </TouchableOpacity>
        <Text style={tw`text-center py-4 text-xl`}>
          Select a Ride - {travelTimeInformation?.distance?.text}
        </Text>
      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item: { id, title, multiplier, image }, item }) => {
          return (
            <TouchableOpacity
              onPress={() => setSelected(item)}
              style={tw`flex-row justify-between items-center px-10 ${
                id === selected?.id && 'bg-gray-200'
              }`}
            >
              <Ionicons name={image} size={54} color="black" />
              <View style={tw`-ml-2`}>
                <Text style={tw`text-xl font-semibold`}>{title}</Text>
                <Text>{travelTimeInformation?.duration?.text} Travel time</Text>
              </View>
              <Text style={tw`text-xl`}>
                {new Intl.NumberFormat('en-gb', {
                  style: 'currency',
                  currency: 'GBP',
                }).format(
                  (travelTimeInformation?.duration.value *
                    SURGE_CHARGE_RATE *
                    multiplier) /
                    100,
                )}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
      <View>
        <TouchableOpacity
          disabled={!selected}
          style={tw`bg-black py-3 m-3 ${!selected && 'bg-gray-300'}`}
        >
          <Text style={tw`text-center text-white text-xl`}>
            Choose {selected?.title}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
