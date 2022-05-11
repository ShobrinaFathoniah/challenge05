import {
  View,
  ScrollView,
  Alert,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React, {useState} from 'react';
import {Button, Forms, Header, Input, LoadingBar} from '../../components';
import TouchID from 'react-native-touch-id';
import {LibreBaskerville} from '../../components/Fonts';
import {useDispatch, useSelector} from 'react-redux';
import {setIsLoading} from '../../store/globalAction';
import {sendDataLoginWithGoogle} from './redux/action';
import {optionalConfigObject} from '../../helpers/configTouchID';
import {moderateScale} from 'react-native-size-matters';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {BLACK, DARK_PURPLE_300, RED_500, WHITE} from '../../helpers/colors';

const Login = ({navigation}) => {
  const [phoneNum, setPhoneNumber] = useState('');
  const dispatch = useDispatch();
  const {isLoading} = useSelector(state => state.global);

  // Handle the button press SignIn with phone Number
  const signInWithPhoneNumber = async phoneNumber => {
    dispatch(setIsLoading(true));
    console.log(phoneNumber);
    dispatch(setIsLoading(false));
    navigation.navigate('Code OTP', {phoneNumber: phoneNumber});
  };

  //authentic button
  const _pressHandler = () => {
    TouchID.authenticate(
      'Please Place your Hand in the Touch Sensor Area',
      optionalConfigObject,
    )
      .then(() => {
        console.log('Authenticated Successfully');
        navigation.navigate('MainApp');
      })
      .catch(() => {
        Alert.alert('Authentication Failed');
      });
  };

  //Check support TouchID
  TouchID.isSupported(optionalConfigObject)
    .then(biometryType => {
      // Success code
      if (biometryType === 'TouchID') {
        console.log('TouchID is supported.');
      }
    })
    .catch(error => {
      // Failure code
      console.log(error);
    });

  const signIn = () => {
    dispatch(sendDataLoginWithGoogle(navigation));
  };

  const loginScreen = () => {
    return (
      <View testID="LoginScreen">
        <Forms type="Login" hideButton={true}>
          <View style={styles.twoColumns}>
            <Input
              testID="phoneNumberForm"
              onChangeText={value => setPhoneNumber(value)}
              value={phoneNum}
              keyboardType="number-pad"
              style={styles.inputWidth}
              placeholder="Phone Number"
            />
            <Button
              text="SignIn"
              style={styles.inputWidth}
              onPressButton={() => signInWithPhoneNumber(phoneNum)}
            />
          </View>
        </Forms>
        <View>
          <LibreBaskerville style={styles.text}>Or Login With</LibreBaskerville>
        </View>
        <View style={styles.twoColumns}>
          <TouchableOpacity style={styles.button} onPress={_pressHandler}>
            <FontAwesome5
              name="fingerprint"
              color={DARK_PURPLE_300}
              size={24}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={signIn}>
            <FontAwesome name="google" color={RED_500} size={24} />
          </TouchableOpacity>
        </View>
        {LoadingBar(isLoading)}
      </View>
    );
  };

  return (
    <ScrollView>
      <Header radiusBottom={true} text="Login" />
      {loginScreen()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  center: {
    alignSelf: 'center',
  },
  inputWidth: {
    width: moderateScale(140),
  },
  twoColumns: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  googleButton: {
    width: moderateScale(50),
  },
  button: {
    padding: moderateScale(10),
    borderRadius: moderateScale(3),
    backgroundColor: WHITE,
    margin: moderateScale(10),
  },
  text: {
    color: BLACK,
    fontSize: 13,
    alignSelf: 'center',
    marginTop: moderateScale(15),
  },
});

export default Login;
