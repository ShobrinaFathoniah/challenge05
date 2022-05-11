import {View, StyleSheet, Dimensions, PermissionsAndroid} from 'react-native';
import React, {useState} from 'react';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

const Maps = () => {
  const [region, setRegion] = useState({
    coords: {
      latitude: 0,
      longitude: 0,
    },
  });

  const regionMark = {
    latitude: region.coords.latitude ? region.coords.latitude : -7.3059827,
    longitude: region.coords.longitude ? region.coords.longitude : 107.0341646,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const latLng = {
    latitude: region.coords.latitude ? region.coords.latitude : -7.3059827,
    longitude: region.coords.longitude ? region.coords.longitude : 107.0341646,
  };

  const onRegionChange = () => {
    Geolocation.getCurrentPosition(info => {
      // console.log(info);
      setRegion(info);
    });
  };

  const requestGeolocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Ridesharer Geolocation Permission',
          message:
            'Ridesharer needs access to your current location so you can share or search for a ride',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the geolocation');
      } else {
        console.log('Geolocation permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  requestGeolocationPermission();

  return (
    <View>
      {/* <MapView iregion={region} onRegionChange={onRegionChange}> */}
      {/* <Marker
          key={1}
          coordinate={regionMark.latitude}
          title="Nyobba"
          description="Percobaan"
        /> */}
      {/* </MapView> */}
      <MapView
        initialRegion={regionMark}
        onRegionChange={onRegionChange()}
        style={styles.map}>
        <Marker
          key={1}
          coordinate={latLng}
          title="Nyobba"
          description="Percobaan"
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
    height: Dimensions.get('window').height,
  },
});

export default Maps;
