import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import tailwind from 'twrnc'
import ScreenHeader from '../ScreenHeader'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentOrderScreen, setCurrentOrderScreen } from '../../slice/AppSlice'
import { appColor } from '../AppColor'
import OngoingOrders from './OngoingOrders'
import CompletedOrders from './CompletedOrders'

const OrdersComponent = () => {
    const currentOrderScreen = useSelector(selectCurrentOrderScreen)
    const dispatch = useDispatch()

    const color = currentOrderScreen === "ongoing" ? appColor.primaryColor : appColor.textColor

    const handleClickButton = (clickedButton: string) => {
        dispatch(setCurrentOrderScreen(clickedButton))
    }

  return (
    <View style={[tailwind`flex-1`]}>
        <ScreenHeader screenName='Orders' />
        <View style={[tailwind`px-4 p-3 flex-row`]}>
              <TouchableOpacity onPress={() => handleClickButton("ongoing")} style={[tailwind`border-b-2 flex-1`, { borderColor: currentOrderScreen === "ongoing" ? appColor.primaryColor : appColor.textColor, borderBottomWidth: currentOrderScreen === "ongoing" ? 3:0}]}>
                  <Text style={[tailwind`pb-2 pl-2 text-center`, { fontFamily: "Lato-Bold", color: currentOrderScreen === "ongoing" ? appColor.primaryColor : appColor.textColor }]}>Ongoing Orders</Text>
            </TouchableOpacity>
              <TouchableOpacity onPress={() => handleClickButton("completed")} style={[tailwind`border-b-2 flex-1 `, { borderColor: currentOrderScreen === "ongoing" ? appColor.textColor : appColor.primaryColor, borderBottomWidth: currentOrderScreen === "ongoing" ? 0 : 3 }]}>
                  <Text style={[tailwind`pb-2 pl-2 text-center`, { fontFamily: "Lato-Bold", color: currentOrderScreen === "ongoing" ? appColor.textColor : appColor.primaryColor }]}>Completed Orders</Text>
            </TouchableOpacity>
        </View>
        {currentOrderScreen === "ongoing"?
            <OngoingOrders />
            :
            <CompletedOrders />
        }
    </View>
  )
}

export default OrdersComponent

const styles = StyleSheet.create({})