import {StyleSheet, Image, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {moderateScale} from 'react-native-size-matters';
import {LibreBaskerville} from '../../components/Fonts';
import {Header} from '../../components';
import {BLACK, DARK_PURPLE_300, RED_500, WHITE} from '../../helpers/colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  sendDataLoginWithGoogle,
  setDataUser,
  setDataUserWithGoogle,
} from '../Login/redux/action';
import {loginPic} from '../../assets';
import {useIsFocused} from '@react-navigation/native';
import analytics from '@react-native-firebase/analytics';

const Profile = ({navigation}) => {
  const {dataUserGoogle, dataUser} = useSelector(state => state.login);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const focused = async () => {
    if (isFocused) {
      console.log('focused');

      await analytics().logScreenView({
        screen_class: 'Profile',
        screen_name: 'Profile',
      });
    } else {
      console.log('not focused');
    }
  };

  focused();

  const signInWithGoogle = () => {
    dispatch(sendDataLoginWithGoogle(navigation));
    dispatch(setDataUser({user: null}));
  };

  const googleButton = () => {
    return (
      <TouchableOpacity
        style={[styles.button, styles.containerButtonLogout]}
        onPress={signInWithGoogle}>
        <FontAwesome name="google" color={RED_500} size={24} />
      </TouchableOpacity>
    );
  };

  const logOut = () => {
    dispatch(setDataUser({user: null}));
    dispatch(setDataUserWithGoogle({user: null}));
    navigation.navigate('Login');
  };

  const logOutButton = () => {
    return (
      <TouchableOpacity
        style={[styles.button, styles.containerButtonLogout]}
        onPress={logOut}>
        <AntDesign name="logout" color={DARK_PURPLE_300} size={24} />
      </TouchableOpacity>
    );
  };

  const data = () => {
    if (dataUserGoogle.user !== null) {
      return (
        <View>
          <Image
            source={{uri: dataUserGoogle.user.photo}}
            style={styles.image}
          />
          <View style={styles.containerName}>
            <LibreBaskerville style={styles.textNama}>
              {dataUserGoogle.user.name}
            </LibreBaskerville>
          </View>
          <View style={styles.containerName}>
            <LibreBaskerville style={styles.textNama}>
              {dataUserGoogle.user.email}
            </LibreBaskerville>
          </View>
          {logOutButton()}
        </View>
      );
    } else if (dataUser.user !== null) {
      return (
        <View>
          <Image
            source={{
              uri: dataUser.photoURL
                ? dataUser.photoURL
                : 'https://www.jobstreet.co.id/en/cms/employer/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png',
            }}
            style={styles.image}
          />
          <View style={styles.containerName}>
            <LibreBaskerville style={styles.textNama}>
              {dataUser.displayName ? dataUser.displayName : 'Nama Anda'}
            </LibreBaskerville>
          </View>
          <View style={styles.containerName}>
            <LibreBaskerville style={styles.textNama}>
              {dataUser.phoneNumber}
            </LibreBaskerville>
          </View>
          <View style={styles.containerName}>
            <LibreBaskerville style={styles.textNama}>
              {dataUser.email ? dataUser.email : googleButton()}
            </LibreBaskerville>
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.containerNotLogin}>
          <Image source={loginPic} style={styles.imagePic} />
          <LibreBaskerville style={styles.text}>
            You're login using fingerprint, to see this page, you must login
            using Google Account
          </LibreBaskerville>
          <View style={styles.twoColumns}>
            {googleButton()}
            {logOutButton()}
          </View>
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      <Header text="Profile" radiusBottom={true} />
      {data()}
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: moderateScale(150),
    height: moderateScale(150),
    alignSelf: 'center',
    borderRadius: moderateScale(100),
    marginVertical: moderateScale(10),
  },
  containerName: {
    margin: moderateScale(10),
    alignSelf: 'center',
  },
  textNama: {
    fontSize: moderateScale(18),
    color: BLACK,
  },
  button: {
    padding: moderateScale(10),
    borderRadius: moderateScale(3),
    backgroundColor: WHITE,
    margin: moderateScale(10),
  },
  containerButtonLogout: {
    alignSelf: 'center',
  },
  text: {
    alignSelf: 'center',
    fontSize: moderateScale(14),
    margin: moderateScale(10),
    color: BLACK,
    textAlign: 'center',
  },
  containerNotLogin: {
    flex: 1,
  },
  imagePic: {
    height: moderateScale(300),
    width: moderateScale(300),
    alignSelf: 'center',
    margin: moderateScale(10),
  },
  twoColumns: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
});
