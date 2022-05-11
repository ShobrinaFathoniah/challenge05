import {StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {LibreBaskerville} from '../Fonts';
import {moderateScale} from 'react-native-size-matters';
import {DARK_PURPLE_300, WHITE} from '../../helpers/colors';

const Button = ({text, onPressButton, style}) => {
  const passedStyles = Array.isArray(style)
    ? Object.assign({}, ...style)
    : style;

  return (
    <TouchableOpacity
      testID="ButtonLoginRegis"
      style={[styles.button, {...passedStyles}]}
      onPress={onPressButton}>
      <LibreBaskerville style={styles.buttonText}>{text}</LibreBaskerville>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    padding: moderateScale(10),
    borderRadius: moderateScale(3),
    alignSelf: 'center',
    backgroundColor: DARK_PURPLE_300,
    margin: moderateScale(10),
    width: moderateScale(260),
  },
  buttonText: {
    alignSelf: 'center',
    color: WHITE,
    fontSize: moderateScale(14),
  },
});
