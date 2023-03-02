import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import tw from 'twrnc';
import { Icon } from '@rneui/themed';
import { NAVIGATION } from '../constants';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { selectOrigin } from '../store/slices/navSlices';

const data = [
  {
    id: 123,
    title: 'Get a ride',
    image: 'car-sport',
    screen: NAVIGATION.MAP_SCREEN,
  },
  {
    id: 456,
    title: 'Order food',
    image: 'fast-food-sharp',
    screen: 'EatsScreen ',
  },
];

export const NavOptions = () => {
  const navigation = useNavigation();
  const origin = useSelector(selectOrigin);
  const navigate = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      contentContainerStyle={tw`flex-1 justify-center h-30`}
      horizontal
      renderItem={({ item }) => {
        return (
          <TouchableOpacity
            onPress={() => navigate(item.screen)}
            style={tw`p-2 pl-6 pb-8 pt-4 bg-gray-200 m-2 w-40 h-60`}
            disabled={!origin}
          >
            <View style={tw`${!origin && 'opacity-20'}`}>
              <Ionicons name={item.image} size={54} color="black" />
              <Text style={tw`mt-2 text-lg font-semibold`}>{item.title}</Text>
              <Icon
                style={tw`p-2 bg-black rounded-full w-10 mt-4`}
                name="arrowright"
                color="white"
                type="antdesign"
              />
            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
};
