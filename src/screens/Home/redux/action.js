import {setIsLoading} from '../../../store/globalAction';
import {SET_TOKEN} from './types';
import {BASE_URL} from '@env';
import {Alert} from 'react-native';
import axios from 'axios';
import {navigate} from '../../../helpers/navigate';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const sendDataLogin = dataUser => async dispatch => {
  try {
    if (dataUser) {
      dispatch(setIsLoading(true));
      const res = await axios.post(`${BASE_URL}/auth/login`, dataUser);
      const token = res.data.tokens.access.token;

      if (token) {
        dispatch(setToken(token));
        await AsyncStorage.setItem('@token', token);
        navigate('MainApp');

        dispatch(setIsLoading(false));
      } else {
        Alert.alert('Pemberitahuan', 'Anda tidak dapat melakukan Login');
        dispatch(setIsLoading(false));
      }
    } else {
      Alert.alert('Pemberitahuan', 'Error: Semua Field Wajib diisi');
      dispatch(setIsLoading(false));
    }
  } catch (error) {
    Alert.alert('Pemberitahuan', `${error}`);
    dispatch(setIsLoading(false));

    if ((error.message = 'Request failed with status code 401')) {
      //terlalu spesifik
      Alert.alert(
        'Pemberitahuan',
        'Terdapat kesalahan Username atau Password!',
      );
    }
  }
};

export const setToken = data => {
  return {
    type: SET_TOKEN,
    token: data,
  };
};
