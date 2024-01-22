import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import tailwind from 'twrnc'
import OrdersComponent from '../components/orders/OrdersComponent'
import BottomButtonContainer from '../components/BottomButtons'

const OrderScreen = () => {
  return (
      <View style={[tailwind`flex-1`]}>
          <View style={[tailwind`flex-1`]}>
              <OrdersComponent />
          </View>
          <BottomButtonContainer />
      </View>
  )
}

export default OrderScreen

const styles = StyleSheet.create({})