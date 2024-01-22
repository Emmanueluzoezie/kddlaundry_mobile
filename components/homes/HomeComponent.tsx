import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import tailwind from 'twrnc'
import BottomButtonContainer from '../BottomButtons'
import HomeHeader from '../HomeHeader'
import { appColor } from '../AppColor'
import { useNavigation } from '@react-navigation/native'
import { useQuery } from '@apollo/client'
import { useDispatch } from 'react-redux'
import { setIsTrackButtonClicked } from '../../slice/AppSlice'

const HomeComponent = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch()

  const handleTrackButtonClick = () => {
    dispatch(setIsTrackButtonClicked(true))
    navigation.navigate("track")
  }

  return (
    <View style={[tailwind`flex-1`]}>
      {/* <Text style={styles.headerText}>XYZ Laundry Services</Text>

            <Text style={styles.overviewText}>Fast, Reliable Laundry Services at Your Fingertips</Text>

            <View style={styles.buttonContainer}>
                <Button
                    title="Schedule Pickup"
                />
                <Button
                    title="Track Order"
                />
            </View>

            <Text style={styles.howItWorksText}>How It Works</Text>
            {/* Implement a step-by-step guide here */}

      {/* <Text style={styles.testimonialHeader}>What Our Customers Say</Text>
            Implement a testimonials section here  */}
      <View style={[tailwind`flex-1`]}>
        <HomeHeader />
        <View style={[tailwind`p-4`]}>
          <TouchableOpacity onPress={() => navigation.navigate("laundry_service")} style={[tailwind`p-2 rounded-lg`, {backgroundColor: appColor.primaryColor}]}>
            <Text style={[tailwind`text-center text-[16px]`, { fontFamily: "Lato-Bold", color: appColor.buttonColor }]}>Order Laundry Service</Text>
          </TouchableOpacity>
          <View style={[tailwind`mt-8`]}>
            <View style={[tailwind`pt-2 pb-4 my-2 border-[1px] border-blue-400 rounded-md`, { backgroundColor: "#e8eefc", borderColor: appColor.primaryColor }]}>
              <Text style={[tailwind`text-center text-[18px]`, { fontFamily: "Lato-Bold", color: appColor.primaryColor }]}>Standard Laundry</Text>
              <Text style={[tailwind`px-[8px] text-center text-[14px] mt-2`, { fontFamily: "Lato-Regular", color: appColor.primaryTextColor }]}>Get your laundry back in just 3 days. Freshly cleaned and pressed items will be delivered to your doorstep
              </Text>
            </View>
            <View style={[tailwind`pt-2 pb-4 my-2 border-2 border-blue-400 rounded-md`, { backgroundColor: "#e8eefc", borderColor: appColor.primaryColor }]}>
              <Text style={[tailwind`text-center text-[18px]`, { fontFamily: "Lato-BoldItalic", color: appColor.primaryColor }]}>Express Laundry</Text>
              <Text style={[tailwind`px-[8px] text-center text-[15px] mt-2`, { fontFamily: "Lato-Italic", color: appColor.primaryTextColor }]}>Get your laundry back in just 1 day. FFreshly cleaned and pressed items will be delivered to your doorstep
              </Text>
            </View>
          </View>
          <TouchableOpacity onPress={handleTrackButtonClick} style={[tailwind`p-[6px] rounded-lg border-4 mt-4`, { borderColor: appColor.primaryColor }]}>
            <Text style={[tailwind`text-center text-[16px]`, { fontFamily: "Lato-Bold", color: appColor.primaryColor }]}>Track your Laundry items</Text>
          </TouchableOpacity>
        </View>
      </View>
      <BottomButtonContainer />
    </View>
  )
}

export default HomeComponent

const styles = StyleSheet.create({})