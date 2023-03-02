import tw from 'twrnc';
import MapView, { Marker } from 'react-native-maps';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectDestination,
  selectOrigin,
  setTravelTimeInformation,
} from '../store/slices/navSlices';
import MapViewDirections from 'react-native-maps-directions';
import { GOOGLE_MAPS_APIKEY } from '@env';
import { useEffect, useRef } from 'react';

export const Map = () => {
  const origin = useSelector(selectOrigin);
  const destinations = useSelector(selectDestination);
  const mapRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!origin || !destinations) return;

    //Zoom & fit to markers
    mapRef.current.fitToSuppliedMarkers(['origin', 'destinations'], {
      edgePadding: {
        top: 50,
        left: 50,
        right: 50,
        bottom: 50,
      },
    });
  }, [origin, destinations]);

  useEffect(() => {
    if (!origin || !destinations) return;
    const getTravelTime = async () => {
      fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?
      units=imperial&origins=${origin.description}&destinations=
      ${destinations.description}&key=${GOOGLE_MAPS_APIKEY}`)
        .then((res) => res.json())
        .then((data) => {
          dispatch(setTravelTimeInformation(data.rows[0].elements[0]));
        });
    };
    getTravelTime();
  }, [origin, destinations, GOOGLE_MAPS_APIKEY]);
  return (
    <MapView
      style={tw`flex-1`}
      ref={mapRef}
      mapType="mutedStandard"
      initialRegion={{
        latitude: origin.location.lat,
        longitude: origin.location.lng,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }}
    >
      {origin && destinations && (
        <MapViewDirections
          origin={origin.description}
          destination={destinations.description}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={3}
          strokeColor="black"
        />
      )}
      {origin?.location && (
        <Marker
          coordinate={{
            latitude: origin.location.lat,
            longitude: origin.location.lng,
          }}
          title="Origin"
          description={origin.description}
          identifier="origin"
        />
      )}
      {destinations?.location && (
        <Marker
          coordinate={{
            latitude: destinations.location.lat,
            longitude: destinations.location.lng,
          }}
          title="Destinations"
          description={destinations.description}
          identifier="destinations"
        />
      )}
    </MapView>
  );
};
