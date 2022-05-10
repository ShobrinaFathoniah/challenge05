import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {Home, Login, Maps, QRCode} from '../screens';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MainApp"
        component={MainApp}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const MainApp = () => (
  <Tab.Navigator screenOptions={{headerShown: false}}>
    <Tab.Screen
      options={{
        tabBarLabel: 'QRCode',
        tabBarIcon: ({color, size}) => (
          <Fontisto name="qrcode" color={color} size={size} />
        ),
      }}
      name="QRCode"
      component={QRCode}
    />
    <Tab.Screen
      options={{
        tabBarLabel: 'Home',
        tabBarIcon: ({color, size}) => (
          <AntDesign name="home" color={color} size={size} />
        ),
      }}
      name="Home"
      component={Home}
    />
    <Tab.Screen
      options={{
        tabBarLabel: 'Maps',
        tabBarIcon: ({color, size}) => (
          <Fontisto name="map" color={color} size={size} />
        ),
      }}
      name="Maps"
      component={Maps}
    />
  </Tab.Navigator>
);

export default MainStack;
