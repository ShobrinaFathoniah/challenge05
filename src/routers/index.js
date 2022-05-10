import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MainStack from './MainStack';
import {navigationRef} from '../helpers/navigate';

const Root = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <MainStack />
    </NavigationContainer>
  );
};

export default Root;
