import {
  View,
  ScrollView,
  Alert,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React, {useEffect, useState} from 'react';
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
import {
  BLACK,
  DARK_PURPLE_100_trans,
  DARK_PURPLE_300,
  RED_500,
  WHITE,
} from '../../helpers/colors';
import {isPhoneNumberValid} from '../../helpers/validationData';

const Login = ({navigation}) => {
  const [phoneNum, setPhoneNumber] = useState('');
  const dispatch = useDispatch();
  const {isLoading} = useSelector(state => state.global);
  const {dataUserGoogle, dataUser} = useSelector(state => state.login);

  useEffect(() => {
    //check data
    const chekData = () => {
      if (dataUserGoogle.user !== null || dataUser.user !== null) {
        navigation.navigate('MainApp');
      }
    };

    chekData();
  }, [dataUserGoogle.user, dataUser.user, navigation]);

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
      if (biometryType === 'TouchID') {
        console.log('TouchID is supported.');
      }
    })
    .catch(error => {
      console.log(error);
    });

  const signIn = () => {
    dispatch(sendDataLoginWithGoogle(navigation));
  };

  const phoneNumberChecker = phone => {
    if (!isPhoneNumberValid(phone) && phone.length > 0) {
      return (
        <LibreBaskerville style={styles.erorText}>
          Phone Number isn't Valid! use +62
        </LibreBaskerville>
      );
    }
  };

  const loginScreen = () => {
    return (
      <View testID="LoginScreen">
        <Forms type="Login" hideButton={true}>
          {phoneNumberChecker(phoneNum)}

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
  erorText: {
    color: RED_500,
    fontSize: moderateScale(12),
    textAlign: 'center',
    padding: moderateScale(10),
    backgroundColor: DARK_PURPLE_100_trans,
    borderRadius: moderateScale(5),
    width: moderateScale(270),
    alignSelf: 'center',
  },
});

export default Login;
