import { FlatList, Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import tailwind from 'twrnc'
import { appColor } from '../AppColor'
import { AntDesign, Ionicons } from '@expo/vector-icons'
import { locationState } from '../../utilities/LaundryItems'
import { useDispatch, useSelector } from 'react-redux'
import { selectUserId } from '../../slice/UserSlice'
import { useMutation, useQuery } from '@apollo/client'
import { GET_LOCATION_BY_USER_ID } from '../../graphql/queries'
import LoadingIndicator from '../loadingIndicator'
import { setIsNewLocationScreen } from '../../slice/AppSlice'
import { ADD_LOCATION } from '../../graphql/mutations'

const AddNewLocation = () => {
    const [address, setAddress] = useState("")
    const [address2, setAddress2] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("Abuja")
    const [postalCode, setPostalCode] = useState("")
    const [landmark, setLandmark] = useState("")
    const [showListOfState, setShowListOfState] = useState(false)
    const dispatch = useDispatch()

    const [addLocation] = useMutation(ADD_LOCATION)

    const getUserId = useSelector(selectUserId)
    const { data, loading, error } = useQuery(GET_LOCATION_BY_USER_ID, {
        variables: {
            user_id: getUserId
        }
    }) 

    const handleShowListOfState = () => {
        Keyboard.dismiss()
        setShowListOfState(true)
    }

    const handleSelectedNameOfState = (item: any) => {
        setShowListOfState(false)
        setState(item)
    }

    const handleAddLocation = async () => {
        try {
            await addLocation({
                variables: {
                    city: city,
                    state: state,
                    user_id: getUserId,
                    postal_code: postalCode,
                    address: address,
                    address_2: address2,
                    landmark: landmark,
                    created_at: new Date()
                }
            })
            setAddress("")
            setAddress2("")
            setCity("")
            setState("")
            setPostalCode("")
            dispatch(setIsNewLocationScreen(false))
        }
        catch (error) {
            console.log(error)
        }
    }


  return (
    <View style={tailwind`flex-1`}>
          {loading &&
              <View style={[tailwind`opacity-100 z-40`, styles.loadingContainer]}>
                  <LoadingIndicator borderColor={appColor.primaryColor} width={40} height={40} borderWidth={4} />
              </View>
          }
          <View style={[tailwind`pt-[40px] pb-[10px] px-[10px]`, { backgroundColor: appColor.headerColor }]}>
              <Text style={[tailwind`text-center text-[18px]`, { fontFamily: "Lato-Bold" }]}>Add Location</Text>
              <Ionicons name="arrow-back-outline" size={24} color="black" style={[tailwind`absolute bottom-2 left-2`]} onPress={() => dispatch(setIsNewLocationScreen(false))} />
          </View>
          <KeyboardAvoidingView 
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              style={{ flex: 1 }}>
              <FlatList
                  data={['dummyItem']}
                  keyExtractor={() => 'dummyKey'}
                  renderItem={() => (
                  <TouchableOpacity style={tailwind`px-4 flex-1`} onPress={() => Keyboard.dismiss()} activeOpacity={1}>
                      <View style={tailwind`py-4`}>
                            <Text style={[tailwind`text-[14px] pl-2 text-center`, { fontFamily: "Lato-Bold", color: appColor.primaryTextColor }]}>Please provide an accurate address to ensure seamless delivery of your laundry items</Text>
                      </View>

                      <View style={[tailwind`my-2`]}>
                          <Text style={[tailwind`text-[13px] pl-2`, { fontFamily: "Lato-Bold", color: appColor.primaryTextColor }]}>Address 1</Text>
                          <TextInput
                              style={[
                                  tailwind`border-2 rounded-md w-[100px] p-2 w-full mt-[3px]`,
                                  { borderColor: appColor.cardColor, color: 'black', backgroundColor: 'white' },
                              ]}
                              onChange={(event) => setAddress(event.nativeEvent.text)}
                              placeholder='address'
                          //   onFocus={() => setShowItemCategories(false)}
                          />
                      </View>

                      <View style={[tailwind`my-2`]}>
                          <Text style={[tailwind`text-[13px] pl-2`, { fontFamily: "Lato-Bold", color: appColor.primaryTextColor }]}>Address 2  (Optional)</Text>
                          <TextInput
                              style={[
                                  tailwind`border-2 rounded-md w-[100px] p-2  w-full  mt-[3px]`,
                                  { borderColor: appColor.cardColor, color: 'black', backgroundColor: 'white' },
                              ]}
                              onChange={(event) => setAddress2(event.nativeEvent.text)}
                              placeholder='address'
                          //   onFocus={() => setShowItemCategories(false)}
                          />
                      </View>

                      <View style={[tailwind`my-2`]}>
                          <Text style={[tailwind`text-[13px] pl-2`, { fontFamily: "Lato-Bold", color: appColor.primaryTextColor }]}>City</Text>
                          <TextInput
                              style={[
                                  tailwind`border-2 rounded-md w-[100px] p-2  w-full  mt-[3px]`,
                                  { borderColor: appColor.cardColor, color: 'black', backgroundColor: 'white' },
                              ]}
                              onChange={(event) => setCity(event.nativeEvent.text)}
                              placeholder='city'
                          //   onFocus={() => setShowItemCategories(false)}
                          />
                      </View>

                      <View style={[tailwind`my-2`]}>
                          <Text style={[tailwind`text-[13px] pl-2`, { fontFamily: "Lato-Bold", color: appColor.primaryTextColor }]}>State</Text>
                          {showListOfState ?
                              <View style={[tailwind`z-40 w-full py-2 mb-1 border-[1px] rounded-md`, { backgroundColor: appColor.cardColor, borderColor: appColor.headerColor }]}>
                                  <FlatList
                                      data={locationState}
                                      keyExtractor={(item) => item.id.toString()}
                                      renderItem={({ item, index }) => (
                                          <TouchableOpacity onPress={() => handleSelectedNameOfState(item.name)} style={[
                                              tailwind`p-1 border-t-[1px]`,
                                              index === state.length - 1 ? tailwind`border-t-[1px]` : null, { borderColor: appColor.primaryTextColor }
                                          ]}>
                                              <Text style={[tailwind`text-[15px]`, { fontFamily: "Lato-Bold", color: appColor.primaryTextColor }]}>{item.name}</Text>
                                          </TouchableOpacity>
                                      )} />
                              </View>
                              :
                              <TouchableOpacity onPress={handleShowListOfState} style={[tailwind`p-2 my-1 rounded-md  flex-row items-center`, { backgroundColor: appColor.cardColor }]}>
                                  <Text style={[tailwind`text-[15px] flex-1`, { fontFamily: "Lato-Bold", color: appColor.primaryTextColor }]}>{state}</Text>
                                  <AntDesign name="caretdown" size={14} color={appColor.primaryTextColor} />
                              </TouchableOpacity>
                          }
                      </View>

                      <View style={[tailwind`my-2`]}>
                          <Text style={[tailwind`text-[13px] pl-2`, { fontFamily: "Lato-Bold", color: appColor.primaryTextColor }]}>Postal code</Text>
                          <TextInput
                              style={[
                                  tailwind`border-2 rounded-md w-[100px] p-2  w-full  mt-[3px]`,
                                  { borderColor: appColor.cardColor, color: 'black', backgroundColor: 'white' },
                              ]}
                              onChange={(event) => setPostalCode(event.nativeEvent.text)}
                              placeholder='postal code'
                              keyboardType='numeric'
                          //   onFocus={() => setShowItemCategories(false)}
                          />
                      </View>
                      <View style={[tailwind`my-2`]}>
                          <Text style={[tailwind`text-[13px] pl-2`, { fontFamily: "Lato-Bold", color: appColor.primaryTextColor }]}>Nearby landmark (optional)</Text>
                          <TextInput
                              style={[
                                  tailwind`border-2 rounded-md w-[100px] p-2  w-full  mt-[3px]`,
                                  { borderColor: appColor.cardColor, color: 'black', backgroundColor: 'white' },
                              ]}
                                  onChange={(event) => setLandmark(event.nativeEvent.text)}
                                  placeholder='Nearby landmark'
                          //   onFocus={() => setShowItemCategories(false)}
                          />
                      </View>
                      {address !== "" && state !== "" && city !== "" &&
                          <TouchableOpacity style={[tailwind`p-2 rounded-lg mt-6`, { backgroundColor: appColor.primaryColor }]} onPress={handleAddLocation}>
                              <Text style={[tailwind`text-center text-[15px]`, { fontFamily: "Lato-Bold", color: appColor.buttonColor }]}>Add Location</Text>
                          </TouchableOpacity>
                      }
                  </TouchableOpacity>
                  )}
                />
          </KeyboardAvoidingView>
    </View>
  )
}

export default AddNewLocation

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
})