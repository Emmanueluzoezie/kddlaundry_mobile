import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import tailwind from 'twrnc'
import { appColor } from '../AppColor'

const AccountHeader = () => {
  return (
    <View style={[tailwind`px-4 py-2`, {backgroundColor: appColor.headerColor}]}>
      <Text style={[tailwind`text-[18px]`, {fontFamily: "Lato-Bold", color: appColor.primaryColor}]}>Welcome Emmanuel!</Text>
          <Text style={[tailwind`text-[14px]`, { fontFamily: "Lato-Regular" }]}>Emma@gmail.com</Text>
    </View>
  )
}

export default AccountHeader

const styles = StyleSheet.create({})