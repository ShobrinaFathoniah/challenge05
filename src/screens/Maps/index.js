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

  useEffect(() => {
    requestGeolocationPermission();
    onRegionChange();
  }, []);

  RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
    interval: 10000,
    fastInterval: 5000,
  })
    .then(data => {
      // The user has accepted to enable the location services
      // data can be :
      //  - "already-enabled" if the location services has been already enabled
      //  - "enabled" if user has clicked on OK button in the popup
      if (data === 'already-enabled') {
        // Alert.alert(
        //   'Notification',
        //   'the location services has been already enabled',
        // );
      } else if (data === 'enabled') {
        Alert.alert('Notification', 'Happy Trying the Features!');
      }
    })
    .catch(err => {
      // The user has not accepted to enable the location services or something went wrong during the process
      // "err" : { "code" : "ERR00|ERR01|ERR02|ERR03", "message" : "message"}
      // codes :
      //  - ERR00 : The user has clicked on Cancel button in the popup
      //  - ERR01 : If the Settings change are unavailable
      //  - ERR02 : If the popup has failed to open
      //  - ERR03 : Internal error
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
