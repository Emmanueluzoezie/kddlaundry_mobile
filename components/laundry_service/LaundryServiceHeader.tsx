import { StyleSheet, Text, View, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import tailwind from 'twrnc'
import { appColor } from '../AppColor'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

type HeaderType = {
  title: string,
  onPress: () => void
}

const LaundryServiceHeader = ({ title, onPress }: HeaderType) => {
  

  return (
    <View style={[tailwind`pt-[45px] pb-[10px] px-[10px]`, { backgroundColor: "#fff" }]}>
      <View style={[tailwind`flex-row items-center z-40`]}>
        <TouchableOpacity onPress={onPress}>
          <Ionicons name="arrow-back-outline" size={24} color="black" />
        </TouchableOpacity>
        <View style={tailwind`flex-row flex-1 justify-center`}>
          <Text style={[tailwind`text-center text-[18px] -ml-7`, { fontFamily: "Lato-Bold" }]}>{title}</Text>
        </View>
      </View>
    </View>
  )
}

export default LaundryServiceHeader

const styles = StyleSheet.create({})