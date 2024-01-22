import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import tailwind from 'twrnc'
import { appColor } from '../AppColor'
import { AntDesign } from '@expo/vector-icons'

const HelpComponent = () => {
  return (
    <View style={[tailwind`p-3`]}>
        <TouchableOpacity style={[tailwind`p-2 rounded-lg my-2`, { backgroundColor: appColor.primaryColor }]}>
            <Text style={[tailwind`text-center text-[15px]`, { fontFamily: "Lato-Bold", color: appColor.buttonColor }]}>Chat with us</Text>
        </TouchableOpacity>
        <View style={[tailwind`mt-3`]}>
            <Text style={[tailwind`text-[13px] pl-3 uppercase my-1`, { fontFamily: "Lato-Bolder", color: appColor.primaryTextColor }]}>About KDD laundry service</Text>
              <View style={[tailwind`p-3 rounded-md`, {backgroundColor: appColor.cardColor}]}>
                <TouchableOpacity activeOpacity={1} style={[tailwind`py-3 flex-row items-center`]}>
                    <Text style={[tailwind`text-[15px] flex-1`, { fontFamily: "Lato-Bold", color: appColor.primaryTextColor }]}>KDD Laundry Service</Text>
                    <AntDesign name="right" size={16} color="black" />
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={1} style={[tailwind`py-3 flex-row items-center`]}>
                    <Text style={[tailwind`text-[15px] flex-1`, { fontFamily: "Lato-Bold", color: appColor.primaryTextColor }]}>Privacy Policy</Text>
                    <AntDesign name="right" size={16} color="black" />
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={1} style={[tailwind`py-3 flex-row items-center`]}>
                    <Text style={[tailwind`text-[15px] flex-1`, { fontFamily: "Lato-Bold", color: appColor.primaryTextColor }]}>FAQ</Text>
                    <AntDesign name="right" size={16} color="black" />
                </TouchableOpacity>
            </View>
        </View>
        <View style={[tailwind`mt-3`]}>
            <Text style={[tailwind`text-[13px] pl-3 uppercase my-2`, { fontFamily: "Lato-Bolder", color: appColor.primaryTextColor }]}>Settings</Text>
              <View style={[tailwind`p-3 rounded-md`, {backgroundColor: appColor.cardColor}]}>
                <TouchableOpacity activeOpacity={1} style={[tailwind`py-3 flex-row items-center`]}>
                    <Text style={[tailwind`text-[15px] flex-1`, { fontFamily: "Lato-Bold", color: appColor.primaryTextColor }]}>KDD Laundry Service</Text>
                    <AntDesign name="right" size={16} color="black" />
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={1} style={[tailwind`py-3 flex-row items-center`]}>
                    <Text style={[tailwind`text-[15px] flex-1`, { fontFamily: "Lato-Bold", color: appColor.primaryTextColor }]}>Language</Text>
                    <Text style={[tailwind`text-[15px]`, { fontFamily: "Lato-Bold", color: appColor.primaryTextColor }]}>English</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={1} style={[tailwind`py-3 flex-row items-center`]}>
                    <Text style={[tailwind`text-[15px] flex-1`, { fontFamily: "Lato-Bold", color: appColor.primaryTextColor }]}>Country</Text>
                    <Text style={[tailwind`text-[15px]`, { fontFamily: "Lato-Bold", color: appColor.primaryTextColor }]}>Nigeria</Text>
                    <AntDesign name="right" size={16} color="black" />
                </TouchableOpacity>
            </View>
        </View>
    </View>
  )
}

export default HelpComponent

const styles = StyleSheet.create({})