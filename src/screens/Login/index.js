import {View, ScrollView} from 'react-native';
import React, {useState} from 'react';
import {Forms, Header, Input} from '../../components';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginScreen = () => {
    return (
      <View testID="LoginScreen">
        <Forms onPressButton={() => navigation.navigate('MainApp')}>
          <View>
            <Input
              testID="emailForm"
              onChangeText={value => setEmail(value)}
              value={email}
              placeholder="Email"
            />
            <Input
              testID="passwordForm"
              onChangeText={value => setPassword(value)}
              value={password}
              placeholder="Password"
              secureTextEntry={true}
            />
          </View>
        </Forms>
      </View>
    );
  };

  return (
    <ScrollView>
      <Header radiusBottom={true} />
      {loginScreen()}
    </ScrollView>
  );
};

export default Login;
