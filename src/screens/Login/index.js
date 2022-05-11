import {View, ScrollView, Alert, TouchableOpacity, Button} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Forms, Header, Input, LoadingBar} from '../../components';
import TouchID from 'react-native-touch-id';
import {Courgette} from '../../components/Fonts';
import {navigate} from '../../helpers/navigate';
import auth from '@react-native-firebase/auth';

const Login = () => {
  const [phoneNum, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  // If null, no SMS has been sent
  const [confirm, setConfirm] = useState(null);

  const [code, setCode] = useState('');

  // // Set an initializing state whilst Firebase connects
  // const [initializing, setInitializing] = useState(true);
  const [users, setUser] = useState();

  useEffect(() => {
    // Handle user state changes
    function onAuthStateChanged(user) {
      setUser(user);
    }

    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    console.log(subscriber);

    return subscriber; // unsubscribe on unmount
  }, []);

  if (users && confirm) {
    console.log(users);
    navigate('MainApp');
  }

  // Handle the button press
  async function signInWithPhoneNumber(phoneNumber) {
    setLoading(true);
    console.log(phoneNumber);
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    setConfirm(confirmation);
    if (confirm) {
      setLoading(false);
    }
  }

  async function confirmCode() {
    setLoading(true);

    try {
      await confirm.confirm(code);
      console.log(await confirm.confirm(code));
      navigate('MainApp');
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log('Invalid code.');
      console.log(error);
    }
  }

  TouchID.isSupported(optionalConfigObject)
    .then(biometryType => {
      // Success code
      if (biometryType === 'FaceID') {
        console.log('FaceID is supported.');
      } else {
        console.log('TouchID is supported.');
      }
    })
    .catch(error => {
      // Failure code
      console.log(error);
    });

  const _pressHandler = () => {
    TouchID.authenticate(
      'to demo this react-native component',
      optionalConfigObject,
    )
      .then(() => {
        console.log('Authenticated Successfully');
        navigate('MainApp');
      })
      .catch(() => {
        Alert.alert('Authentication Failed');
      });
  };

  const optionalConfigObject = {
    title: 'Authentication Required', // Android
    imageColor: '#e00606', // Android
    imageErrorColor: '#ff0000', // Android
    sensorDescription: 'Touch sensor', // Android
    sensorErrorDescription: 'Failed', // Android
    cancelText: 'Cancel', // Android
    fallbackLabel: 'Show Passcode', // iOS (if empty, then label is hidden)
    unifiedErrors: false, // use unified error messages (default false)
    passcodeFallback: false, // iOS - allows the device to fall back to using the passcode, if faceid/touch is not available. this does not mean that if touchid/faceid fails the first few times it will revert to passcode, rather that if the former are not enrolled, then it will use the passcode.
  };

  const loginScreen = () => {
    return (
      <View testID="LoginScreen">
        <Forms type="Login" onPressButton={() => confirmCode()}>
          <View>
            <Input
              testID="phoneNumberForm"
              onChangeText={value => setPhoneNumber(value)}
              value={phoneNum}
              placeholder="Phone Number"
            />
            <Input
              testID="CodeForm"
              value={code}
              onChangeText={text => setCode(text)}
              placeholder="Code"
            />
          </View>
        </Forms>
        <TouchableOpacity onPress={_pressHandler}>
          <Courgette>Authenticate with Touch ID</Courgette>
        </TouchableOpacity>
        <View>
          <Button
            title="Phone Number Sign In"
            onPress={() => signInWithPhoneNumber(phoneNum)}
          />
        </View>
        {LoadingBar(loading)}
      </View>
    );
  };

  return (
    <ScrollView>
      <Header radiusBottom={true} />
      {loginScreen()}
    </ScrollView>
  );
};

export default Login;
