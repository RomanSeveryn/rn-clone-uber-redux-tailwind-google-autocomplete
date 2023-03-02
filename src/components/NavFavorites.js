import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';
import tw from 'twrnc';

const data = [
  {
    id: 123,
    icon: 'home',
    location: 'Home',
    destination: 'Code Street, London, UK',
  },
  {
    id: 456,
    icon: 'briefcase',
    location: 'Work',
    destination: 'London Eye, London, UK',
  },
];

export const NavFavorites = () => {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      // ItemSeparatorComponent={() => <View style={tw`bg-gray-200 h-1`} />}
      renderItem={({ item: { icon, location, destination } }) => {
        return (
          <TouchableOpacity style={tw`flex-row items-center p-5`}>
            <Icon
              style={tw`mr-4 ml-4 rounded-full bg-gray-300 p-3`}
              name={icon}
              type="ionicon"
              color="white"
            />
            <View>
              <Text style={tw`font-semibold`}>{location}</Text>
              <Text style={tw`text-gray-500`}>{destination}</Text>
            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
};
