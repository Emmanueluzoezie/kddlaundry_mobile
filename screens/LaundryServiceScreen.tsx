import { FlatList, Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import LaundryServiceHeader from '../components/laundry_service/LaundryServiceHeader'
import tailwind from 'twrnc'
import {  selectedService, selectShowAllLaundryItems, selectShowItemCategories, setSelectedService, setShowAllLaundryItems, setShowItemCategories } from '../slice/ServiceSlice'
import { useDispatch, useSelector } from 'react-redux'
import AllLaundryItemsComponent from '../components/laundry_service/AllLaundryItemsComponent'
import { ADD_LAUNDRY_SERVICE } from '../graphql/mutations'
import { GET_ALL_ITEMS_BY_ORDER_ID } from '../graphql/queries'
import { useMutation, useQuery } from '@apollo/client'
import AsyncStorage from '@react-native-async-storage/async-storage'
import uuid from "react-native-uuid";
import { appColor } from '../components/AppColor'
import { ActivityIndicator } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import CategoriesList from '../components/laundry_service/CategoriesList'
import { serviceType, serviceWears } from '../utilities/LaundryItems'
import { useNavigation } from '@react-navigation/native'
import { selectShowCheckoutSession } from '../slice/AppSlice'
import CheckoutParentComponent from '../components/checkout/CheckoutParentComponent'

const LaundryServiceScreen = () => {
  const [stateLoading, setStateLoading] = useState(false)
  const [forceRerender, setForceRerender] = useState(false);
  const showCheckoutScreen = useSelector(selectShowCheckoutSession)
  const showItemList =  useSelector(selectShowAllLaundryItems)
  const [quantity, setQuantity] = useState(1)
  const [amount, setAmount] = useState(0)
  const [orderNumber, setOrderNumber] = useState("")
  const [showError, setShowError] = useState(false)
  const [serviceData, setServiceData] = useState<LaundryItemType[]>([])
  const [loadingState, setLoadingState] = useState(false)
  const getShowCategories = useSelector(selectShowItemCategories)
  const getClickedServiceItem = useSelector(selectedService)
  const [showServiceType, setShowServiceType] = useState(false)
  const [typeOfService, setTypeOfService] = useState({
    title: "Regular",
    day: 3
  })
  const dispatch = useDispatch()

  const [addLaundryItem] = useMutation(ADD_LAUNDRY_SERVICE, {
    refetchQueries: [GET_ALL_ITEMS_BY_ORDER_ID, "getServicesByOrderId"]
  })


  const { data, loading, error, refetch } = useQuery(GET_ALL_ITEMS_BY_ORDER_ID, {
    variables: {
      order_number: orderNumber
    }
  })

  useEffect(() => {
    if (data) {
      setServiceData(data.getServicesByOrderNumber)
    }
  }, [data])

  const handleShowCategories = () => {
    Keyboard.dismiss()
    dispatch(setShowItemCategories(true))
  }

  function generateRandomId(length: any) {
    const characters = '0123456789';
    let randomId = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomId += characters.charAt(randomIndex);
    }

    return randomId;
  }

  const handleShowTypeOfService = () => {
    Keyboard.dismiss()
    setShowServiceType(true)
  }

  const handleSelectedTypeOfService = (item: any) => {
    setShowServiceType(false)
    setTypeOfService({
      title: item.title,
      day: item.day
    })
  }

  useEffect(() => {
    if (typeOfService.title.toLowerCase() === "Express".toLowerCase()) {
      setAmount(getClickedServiceItem.amount / 2 + getClickedServiceItem.amount)
    } else {
      setAmount(getClickedServiceItem.amount)
    }
  }, [getClickedServiceItem.amount, typeOfService.title])

  useEffect(() => {
    AsyncStorage.getItem('newItemId')
      .then((value) => {
        if (value !== null) {
          setOrderNumber(value)
        }
         else {
          const newId = generateRandomId(12)
          AsyncStorage.setItem('newItemId', newId)
        }
      })
  }, [orderNumber])

  const handleBack = () => {
    dispatch(setShowAllLaundryItems(true))
  }

  const handleCloseKeyboard = () => {
    if (Keyboard) {
      Keyboard.dismiss()
    }
  }

  const handleAddLaundry = async () => {
    setLoadingState(true)
    try {
      await addLaundryItem({
        variables: {
          service_state: getClickedServiceItem.category,
          is_completed: false,
          paid: false,
          created_at: new Date(),
          type_of_service: typeOfService.title,
          total_amount: amount * Number(quantity),
          name: getClickedServiceItem.name,
          quantity: Number(quantity),
          order_number: orderNumber,
          amount: amount
        }
      })

      dispatch(setSelectedService({
        name: "",
        amount: 0,
        category: ""
      }));
      setQuantity(1);
      dispatch(setShowAllLaundryItems(true));
    }
    catch (error) {
      setShowError(true)
    } finally {
      setLoadingState(false)
    }
  }

  useEffect(() => {
    if (!showCheckoutScreen){
      AsyncStorage.getItem('newItemId')
      .then((value) => {
        if (value !== null) {
          setOrderNumber(value)
        }})
        refetch()
    }
  }, [showCheckoutScreen, refetch])

  const handleReload = () => {
    // Toggle the state to force a component rerender
    setStateLoading(true)
    setForceRerender((prev) => !prev);

    setTimeout(() => {
      setStateLoading(false)
    }, 4000)
  };

  useEffect(() => {
    if (forceRerender) {
      refetch();
    }
  }, [forceRerender, refetch]);

 
  return (
    <View style={[tailwind`flex-1`]}>
      {loading || stateLoading &&
        <View style={[tailwind`opacity-90 z-40`, styles.loadingContainer]}>
          <ActivityIndicator size="large" color={appColor.primaryColor} />
        </View>
      }
      {error && !stateLoading &&
        (<View style={[styles.showDetailsContainer, tailwind`px-4 z-40`]}>
          <View style={[tailwind`p-3 rounded-md`, { backgroundColor: appColor.headerColor }]}>
            <Text style={[tailwind`text-center text-[16px]`, { fontFamily: "Lato-Bold", color: appColor.primaryTextColor }]}>Oops! an error occur, please check your internet connection.</Text>
            <View style={tailwind`flex-row items-center justify-center mt-[30px]`}>
              <TouchableOpacity onPress={handleReload} style={[tailwind`px-6 py-2 rounded-md`, { backgroundColor: appColor.primaryColor }]}>
                <Text style={[tailwind`text-center text-[16px]`, { fontFamily: "Lato-Bold", color: "white" }]}>Reload</Text>
              </TouchableOpacity>
            </View>
          </View>

        </View>)
      }
      {showError && !stateLoading &&
        (<View style={[styles.showDetailsContainer, tailwind`px-4 z-40`]}>
          <View style={[tailwind`p-3 rounded-md`, { backgroundColor: appColor.headerColor }]}>
            <Text style={[tailwind`text-center text-[16px]`, { fontFamily: "Lato-Bold", color: appColor.primaryTextColor }]}>Oops! an error occur, please check your internet connection.</Text>
            <View style={tailwind`flex-row items-center justify-center mt-[30px]`}>
              <TouchableOpacity onPress={handleReload} style={[tailwind`px-6 py-2 rounded-md`, { backgroundColor: appColor.primaryColor }]}>
                <Text style={[tailwind`text-center text-[16px]`, { fontFamily: "Lato-Bold", color: "white" }]}>Reload</Text>
              </TouchableOpacity>
            </View>
          </View>

        </View>)
      }
      {showItemList?
        <View style={[tailwind`flex-1`]}>
          {showCheckoutScreen? 
            <CheckoutParentComponent items={serviceData} />
            :
            <AllLaundryItemsComponent items={serviceData} />
          }
        </View>
        :
        <View style={[tailwind` flex-1`]}>
          <LaundryServiceHeader title='Add Laundry Items' onPress={handleBack} />
          <TouchableOpacity activeOpacity={1} style={[tailwind`mt-4 flex-1 px-4`]} onPress={handleCloseKeyboard}>
            <View style={[tailwind`relative flex-1`]}>
              <View>
                <Text style={[tailwind`text-[13px] pl-2`, { fontFamily: "Lato-Bold", color: appColor.primaryTextColor }]}>Laundry Service Type</Text>
                {showServiceType ?
                  <View style={[tailwind`z-40 w-full p-2 mb-1 border-[1px] rounded-md`, { backgroundColor: appColor.cardColor, borderColor: appColor.cardColor }]}>
                    <FlatList
                      data={serviceType}
                      keyExtractor={(item) => item.title.toString()}
                      renderItem={({ item, index }) => (
                        <TouchableOpacity onPress={() => handleSelectedTypeOfService(item)} style={[
                          tailwind`p-1`,
                          index === serviceType.length - 1 ? tailwind`border-t-[1px]` : null, { borderColor: appColor.primaryTextColor }
                        ]}>
                          <Text style={[tailwind`text-[15px]`, { fontFamily: "Lato-Bold", color: appColor.primaryTextColor }]}>{item.title} service</Text>
                        </TouchableOpacity>
                      )} />
                  </View>
                  :
                  <TouchableOpacity onPress={handleShowTypeOfService} style={[tailwind`p-2 my-1 rounded-md flex-row items-center`, { backgroundColor: appColor.cardColor }]}>
                    <Text style={[tailwind`text-[15px] flex-1`, { fontFamily: "Lato-Bold", color: appColor.primaryTextColor }]}>{typeOfService.title} service</Text>
                    <AntDesign name="caretdown" size={14} color={appColor.primaryTextColor} />
                  </TouchableOpacity>
                }
              </View>
              <View style={[tailwind`mt-2`]}>
                <Text style={[tailwind`text-[13px] pl-2`, { fontFamily: "Lato-Bold", color: appColor.primaryTextColor }]}>Laundry Service items</Text>
                {getShowCategories ?
                  <View style={[tailwind`mb-36`]}>
                    <CategoriesList data={serviceWears} type={typeOfService.title} />
                  </View>
                  :
                  <TouchableOpacity style={[tailwind` p-2 rounded-md my-1 flex-row items-center`, { backgroundColor: appColor.headerColor }]} onPress={handleShowCategories}>
                    <Text style={[tailwind`text-[15px] flex-1`, { fontFamily: "Lato-Bold", color: appColor.primaryTextColor }]}>{getClickedServiceItem.name === "" ? "select service" : getClickedServiceItem.name}</Text>
                    <AntDesign name="caretdown" size={14} color={appColor.primaryTextColor} />
                  </TouchableOpacity>
                }
              </View>
              <View style={[tailwind`my-2`]}>
                <Text style={[tailwind`text-[13px] pl-2`, { fontFamily: "Lato-Bold", color: appColor.primaryTextColor }]}>Quantity</Text>
                <TextInput
                  style={[
                    tailwind`border-2 rounded-md w-[100px] p-1 mt-[3px]`,
                    { borderColor: appColor.cardColor, color: 'black', backgroundColor: 'white' },
                  ]}
                  keyboardType="numeric"
                  onChange={(event) => setQuantity(Number(event.nativeEvent.text))}
                  placeholder='1'
                  onFocus={() => setShowItemCategories(false)}
                />
              </View>
              <View style={[tailwind`my-2`]}>
                <Text style={[tailwind`text-[13px] pl-2`, { fontFamily: "Lato-Bold", color: appColor.primaryTextColor }]}>Amount</Text>
                <View style={[tailwind`border-2 rounded-md w-[100px] p-1 mt-[3px]`,
                { borderColor: appColor.cardColor, backgroundColor: 'white' }]}>
                  <Text style={[tailwind``, { color: 'black' }]}>{amount}</Text>
                </View>
              </View>
              {getClickedServiceItem.name !== "" && getClickedServiceItem.amount !== 0 &&
                <TouchableOpacity onPress={handleAddLaundry} style={[tailwind`p-2 rounded-lg mt-14`, { backgroundColor: appColor.primaryColor }]}>
                  <Text style={[tailwind`text-center text-[15px]`, { fontFamily: "Lato-Bold", color: appColor.buttonColor }]}>Add to Laundry List</Text>
                </TouchableOpacity>
              }
            </View>
          </TouchableOpacity>
          {loadingState &&
            <View style={[tailwind`opacity-90`, styles.loadingContainer]}>
              <ActivityIndicator size="large" color={appColor.primaryColor} />
            </View>
          }
        </View>
      }
    </View>
  )
}

export default LaundryServiceScreen

const styles = StyleSheet.create({
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
  showDetailsContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#fff"
  },
})