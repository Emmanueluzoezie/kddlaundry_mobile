import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import tailwind from 'twrnc'
import { appColor } from '../components/AppColor'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { useQuery } from '@apollo/client'
import { GET_LOCATION_BY_USER_ID } from '../graphql/queries'
import { useDispatch, useSelector } from 'react-redux'
import { selectUserId } from '../slice/UserSlice'
import { selectIsNewLocationScreen, selectTypeOfLocationScreen, setIsNewLocationScreen, setTypeOfLocationScreen } from '../slice/AppSlice'
import AddNewLocation from '../components/location/AddNewLocation'
import ListOfLocations from '../components/location/ListOfLocations'

const LocationScreen = () => {
  const [stateLoading, setStateLoading] = useState(false)
  const [forceRerender, setForceRerender] = useState(false);
  const navigation = useNavigation()
  const getUserId = useSelector(selectUserId)
  const isNewLocationScreen = useSelector(selectIsNewLocationScreen)
  const getCurrentLocationScreen = useSelector(selectTypeOfLocationScreen)
  const dispatch = useDispatch()

  const { data, loading, error, refetch } = useQuery(GET_LOCATION_BY_USER_ID, {
    variables: {
      user_id: getUserId 
    }
  })   
  
  if(loading){
    console.log("loading....")
  }

  if(error){
    console.log(error) 
  }

  useEffect(() => {
    if (data && data?.getLocationByUserId.length <= 0){
      dispatch(setIsNewLocationScreen(true))
    }
  }, [])

  const handleReload = () => {
    // Toggle the state to force a component rerender
    setStateLoading(true)
    setForceRerender((prev) => !prev);

    setTimeout(() => {
      setStateLoading(false)
    }, 4000)
  };

  useEffect(() => {
    // Refetch data when the state changes
    if (forceRerender) {
      refetch();
    }
  }, [forceRerender, refetch]);

  return (
    <View style={tailwind`flex-1`}>
        {loading || stateLoading &&
          <View style={[tailwind`opacity-90 z-40`, styles.loadingContainer]}>
            <ActivityIndicator size="large" color={appColor.primaryColor} />
          </View>
        }
        {error && !stateLoading &&
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
        <View style={tailwind`flex-1`}>
          {!isNewLocationScreen?
          <ListOfLocations location={data?.getLocationByUserId[0]}/>
            :
            <AddNewLocation  />
          }
        </View>
    </View>
  )
}

export default LocationScreen

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