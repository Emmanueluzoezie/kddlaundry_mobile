import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import tailwind from 'twrnc'
import { appColor } from './AppColor'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch } from 'react-redux'
import { setUserId } from '../slice/UserSlice'
import { setIsUserLogin } from '../slice/AppSlice'

const HomeHeader = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    AsyncStorage.getItem('userId')
      .then((value) => {
        if (value !== null) {
          dispatch(setUserId(value))
          dispatch(setIsUserLogin(true))
        }
      })

  }, [])

  return (
      <View style={[tailwind`pt-[43px] pb-[10px] px-[10px]`]}>
        <View style={[tailwind`pl-4`]}>
            <Image source={require("../assets/laundrylogo.png")} style={[tailwind`w-[80px] h-[30px] `]} />
        </View>
      {/* <Text>HomeHeader</Text> */}
    </View>
  )
}

export default HomeHeader

const styles = StyleSheet.create({})