import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import tailwind from 'twrnc'
import { Ionicons } from '@expo/vector-icons'
import { appColor } from '../AppColor'
import SingleCompletedOrder from './SingleCompletedOrder'
import LoadingIndicator from '../loadingIndicator'
import { selectLaundryCompletedDetail, selectShowCompletedDetail, setShowCompletedDetail } from '../../slice/ServiceSlice'
import { GET_ALL_USER_ORDERS_BY_IS_COMPLETED } from '../../graphql/queries'
import { useQuery } from '@apollo/client'
import { useDispatch, useSelector } from 'react-redux'
import { selectUserId } from '../../slice/UserSlice'

const CompletedOrders = () => {
  const [forceRerender, setForceRerender] = useState(false);
  const [stateLoading, setStateLoading] = useState(false)
  const [getDateGiven, setDateGiven] = useState("")
  const [pickupDate, setPickupDate] = useState<string>("");
  const getUserId = useSelector(selectUserId)
  const showDetails = useSelector(selectShowCompletedDetail)
  const getOngoingOrderDetails = useSelector(selectLaundryCompletedDetail)
  const dispatch = useDispatch()

  const { data, loading, error, refetch } = useQuery(GET_ALL_USER_ORDERS_BY_IS_COMPLETED, {
    variables: {
      user_id: getUserId,
      is_completed: true
    }
  })

  const dateGiven = new Date(getOngoingOrderDetails.created_at).toDateString()
  const formattedAmount = getOngoingOrderDetails.amount.toLocaleString();
  const formattedTotalAmount = getOngoingOrderDetails.total_amount.toLocaleString();

  const handleCLoseDetail = () => {
    dispatch(setShowCompletedDetail(false))
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
    const createdDate = new Date(getOngoingOrderDetails.created_at);
    const next3DaysDate = new Date(createdDate);

    if (getOngoingOrderDetails?.type_of_service === "Regular") {
      setPickupDate("Tomorrow")
    } else {
      next3DaysDate.setDate(createdDate.getDate() + 3);
      setPickupDate(next3DaysDate.toDateString())
    }
  }, [getOngoingOrderDetails.created_at]);

  return (
    <View style={[tailwind`flex-1 relative px-4`]}>
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
      {data?.getAllUserServicesByUser_idAndIsCompleted.length > 0 &&
        <FlatList
          data={data?.getAllUserServicesByUser_idAndIsCompleted}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <SingleCompletedOrder item={item} />
          )}
        />
      }
      {showDetails &&
        <View style={[styles.showDetailsContainer, tailwind` border-[1px] rounded-lg mx-4`, { borderColor: appColor.headerColor }]}>
          <View style={[tailwind`w-full p-2 rounded-lg relative`]}>
            <Ionicons name="close-sharp" size={24} color="black" style={[tailwind`absolute right-2 -top-4`]} onPress={handleCLoseDetail} />
            <View style={[tailwind`px-2`]} >
              <View style={[tailwind`flex-row items-center my-[1px]`]}>
                <Text style={[tailwind`w-[120px]`, { fontFamily: "Lato-Regular", color: appColor.primaryTextColor }]}>Name: </Text>
                <Text style={[tailwind`flex-1`, { fontFamily: "Lato-Regular", color: appColor.primaryTextColor }]}>{getOngoingOrderDetails.name}</Text>
              </View>
              <View style={[tailwind`flex-row items-center my-[1px]`]}>
                <Text style={[tailwind`w-[120px]`, { fontFamily: "Lato-Regular", color: appColor.primaryTextColor }]}>Date given: </Text>
                <Text style={[tailwind`flex-1`, { fontFamily: "Lato-Regular", color: appColor.primaryTextColor }]}>{dateGiven}</Text>
              </View>
              <View style={[tailwind`flex-row items-center my-[1px]`]}>
                <Text style={[tailwind`w-[120px]`, { fontFamily: "Lato-Regular", color: appColor.primaryTextColor }]}>Quantity: </Text>
                <Text style={[tailwind`flex-1`, { fontFamily: "Lato-Regular", color: appColor.primaryTextColor }]}>{getOngoingOrderDetails.quantity}</Text>
              </View>
              <View style={[tailwind`flex-row items-center my-[1px]`]}>
                <Text style={[tailwind`w-[120px]`, { fontFamily: "Lato-Regular", color: appColor.primaryTextColor }]}>Amount: </Text>
                <Text style={[tailwind`flex-1`, { fontFamily: "Lato-Regular", color: appColor.primaryTextColor }]}> ₦ {formattedAmount}</Text>
              </View>
              <View style={[tailwind`flex-row items-center my-[1px]`]}>
                <Text style={[tailwind`w-[120px]`, { fontFamily: "Lato-Regular", color: appColor.primaryTextColor }]}>Type of service: </Text>
                <Text style={[tailwind`flex-1`, { fontFamily: "Lato-Regular", color: appColor.primaryTextColor }]}>{getOngoingOrderDetails.type_of_service}</Text>
              </View>
              <View style={[tailwind`flex-row items-center my-[1px]`]}>
                <Text style={[tailwind`w-[120px]`, { fontFamily: "Lato-Regular", color: appColor.primaryTextColor }]}>Total: </Text>
                <Text style={[tailwind`flex-1`, { fontFamily: "Lato-Regular", color: appColor.primaryTextColor }]}> ₦{formattedTotalAmount}</Text>
              </View>
              <View style={[tailwind`flex-row items-center my-[1px]`]}>
                <Text style={[tailwind`w-[120px]`, { fontFamily: "Lato-Regular", color: appColor.primaryTextColor }]}>Track Number: </Text>
                <Text style={[tailwind`flex-1`, { fontFamily: "Lato-Regular", color: appColor.primaryColor }]}>#{getOngoingOrderDetails.order_number}</Text>
              </View>
              <View style={[tailwind`flex-row items-center my-[1px]`]}>
                <Text style={[tailwind`w-[120px]`, { fontFamily: "Lato-Regular", color: appColor.primaryTextColor }]}>Pickup date: </Text>
                {pickupDate !== null &&
                  <Text style={[tailwind`flex-1`, { fontFamily: "Lato-Regular", color: appColor.primaryTextColor }]}>{pickupDate}</Text>
                }
              </View>
              <View style={[tailwind`flex-row items-center my-[1px]`]}>
                <Text style={[tailwind`w-[120px]`, { fontFamily: "Lato-Regular", color: appColor.primaryTextColor }]}>Status: </Text>
                <Text style={[tailwind` capitalize p-[2px] px-2 text-[12px]`, { fontFamily: "Lato-Bold", backgroundColor: appColor.successColor, color: appColor.headerColor }]}>{getOngoingOrderDetails.current_state}</Text>
              </View>
            </View>
          </View>
        </View>
      }
    </View>
  )
}

export default CompletedOrders

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
    top: 200,
    left: 0,
    right: 0,
    bottom: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#fff"
  },
})