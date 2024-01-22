import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import tailwind from 'twrnc'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import CheckoutChildComponent from './CheckoutChildComponent'
import { useDispatch } from 'react-redux'
import { setShowCheckoutSession } from '../../slice/AppSlice'

const CheckoutParentComponent = ({ items }:any) => {
  const navigation = useNavigation()
  const dispatch = useDispatch()

  const handleBack = () => {
    dispatch(setShowCheckoutSession(false))
  }
  return (
    <View style={tailwind`flex-1`}>
      <View style={[tailwind`pt-[45px] pb-[10px] px-[10px]`, { backgroundColor: "#fff" }]}>
        <View style={[tailwind`flex-row items-center z-40`]}>
          <TouchableOpacity onPress={handleBack}>
            <Ionicons name="arrow-back-outline" size={24} color="black" />
          </TouchableOpacity>
          <View style={tailwind`flex-row flex-1 justify-center`}>
            <Text style={[tailwind`text-center text-[18px] -ml-7`, { fontFamily: "Lato-Bold" }]}>Checkout</Text>
          </View>
        </View>
      </View>
      <CheckoutChildComponent serviceDetails={items}/>
    </View>
  )
}

export default CheckoutParentComponent

const styles = StyleSheet.create({})