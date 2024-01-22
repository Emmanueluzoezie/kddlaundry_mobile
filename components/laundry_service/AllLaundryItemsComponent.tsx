import { ActivityIndicator, ActivityIndicatorBase, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import tailwind from 'twrnc'
import LaundryServiceHeader from './LaundryServiceHeader'
import { useDispatch, useSelector } from 'react-redux'
import { selectAllLaundryItems, setAllLaundryItems, setCheckoutSession, setShowAllLaundryItems } from '../../slice/ServiceSlice'
import { appColor } from '../AppColor'
import { useNavigation } from '@react-navigation/native'
import { MaterialIcons } from '@expo/vector-icons'
import { selectIsUserLogin, setShowCheckoutSession } from '../../slice/AppSlice'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useQuery } from '@apollo/client'
import { GET_ALL_ITEMS_BY_ORDER_ID } from '../../graphql/queries'
import SingleLaundryItem from './SingleLaundryItem'

const AllLaundryItemsComponent = ({ items }: any) => {
    const [loginPermission, setLoginPermission] = useState(false)
    const isUserLogin = useSelector(selectIsUserLogin)
    const dispatch = useDispatch() 
    const navigation = useNavigation()   

    const handleBack = () => {
        navigation.goBack()
    }

    const totalAmount = items?.reduce((total: number, item: LaundryItemType) => total + item.total_amount, 0).toLocaleString();

    const handleProcess = () => {
        if(isUserLogin){
            dispatch(setShowCheckoutSession(true))
        } else {
            setLoginPermission(true)
        }
    }

    const handleContinueLogin = () => {
        navigation.navigate("login")
        setLoginPermission(false)
    }
    
  return (
    <View style={[tailwind`flex-1 relative`]}>
          <View style={[tailwind`flex-1 pb-[90px]`]}>
              <LaundryServiceHeader title='Laundry Items' onPress={handleBack} />
              
              <View style={[tailwind`pt-3`]}>
                  {items?.length > 0 ?
                      <FlatList
                          style={tailwind`px-3 `}
                          data={items}
                          keyExtractor={(item) => item.id.toString()}
                          renderItem={({ item }) => (
                              <SingleLaundryItem item={item} />
                          )}
                      />
                      :
                      <View style={[tailwind`justify-center items-center`]}>
                        <Text style={[tailwind`text-[18px]`, { fontFamily: "Lato-Regular", color: appColor.primaryTextColor }]}>You currently don't have an item</Text>
                      </View>
                  }
              </View>
          </View>
        <View style={[tailwind`pb-8 px-4 pt-3`, {backgroundColor: "#fff"}]}>
            {items?.length > 0 &&
                <View style={[tailwind`flex-row`]}>
                    <Text style={[tailwind`w-[60px] text-[15px]`, { fontFamily: "Lato-Bolder", color: appColor.primaryTextColor }]}>Total: </Text>
                        <Text style={[tailwind`w-[120px] text-[15px]`, { fontFamily: "Lato-Bolder", color: appColor.primaryTextColor }]}>₦ {totalAmount}</Text>
                </View>
            }
            <TouchableOpacity onPress={() => dispatch(setShowAllLaundryItems(false))} style={[tailwind`p-2 rounded-lg mt-4`, { borderColor: appColor.primaryColor, borderWidth: items?.length > 0 ? 2 : 0, backgroundColor: items?.length > 0 ? "#fff" : appColor.primaryColor }]}>
                <Text style={[tailwind`text-center text-[15px]`, { fontFamily: "Lato-Bold", color: items?.length > 0 ? appColor.primaryColor : "white"  }]}>{items?.length > 0 ? "Add more items" : "Add an item"}</Text>
            </TouchableOpacity>
            {items?.length > 0 &&
                  <TouchableOpacity style={[tailwind`p-2 rounded-lg mt-6`, { backgroundColor: appColor.primaryColor }]} onPress={handleProcess}>
                    <Text style={[tailwind`text-center text-[15px]`, { fontFamily: "Lato-Bold", color: appColor.buttonColor }]}>Proceed</Text>
                </TouchableOpacity>
            }
      </View>
        {loginPermission &&
            <View style={[styles.showDetailsContainer, tailwind`px-4`]}>
                <View>
                    <View style={[tailwind`p-4 rounded-t-lg`, { backgroundColor: appColor.headerColor }]}>
                        <Text style={[tailwind`text-center text-[15px]`, { fontFamily: "Lato-Bold", color: appColor.primaryTextColor }]}>You are not currently logged in</Text>
                        <Text style={[tailwind`text-center text-[14px] mt-1`, { fontFamily: "Lato-Regular", color: appColor.primaryTextColor }]}>To make the most of your experience and effortlessly keep track of your laundry items, please log in</Text>
                    </View>
                    <View style={[tailwind`pt-2 rounded-b-lg flex-row`, { backgroundColor: appColor.headerColor }]}>
                        <TouchableOpacity style={[tailwind`flex-1 border-t-[1px] p-3`, {borderColor: appColor.primaryTextColor}]} onPress={() => setLoginPermission(false)}>
                            <Text style={[tailwind`text-center text-[15px]`, { fontFamily: "Lato-Bold", color: appColor.primaryTextColor }]}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[tailwind`flex-1 border-t-[1px] border-l-[1px] p-3`, { borderColor: appColor.primaryTextColor }]} onPress={handleContinueLogin}>
                            <Text style={[tailwind`text-center text-[15px]`, { fontFamily: "Lato-Bold", color: appColor.primaryColor }]}>Continue</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        }
    </View>
  )
}

export default AllLaundryItemsComponent

const styles = StyleSheet.create({
    showDetailsContainer: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingContainer: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: appColor.headerColor
    },
})