import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { appColor } from '../AppColor'
import tailwind from 'twrnc'
import { MaterialIcons } from '@expo/vector-icons'
import { useMutation } from '@apollo/client'
import { REMOVE_LAUNDRY_SERVICE, UPDATE_LAUNDRY_SERVICE } from '../../graphql/mutations'
import { GET_ALL_ITEMS_BY_ORDER_ID } from '../../graphql/queries'

const SingleLaundryItem = ({item}:any) => {
    const [deleteService] = useMutation(REMOVE_LAUNDRY_SERVICE, {
        refetchQueries: [GET_ALL_ITEMS_BY_ORDER_ID, "getServicesByOrderId"]
    })

    const [updateLaundryItem] = useMutation(UPDATE_LAUNDRY_SERVICE
    //     , {
    //     refetchQueries: [GET_ALL_ITEMS_BY_ORDER_ID, "getServicesByOrderId"]
    // }
    )

    const handleIncreaseQuantity = async() => {

        const totalAmount  = item.amount + item.total_amount
        try {
            await updateLaundryItem({
                variables: {
                    total_amount: totalAmount,
                    quantity: item.quantity + 1,
                    id: item.id,
                }
            })
        }
        catch (error) {
            return
        }
    }

    const handleDecreaseQuantity = async() => {
        const totalAmount = item.total_amount - item.amount  
        try {
            if (item.quantity <= 1){
                return
            }
            await updateLaundryItem({
                variables: {
                    total_amount: totalAmount,
                    quantity: item.quantity - 1,
                    id: item.id,
                }
            })
        }
        catch (error) {
            return
        }
    }

    const handleDelete = async() => {
        try {
            await deleteService({
                variables: {
                    id: item.id
                }
            }) 
        } catch (error) {
            return
        }
    }


    const formattedAmount = item.amount.toLocaleString();
    const formattedTotalAmount = item.total_amount.toLocaleString();


  return (
      <View style={[tailwind`flex-row p-2 rounded-md my-1 relative`, { backgroundColor: appColor.cardColor }]}>
          <View style={[tailwind`flex-1`, { backgroundColor: appColor.cardColor }]}>
              <View style={[tailwind`flex-row items-center my-1`]}>
                  <Text style={[tailwind`w-[120px]`, { fontFamily: "Lato-Bold", color: appColor.primaryTextColor }]}>Name: </Text>
                  <Text style={[tailwind`flex-1`, { fontFamily: "Lato-Bold", color: appColor.primaryTextColor }]}>{item.name}</Text>
              </View>
              <View style={[tailwind`flex-row items-center my-1`]}>
                  <Text style={[tailwind`w-[120px]`, { fontFamily: "Lato-Bold", color: appColor.primaryTextColor }]}>Amount: </Text>
                  <Text style={[tailwind`flex-1`, { fontFamily: "Lato-Bold", color: appColor.primaryTextColor }]}> ₦ {formattedAmount}</Text>
              </View>
              <View style={[tailwind`flex-row items-center my-1`]}>
                  <Text style={[tailwind`w-[120px]`, { fontFamily: "Lato-Bold", color: appColor.primaryTextColor }]}>Type of service: </Text>
                  <Text style={[tailwind`flex-1`, { fontFamily: "Lato-Bold", color: appColor.primaryTextColor }]}>{item.type_of_service}</Text>
              </View>
              <View style={[tailwind`flex-row items-center my-1`]}>
                  <View style={[tailwind`flex-0.6 flex-row items-center`]}>
                      <Text style={[tailwind`w-[120px]`, { fontFamily: "Lato-Bold", color: appColor.primaryTextColor }]}>Quantity: </Text>
                      <Text style={[tailwind`flex-1`, { fontFamily: "Lato-Bold", color: appColor.primaryTextColor }]}>{item.quantity}</Text>
                  </View>
                  <View style={[tailwind`flex-0.4 flex-row items-center justify-center`]}>
                      <TouchableOpacity style={[tailwind
                          `px-[4px] rounded-sm mx-2`, { backgroundColor: appColor.primaryColor }]} onPress={handleIncreaseQuantity}>
                          <MaterialIcons name="add" size={24} color="white" />
                      </TouchableOpacity>
                      <TouchableOpacity style={[tailwind
                          `px-[3px] border-2 rounded-sm mx-2`, { borderColor: appColor.primaryColor }]} onPress={handleDecreaseQuantity}>
                          <MaterialIcons name="remove" size={24} color={appColor.primaryColor} />
                      </TouchableOpacity>
                  </View>
              </View>
              <View style={[tailwind`flex-row items-center my-1`]}>
                  <Text style={[tailwind`w-[120px]`, { fontFamily: "Lato-Bold", color: appColor.primaryTextColor }]}>Total: </Text>
                  <Text style={[tailwind`flex-1`, { fontFamily: "Lato-Bold", color: appColor.primaryTextColor }]}> ₦{formattedTotalAmount}</Text>
              </View>
          </View>
          <MaterialIcons onPress={handleDelete} name="delete" size={24} color="#781f1f" style={[tailwind`absolute top-2 right-2`]} />
      </View>
  )
}

export default SingleLaundryItem

const styles = StyleSheet.create({})