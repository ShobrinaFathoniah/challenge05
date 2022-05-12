import {
  View,
  StyleSheet,
  Dimensions,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import {useIsFocused} from '@react-navigation/native';
import analytics from '@react-native-firebase/analytics';

const Maps = () => {
  const isFocused = useIsFocused();

  const focused = async () => {
    if (isFocused) {
      console.log('focused');

      await analytics().logScreenView({
        screen_class: 'Maps',
        screen_name: 'Maps',
      });
    } else {
      console.log('not focused');
    }
  };

  focused();

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

  useEffect(() => {
    requestGeolocationPermission();
    onRegionChange();
  }, []);

  RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
    interval: 10000,
    fastInterval: 5000,
  })
    .then(data => {
      if (data === 'already-enabled') {
        console.log('already-enabled');
      } else if (data === 'enabled') {
        Alert.alert('Notification', 'Happy Trying the Features!');
      }
    })
    .catch(err => {
      if (err.code === 'ERR00') {
        Alert.alert('Notification', 'GPS Activation Canceled by User');
      } else if (err.code === 'ERR01') {
        Alert.alert('Notification', 'the Settings change are unavailable');
      } else if (err.code === 'ERR02') {
        Alert.alert('Notification', 'the popup has failed to open');
      } else if (err.code === 'ERR03') {
        Alert.alert('Notification', 'Internal error');
      } else {
        Alert.alert('Notification', err);
      }
    });

  return (
    <View>
      <MapView initialRegion={regionMark} style={styles.map}>
        <Marker
          key={1}
          coordinate={latLng}
          title="Your Location"
          description="Your Location"
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
