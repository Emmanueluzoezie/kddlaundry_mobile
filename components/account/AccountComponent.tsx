import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ScreenHeader from '../ScreenHeader'
import AccountHeader from './AccountHeader'
import tailwind from 'twrnc'
import { appColor } from '../AppColor'
import { AntDesign, Entypo } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { selectIsUserLogin, setIsUserLogin } from '../../slice/AppSlice'
import { useQuery } from '@apollo/client'
import { GET_USER_BY_ID } from '../../graphql/queries'
import { selectUserId } from '../../slice/UserSlice'
import LoadingIndicator from '../loadingIndicator'
import AsyncStorage from '@react-native-async-storage/async-storage'

const AccountComponent = () => {
  const [stateLoading, setStateLoading] = useState(false)
  const [forceRerender, setForceRerender] = useState(false);
  const isUserLogin = useSelector(selectIsUserLogin)
  const navigation = useNavigation()
  const getUserId = useSelector(selectUserId)
  const dispatch = useDispatch()

  const { data, loading, error, refetch } = useQuery(GET_USER_BY_ID, {
    variables: {
      user_id: getUserId
    }
  })

  const handleReload = () => {
    // Toggle the state to force a component rerender
    setStateLoading(true)
    setForceRerender((prev) => !prev);

    setTimeout(() => {
      setStateLoading(false)
    }, 4000)
  };

  const handleLogout = () => {
    dispatch(setIsUserLogin(false))
    AsyncStorage.setItem("isLogin", "false")
  }

  useEffect(() => {
    // Refetch data when the state changes
    if (forceRerender) {
      refetch();
    }
  }, [forceRerender, refetch]);

  useEffect(() => {
    AsyncStorage.getItem('isLogin')
      .then((value) => {
        if (value !== null) {
          if(value === "false"){
            dispatch(setIsUserLogin(false))
          }else {
            dispatch(setIsUserLogin(true))
          }
        }
      })
  },[])
  
  
  return (
    <View style={tailwind`flex-1`}>
        <ScreenHeader screenName="Account"/>
        {loading || stateLoading &&
          <View style={[tailwind`opacity-100 z-40`, styles.loadingContainer]}>
          <LoadingIndicator borderColor={appColor.primaryColor} width={40} height={40} borderWidth={4} />
          </View>
        }
        {error && !stateLoading && isUserLogin &&
          (<View style={[styles.showDetailsContainer, tailwind`px-4 z-40`]}>
            <View style={[tailwind`p-3 rounded-md`, { backgroundColor: appColor.headerColor }]}>
              <Text style={[tailwind`text-center text-[16px]`, { fontFamily: "Lato-Bold", color: appColor.primaryTextColor }]}>Oops! an error occur, please check your internet connection.</Text>
              <View style={tailwind`flex-row items-center justify-center mt-[30px]`}>
                <TouchableOpacity onPress={handleReload} style={[tailwind`px-6 py-2 rounded-md`, { backgroundColor: appColor.primaryColor }]}>
                  <Text style={[tailwind`text-center text-[16px]`, { fontFamily: "Lato-Bold", color: "white" }]}>Reload</Text>
                </TouchableOpacity>
              </View>
            </View>

          </View>)
        }
        {isUserLogin?
          <>
            <AccountHeader />
            <View style={[tailwind`p-3`]}>
              <View style={[tailwind`flex-row items-center`]}>
                <Text style={[tailwind`text-[16px]`, {fontFamily: "Lato-Bold"}]}>Subscription: </Text>
                <Text>Subscription: </Text>
              </View>

              <TouchableOpacity onPress={() => navigation.navigate("location")} style={[tailwind`my-2 p-2 rounded-md flex-row`, {backgroundColor: appColor.headerColor}]}>
              {data && data?.getUserById[0]?.location?.length > 0?
                <Text style={[tailwind`flex-1 text-[14px]`, { fontFamily: "Lato-Bold" }]}>Change default location</Text>
                :
                <Text style={[tailwind`flex-1 text-[14px]`, { fontFamily: "Lato-Bold" }]}>Set default location</Text>
              }
              <Entypo name="chevron-right" size={22} color="black" />
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={handleLogout} style={[tailwind`flex-row justify-center`, {fontFamily: "Lato-Bold"}]}>
              <Text style={[tailwind`text-[18px] p-2`, { fontFamily: "Lato-Bolder", color: appColor.primaryColor }]}>Logout</Text>
            </TouchableOpacity>
          </>
          :
          <View style={tailwind`flex-1 items-center justify-center`}>
            <Text style={[tailwind`text-center text-[16px]`, { fontFamily: "Lato-Regular", color: appColor.primaryTextColor }]}>You are currently not login.</Text>
            <TouchableOpacity style={[tailwind`p-2 rounded-lg mt-2 px-5`, { backgroundColor: appColor.primaryColor }]} onPress={() => navigation.navigate("login")}>
              <Text style={[tailwind`text-center text-[15px]`, { fontFamily: "Lato-Bold", color: appColor.buttonColor }]}>Proceed</Text>
            </TouchableOpacity>
          </View>
        }
    </View>
  )
}

export default AccountComponent

const styles = StyleSheet.create({
  loadingContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: appColor.headerColor
  },
  showDetailsContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#fff"
  },
})