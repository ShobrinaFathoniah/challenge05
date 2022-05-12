import React from 'react';
import Root from './src/routers';
import {Provider} from 'react-redux';
import {store} from './src/store';
import messaging from '@react-native-firebase/messaging';

const App = () => {
  //notification
  const onNotificationOpen = () => {
    //triger when app in backgroud
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state',
        remoteMessage.notification,
      );
    });

    //it will triger when app was in quit mode
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state: ',
            remoteMessage.notification,
          );
        }
      });

    messaging().onMessage(remoteMessage => {
      console.log(remoteMessage, 'on message');
    });
  };
  onNotificationOpen();

  return (
    <Provider store={store}>
      <Root />
    </Provider>
  );
};

export default App;
