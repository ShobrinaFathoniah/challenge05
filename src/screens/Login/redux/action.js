import {setIsLoading} from '../../../store/globalAction';
import {CONFIRM_CODE, SET_DATA_USER, SET_DATA_USER_GOOGLE} from './types';
import {Alert} from 'react-native';
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {client_id} from '@env';

export const sendDataLoginWithPhoneNumber =
  (confirmPhoneNumber, navigation) => async dispatch => {
    try {
      dispatch(setIsLoading(true));

      function onAuthStateChanged(user) {
        dispatch(setDataUser(user));
      }

      const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
      console.log(subscriber);
      dispatch(setIsLoading(false));

      if (confirmPhoneNumber) {
        dispatch(setIsLoading(false));
        navigation.navigate('MainApp');
      }
    } catch (error) {
      Alert.alert('Pemberitahuan', `${error}`);
      dispatch(setIsLoading(false));
    }
  };

export const sendDataLoginWithGoogle = navigation => async dispatch => {
  GoogleSignin.configure({
    webClientId: client_id,
  });

  try {
    dispatch(setIsLoading(true));

    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    // Get the users ID token
    const {idToken} = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    const signInWithGoogle = auth().signInWithCredential(googleCredential);

    if ({userInfo}) {
      dispatch(setIsLoading(false));
      dispatch(setDataUserWithGoogle(userInfo));
      signInWithGoogle;
      navigation.navigate('MainApp');
    } else {
      dispatch(setIsLoading(true));
    }
  } catch (error) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      dispatch(setIsLoading(false));
      Alert.alert('Notification', 'Login Canceled');
    } else if (error.code === statusCodes.IN_PROGRESS) {
      dispatch(setIsLoading(true));
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      dispatch(setIsLoading(false));
      Alert.alert(
        'Notification',
        'Google play services not available or outdated',
      );
    } else {
      dispatch(setIsLoading(false));
      Alert.alert('Notification', `${error}`);
    }
  }
};

export const setDataUser = data => {
  return {
    type: SET_DATA_USER,
    dataUser: data,
  };
};

export const setDataUserWithGoogle = data => {
  return {
    type: SET_DATA_USER_GOOGLE,
    dataUserGoogle: data,
  };
};

export const setConfirm = data => {
  return {
    type: CONFIRM_CODE,
    data: data,
  };
};
