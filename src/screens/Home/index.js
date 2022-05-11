import React, {useEffect} from 'react';
import {View, Button} from 'react-native';
import crashlytics from '@react-native-firebase/crashlytics';
import analytics from '@react-native-firebase/analytics';

const Home = () => {
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
          onPress={async () =>
            await analytics().logEvent('basket', {
              id: 3745092,
              item: 'mens grey t-shirt',
              description: ['round neck', 'long sleeved'],
              size: 'L',
            })
          }
        />
      </View>
    </View>
  );
};

export default Home;
