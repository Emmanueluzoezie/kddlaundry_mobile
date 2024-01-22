import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import BottomButtonContainer from '../components/BottomButtons'
import tailwind from 'twrnc'
import AccountComponent from '../components/account/AccountComponent'

const AccountScreen = () => {
  return (
    <View style={[tailwind`flex-1`]}>
      <View style={[tailwind`flex-1`]}>
        <AccountComponent />
      </View>
      <BottomButtonContainer />
    </View>
  )
}

export default AccountScreen 

const styles = StyleSheet.create({})