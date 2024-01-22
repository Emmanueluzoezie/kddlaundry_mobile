import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import tailwind from 'twrnc'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { appColor } from '../components/AppColor'
import { useDispatch, useSelector } from 'react-redux'
import { setShowAllLaundryItems } from '../slice/ServiceSlice'
import { useQuery } from '@apollo/client'
import { GET_ALL_USER_ORDERS_BY_IS_COMPLETED } from '../graphql/queries'
import { selectUserId } from '../slice/UserSlice'
import LoadingIndicator from '../components/loadingIndicator'
import SingleTrackItem from '../components/track/SingleTrackItem'
import { selectIsTrackButtonClicked } from '../slice/AppSlice'

const TrackScreen = () => {
    const [stateLoading, setStateLoading] = useState(false)
    const [forceRerender, setForceRerender] = useState(false);
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const getUserId = useSelector(selectUserId)
    const checkIsButtonClicked = useSelector(selectIsTrackButtonClicked)

    const { data, loading, error, refetch } = useQuery(GET_ALL_USER_ORDERS_BY_IS_COMPLETED,{
        variables: {
            user_id: getUserId,
            is_completed: false
        }
    })
    
    const handleAddItem = () => {
        dispatch(setShowAllLaundryItems(false))
        navigation.navigate("laundry_service")
    }

    const handleReload = () => {
        // Toggle the state to force a component rerender
        setStateLoading(true)
        setForceRerender((prev) => !prev);

        setTimeout(() => {
            setStateLoading(false)
        }, 4000)
    };

    useEffect(() => {
        if (forceRerender) {
            refetch();
        }
    }, [forceRerender, refetch]);

    useEffect(() => {
        if (checkIsButtonClicked) {
            refetch();
        }
    }, [checkIsButtonClicked, refetch]);

  return (
    <View style={tailwind`flex-1`}>
          {loading || stateLoading &&
              <View style={[tailwind`opacity-100 z-40`, styles.loadingContainer]}>
                  <LoadingIndicator borderColor={appColor.primaryColor} width={40} height={40} borderWidth={4} />
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
          <View style={[tailwind`pt-[45px] pb-[10px] px-[10px]`, { backgroundColor: "#fff" }]}>
              <View style={[tailwind`flex-row items-center z-40`]}>
                  <TouchableOpacity onPress={() => navigation.goBack()}>
                      <Ionicons name="arrow-back-outline" size={24} color="black" />
                  </TouchableOpacity>
                  <View style={tailwind`flex-row flex-1 justify-center`}>
                      <Text style={[tailwind`text-center text-[18px] -ml-7`, { fontFamily: "Lato-Bold" }]}>Your Laundry Items</Text>
                  </View>
              </View>
          </View>
          <View style={[tailwind`pt-3`]}>
              {data?.getAllUserServicesByUser_idAndIsCompleted && data?.getAllUserServicesByUser_idAndIsCompleted.length > 0 ? (
                  <FlatList
                      style={tailwind`px-3 `}
                      data={data?.getAllUserServicesByUser_idAndIsCompleted || []}
                      keyExtractor={(item) => (item && item.id ? item.id.toString() : Math.random().toString())}
                      renderItem={({ item }) => item && <SingleTrackItem item={item} />}
                  />
              ) : (
                  <View style={[tailwind`p-4`]}>
                      <Text style={[tailwind`py-4 px-2 text-[15px]`, { fontFamily: "Lato-Regular", color: appColor.primaryTextColor }]}>
                          Looks like you haven't added any items for tracking. Head to your order list to view completed items, or start a new order now by tapping the button below or navigate to the order session.
                      </Text>
                      <TouchableOpacity onPress={handleAddItem} style={[tailwind`p-[10px] px-[20px] rounded-lg mt-4`, { backgroundColor: appColor.primaryColor }]}>
                          <Text style={[tailwind`text-center text-[16px]`, { fontFamily: "Lato-Bold", color: appColor.headerColor }]}>Add items</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => navigation.navigate("orders")} style={[tailwind`p-[6px] rounded-lg border-4 mt-4`, { borderColor: appColor.primaryColor }]}>
                          <Text style={[tailwind`text-center text-[16px]`, { fontFamily: "Lato-Bold", color: appColor.primaryColor }]}>View Order List</Text>
                      </TouchableOpacity>
                  </View>
              )}
          </View>
    </View>
  )
}

export default TrackScreen

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
        zIndex: 20
    },
});