import {View, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {sendDataLoginWithPhoneNumber, setConfirm} from '../Login/redux/action';
import {setIsLoading} from '../../store/globalAction';
import auth from '@react-native-firebase/auth';
import {Button, Forms, Input, LoadingBar} from '../../components';

const OTP = ({route, navigation}) => {
  const [code, setCode] = useState('');
  const dispatch = useDispatch();
  const confirm = useSelector(state => state.login.confirmCode);
  const {isLoading} = useSelector(state => state.global);
  const phoneNum = route.params.phoneNumber;

  useEffect(() => {
    const signInPhone = async () => {
      const confirmation = await auth().signInWithPhoneNumber(phoneNum);
      dispatch(setConfirm(confirmation));
    };
    signInPhone();

    dispatch(sendDataLoginWithPhoneNumber(confirm, navigation));
  }, [dispatch, confirm, phoneNum, navigation]);

  // code OTP button
  const confirmCode = async () => {
    dispatch(setIsLoading(true));
    try {
      await confirm.confirm(code);
      console.log(await confirm.confirm(code));
      navigation.navigate('MainApp');
      dispatch(setIsLoading(false));
    } catch (error) {
      dispatch(setIsLoading(false));
      console.log('Invalid code.');
      console.log(error);
    }
  };
  return (
    <View>
      <View style={styles.center}>
        <Forms hideButton={true}>
          <Input
            testID="CodeForm"
            value={code}
            onChangeText={text => setCode(text)}
            placeholder="Code"
          />
          <Button text="SignIn" onPressButton={confirmCode} />
        </Forms>
      </View>
      {LoadingBar(isLoading)}
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    alignSelf: 'center',
  },
});

export default OTP;
