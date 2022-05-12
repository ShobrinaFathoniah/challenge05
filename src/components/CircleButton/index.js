import {StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {moderateScale} from 'react-native-size-matters';
import {
  DARK_PURPLE_300_trans,
  DARK_PURPLE_500,
  WHITE,
} from '../../helpers/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';

const CircleButton = ({
  style,
  nameIcon,
  color = DARK_PURPLE_500,
  size = 20,
  onPress,
}) => {
  const passedStyles = Array.isArray(style)
    ? Object.assign({}, ...style)
    : style;

  return (
    <TouchableOpacity
      testID="circleButton"
      onPress={onPress}
      style={[styles.circle, {...passedStyles}]}>
      <AntDesign name={nameIcon} color={color} size={size} />
    </TouchableOpacity>
  );
};

export default CircleButton;

const styles = StyleSheet.create({
  circle: {
    height: moderateScale(40),
    width: moderateScale(40),
    borderRadius: moderateScale(100),
    backgroundColor: WHITE,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: DARK_PURPLE_300_trans,
    borderWidth: moderateScale(1),
  },
});
