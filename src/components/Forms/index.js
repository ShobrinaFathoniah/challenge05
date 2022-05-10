import {StyleSheet, View, Image, TouchableOpacity, Alert} from 'react-native';
import React, {useState} from 'react';
import {moderateScale} from 'react-native-size-matters';
import {DARK_PURPLE_300, DARK_PURPLE_500, WHITE} from '../../helpers/colors';
import {loginPic} from '../../assets';
import {Courgette, LibreBaskerville} from '../Fonts';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {client_id} from '@env';
import LoadingBar from '../LoadingBar';
import auth from '@react-native-firebase/auth';
import {navigate} from '../../helpers/navigate';

const Forms = ({type, children, onPressButton}) => {
  const [loading, setLoading] = useState(false);
  const [userInformation, setUserInfo] = useState({});
  GoogleSignin.configure({
    webClientId: client_id, // client ID of type WEB for your server (needed to verify user ID and offline access)
  });

  const signIn = async () => {
    try {
      setLoading(true);

      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      // Get the users ID token
      const {idToken} = await GoogleSignin.signIn();

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      const signInWithGoogle = auth().signInWithCredential(googleCredential);

      if ({userInfo}) {
        setLoading(false);
        setUserInfo(userInfo);
        signInWithGoogle;
        console.log(userInformation);
        navigate('MainApp');
      } else {
        setLoading(true);
      }
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        Alert.alert('Notification', 'Login Canceled');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
        setLoading(true);
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        Alert.alert(
          'Notification',
          'Google play services not available or outdated',
        );
      } else {
        // some other error happened
        Alert.alert('Notification', `${error}`);
      }
    }
  };

  return (
    <View testID="FormComponent">
      <Courgette style={styles.title}>{type}</Courgette>
      <Image testID="LoginImage" style={styles.image} source={loginPic} />
      {children}
      <TouchableOpacity
        testID="ButtonLoginRegis"
        style={styles.button}
        onPress={onPressButton}>
        <LibreBaskerville style={styles.buttonText}>{type}</LibreBaskerville>
      </TouchableOpacity>
      <View style={styles.googleSignIn}>
        <GoogleSigninButton onPress={signIn} />
      </View>
      {LoadingBar(loading)}
    </View>
  );
};

export default Forms;

const styles = StyleSheet.create({
  button: {
    padding: moderateScale(10),
    borderRadius: moderateScale(3),
    alignSelf: 'center',
    backgroundColor: DARK_PURPLE_300,
    margin: moderateScale(10),
    width: moderateScale(260),
  },
  buttonText: {
    alignSelf: 'center',
    color: WHITE,
    fontSize: moderateScale(14),
  },
  image: {
    width: moderateScale(250),
    height: moderateScale(300),
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  text: {
    fontSize: moderateScale(12),
    color: DARK_PURPLE_500,
    marginStart: moderateScale(10),
  },
  containerTextHelper: {
    flexDirection: 'row',
    margin: moderateScale(10),
    alignSelf: 'center',
  },
  title: {
    color: DARK_PURPLE_500,
    alignSelf: 'center',
    fontSize: moderateScale(32),
    letterSpacing: moderateScale(0.5),
    marginTop: moderateScale(15),
  },
  googleSignIn: {
    alignSelf: 'center',
  },
});
