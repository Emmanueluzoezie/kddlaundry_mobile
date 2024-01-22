import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import tailwind from 'twrnc'
import { useDispatch, useSelector } from 'react-redux'
import { useMutation } from '@apollo/client'
import { useNavigation } from '@react-navigation/native'
import { selectUserId } from '../../slice/UserSlice'
import { ADD_TRANSACTIONS, UPDATE_PAID_LAUNDRY_SERVICE } from '../../graphql/mutations'
import { appColor } from '../AppColor'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { setShowCheckoutSession } from '../../slice/AppSlice'

const CheckoutChildComponent = ({serviceDetails}: any) => {
    const [isCompleted, setIsCompleted] = useState(false)
    const userId = useSelector(selectUserId)
    const navigation = useNavigation()
    const dispatch = useDispatch()

    const [addTransaction] = useMutation(ADD_TRANSACTIONS)
    const [updateService] = useMutation(UPDATE_PAID_LAUNDRY_SERVICE)

    const totalAmount = serviceDetails?.reduce((total: number, item: LaundryItemType) => total + item.total_amount, 0)

    function generateRandomId(length: any) {
        const characters = '0123456789';
        let randomId = '';

        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            randomId += characters.charAt(randomIndex);
        }

        return randomId;
    }

    const handleCompleteTransaction = async () => {
        try {
            // Add transaction
            await addTransaction({
                variables: {
                    amount: totalAmount,
                    created_at: new Date(),
                    currency: "NGN",
                    order_number: serviceDetails[0].order_number,
                    status: "success",
                    title: "Laundry items payment",
                    type: "card",
                    user_id: userId,
                },
            });

            // Update services
            await Promise.all(
                serviceDetails.map(async (item: any) => {
                    await updateService({
                        variables: {
                            id: item.id,
                            paid: true,
                        },
                    });
                })
            );

            // Dispatch actions and set states
            dispatch(setShowCheckoutSession(false));
            const newId = generateRandomId(12)
            await AsyncStorage.setItem('newItemId', newId);
            setIsCompleted(true);
        } catch (err) {
            console.error(err);
        }
    };


  return (
    <View style={tailwind`flex-1`}>
        {isCompleted?
            <View style={tailwind`flex-1 pt-10 px-4`}>
                  <Text style={[tailwind`text-center text-[18px]`, { fontFamily: "Lato-Bold"}]}>Payment Successfully</Text>
                  <TouchableOpacity style={[tailwind`p-2 rounded-lg mt-6`, { backgroundColor: appColor.primaryColor }]} onPress={() => navigation.navigate("home")}>
                    <Text style={[tailwind`text-center text-[15px]`, { fontFamily: "Lato-Bold", color: appColor.buttonColor }]}>Go home</Text>
                </TouchableOpacity>
            </View>
            :
            <View style={tailwind`flex-1 pt-10 px-4`}>
                <Text>CheckoutChildComponent</Text>
                <TouchableOpacity style={[tailwind`p-2 rounded-lg mt-6`, { backgroundColor: appColor.primaryColor }]} onPress={handleCompleteTransaction}>
                    <Text style={[tailwind`text-center text-[15px]`, { fontFamily: "Lato-Bold", color: appColor.buttonColor }]}>Proceed</Text>
                </TouchableOpacity>
            </View>
        }
    </View>
  )
}

export default CheckoutChildComponent

const styles = StyleSheet.create({})