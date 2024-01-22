import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import tailwind from 'twrnc'
import BottomButtonContainer from '../components/BottomButtons'
import ScreenHeader from '../components/ScreenHeader'
import HelpComponent from '../components/help/HelpComponent'

const HelpScreen = () => {
  return (
    <View style={[tailwind`flex-1`]}>
      <View style={[tailwind`flex-1`]}>
        <ScreenHeader screenName="Help" />
        <HelpComponent />
      </View>
      <BottomButtonContainer />
    </View>
  )
}

export default HelpScreen

const styles = StyleSheet.create({})