import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import tailwind from 'twrnc';
import WebView from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { setUserId } from '../slice/UserSlice';
import { setIsUserLogin, setShowCheckoutSession } from '../slice/AppSlice';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { appColor } from '../components/AppColor';
import LoadingIndicator from '../components/loadingIndicator';

const LoginScreen = () => {
  const [stateLoading, setStateLoading] = useState(false);
  const [error, setError] = useState(false);
  const [webviewCount, setWebViewCount] = useState(0)
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const navigateToPreviousScreen = (navState: any) => {
    const currentUrl = navState.url;

    const pattern = /^https:\/\/kddlaundry.vercel.app\/user\/(.*)/;
    const match = currentUrl.match(pattern);
    if (match) {
      dispatch(setUserId(match[1]));
      AsyncStorage.setItem('userId', match[1]);
      dispatch(setIsUserLogin(true));
      dispatch(setShowCheckoutSession(true))
      AsyncStorage.setItem('isLogin', 'true');
      navigation.goBack();
    }
  };

  const handleReload = () => {
    setStateLoading(true)
    setWebViewCount(prev => prev + 1);

    setTimeout(() => {
      setError(false);
      setStateLoading(false)
    }, 4000)
  };

  return (
    <View style={[tailwind`flex-1`]}>
      <View style={[tailwind`pt-[40px] pb-[10px] px-[10px]`, { backgroundColor: appColor.headerColor }]}>
        <Text style={[tailwind`text-center text-[18px]`, { fontFamily: 'Lato-Bold' }]}>Authentication Portal</Text>
        <Ionicons onPress={() => navigation.goBack()} name="arrow-back-outline" size={24} color="black" style={[tailwind`absolute bottom-2 left-2`]} />
      </View>
      {stateLoading && (
        <View style={[tailwind`opacity-100 z-40`, styles.loadingContainer]}>
          <LoadingIndicator borderColor={appColor.primaryColor} width={40} height={40} borderWidth={4} />
        </View>
      )}
      <WebView
        key={webviewCount}
        source={{ uri: 'https://kddlaundry.vercel.app/native' }}
        onNavigationStateChange={navigateToPreviousScreen}
        style={{ flex: 1, width: '100%' }}
        onError={() =>  setError(true)}
      />
      {error && (
        <View style={styles.showDetailsContainer}>
          <Text>No network</Text>
          <TouchableOpacity
            style={[
              tailwind`p-2 rounded-lg mt-2 px-5`,
              { backgroundColor: appColor.primaryColor },
            ]}
            onPress={handleReload}
          >
            <Text
              style={[
                tailwind`text-center text-[15px]`,
                { fontFamily: 'Lato-Bold', color: appColor.buttonColor },
              ]}
            >
              Proceed
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: appColor.headerColor,
    zIndex: 50
  },
  showDetailsContainer: {
    position: 'absolute',
    top: 250,
    left: 0,
    right: 0,
    bottom: 0,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    zIndex:20
  },
});