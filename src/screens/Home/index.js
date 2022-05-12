import React, {useEffect} from 'react';
import {View, Button, Alert, BackHandler} from 'react-native';
import crashlytics from '@react-native-firebase/crashlytics';
import analytics from '@react-native-firebase/analytics';
import messaging from '@react-native-firebase/messaging';
import {useIsFocused} from '@react-navigation/native';

const Home = () => {
  //analytics
  const isFocused = useIsFocused();

  const focused = async () => {
    if (isFocused) {
      console.log('focused');

      await analytics().logScreenView({
        screen_class: 'Home',
        screen_name: 'Home',
      });
    } else {
      console.log('not focused');
    }
  };

  focused();

  // tombol exit
  const exit = () => {
    const backAction = () => {
      Alert.alert('Hold on!', 'Do you want to exit the application?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'YES', onPress: () => BackHandler.exitApp()},
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  };

  const onSignIn = async user => {
    crashlytics().log('User signed in.');
    await Promise.all([
      crashlytics().setUserId(user.uid),
      crashlytics().setAttribute('credits', String(user.credits)),
      crashlytics().setAttributes({
        role: 'admin',
        followers: '13',
        email: user.email,
        username: user.username,
      }),
    ]);
  };

  useEffect(() => {
    exit();
    crashlytics().log('App mounted.');
  }, []);

  return (
    <View>
      <View>
        <Button
          title="Sign In"
          onPress={() =>
            onSignIn({
              uid: 'Aa0Bb1Cc2Dd3Ee4Ff5Gg6Hh7Ii8Jj9',
              username: 'Joaquin Phoenix',
              email: 'phoenix@example.com',
              credits: 42,
            })
          }
        />
        <Button title="Test Crash" onPress={() => crashlytics().crash()} />
      </View>
      <View>
        <Button
          title="Add To Basket"
          onPress={async () => {
            await analytics().logEvent('login', {
              id: 3745092,
              item: 'mens grey t-shirt',
              description: ['round neck', 'long sleeved'],
              size: 'L',
            });
            const token = await messaging().getToken();
            console.log(token, 'token');
          }}
        />
      </View>
    </View>
  );
};

export default Home;
