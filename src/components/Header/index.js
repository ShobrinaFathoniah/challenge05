import {StyleSheet, View, StatusBar} from 'react-native';
import React from 'react';
import {moderateScale} from 'react-native-size-matters';
import {BLACK, DARK_PURPLE_100} from '../../helpers/colors';
import {PassionConflict} from '../Fonts';

const Header = ({button = false, radiusBottom = false, text = 'iRead'}) => {
  const styles = StyleSheet.create({
    page: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: DARK_PURPLE_100,
      justifyContent: button ? 'space-evenly' : 'center',
      borderBottomEndRadius: radiusBottom ? 150 : 0,
      borderBottomStartRadius: radiusBottom ? 150 : 0,
    },
    textAppName: {
      fontSize: moderateScale(42),
      margin: moderateScale(10),
      color: BLACK,
      letterSpacing: moderateScale(2),
      textAlign: 'center',
    },
  });

  return (
    <View style={styles.page}>
      <StatusBar barStyle="dark-content" backgroundColor={DARK_PURPLE_100} />
      <PassionConflict style={styles.textAppName}>{text}</PassionConflict>
    </View>
  );
};

export default Header;
