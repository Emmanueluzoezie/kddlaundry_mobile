import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import tailwind from 'twrnc'
import { appColor } from '../AppColor'
import { useDispatch } from 'react-redux'
import { setIsNewLocationScreen } from '../../slice/AppSlice'
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'

const ListOfLocations = ({location}: any) => {
    const dispatch = useDispatch()
    const navigation = useNavigation()

  return (
    <View style={tailwind`flex-1`}>
          <View style={[tailwind`pt-[40px] pb-[10px] px-[10px]`, { backgroundColor: appColor.headerColor }]}>
              <Text style={[tailwind`text-center text-[18px]`, { fontFamily: "Lato-Bold" }]}>Locations</Text>
              <Ionicons name="arrow-back-outline" size={24} color="black" style={[tailwind`absolute bottom-2 left-2`]} onPress={() => navigation.goBack()} />
          </View>
          <View style={tailwind`flex-1`}>
              <Text>ListOfLocations</Text>
          </View>

          <View style={[tailwind`pb-8 px-4`, { backgroundColor: "#fff" }]}>
              <TouchableOpacity style={[tailwind`p-2 rounded-lg mt-6`, { backgroundColor: appColor.primaryColor }]} onPress={() => dispatch(setIsNewLocationScreen(true))}>
                    <Text style={[tailwind`text-center text-[15px]`, { fontFamily: "Lato-Bold", color: appColor.buttonColor }]}>Add Location</Text>
                </TouchableOpacity>
          </View>
    </View>
  )
}

export default ListOfLocations

const styles = StyleSheet.create({})