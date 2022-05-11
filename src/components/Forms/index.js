import {StyleSheet, View, Image} from 'react-native';
import React from 'react';
import {moderateScale} from 'react-native-size-matters';
import {DARK_PURPLE_500} from '../../helpers/colors';
import {loginPic} from '../../assets';
import Button from '../Button';

const Forms = ({type, children, onPressButton, hideButton = false}) => {
  return (
    <View testID="FormComponent">
      <Image testID="LoginImage" style={styles.image} source={loginPic} />
      {children}
      {hideButton ? null : <Button text={type} onPressButton={onPressButton} />}
    </View>
  );
};

export default Forms;

const styles = StyleSheet.create({
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
});
