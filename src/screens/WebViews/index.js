import {StyleSheet, View, Dimensions} from 'react-native';
import React, {useState} from 'react';
import {WebView} from 'react-native-webview';
import {CircleButton} from '../../components';
import {moderateScale} from 'react-native-size-matters';

const WebViews = ({route, navigation}) => {
  const uri = route.params.uri;
  const [webview, setWebView] = useState(null);

  return (
    <View style={styles.container}>
      <View style={styles.headerButton}>
        <View style={styles.containerButton1}>
          <CircleButton
            style={styles.button1}
            nameIcon="arrowleft"
            onPress={() => webview.goBack()}
          />
          <CircleButton
            nameIcon="arrowright"
            onPress={() => webview.goForward()}
          />
        </View>
        <CircleButton nameIcon="reload1" onPress={() => webview.reload()} />
        <CircleButton nameIcon="close" onPress={() => navigation.goBack()} />
      </View>
      <WebView
        ref={ref => setWebView(ref)}
        source={{uri: uri}}
        style={styles.web}
        startInLoadingState={true}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        onError={syntheticEvent => {
          const {nativeEvent} = syntheticEvent;
          console.log('WebView error: ', nativeEvent);
        }}
        scalesPageToFit={true}
      />
    </View>
  );
};

export default WebViews;

const styles = StyleSheet.create({
  web: {
    ...StyleSheet.absoluteFillObject,
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },
  container: {
    flex: 1,
  },
  headerButton: {
    margin: moderateScale(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  containerButton1: {
    flexDirection: 'row',
  },
  button1: {
    marginEnd: moderateScale(5),
  },
});
