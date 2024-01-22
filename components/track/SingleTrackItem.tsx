import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client'
import { UPDATE_COLLECTED_LAUNDRY_SERVICE } from '../../graphql/mutations'
import { GET_ALL_USER_ORDERS_BY_IS_COMPLETED } from '../../graphql/queries'
import tailwind from 'twrnc'
import { appColor } from '../AppColor'

const SingleTrackItem = ({item}: any) => {
    const [getDateGiven, setDateGiven] = useState("") 
    const [pickupDate, setPickupDate] = useState("");

    const [updateCollectedService] = useMutation(UPDATE_COLLECTED_LAUNDRY_SERVICE, {
        refetchQueries: [GET_ALL_USER_ORDERS_BY_IS_COMPLETED, "getAllUserServicesByUser_idAndIsCompleted"]
    })

    const handleCollectedItem = async () => {
        try {
            await updateCollectedService({
                variables: {
                    current_state: "collected",
                    delivered: true,
                    id: item?.id,
                    is_completed: true,
                    completed_date: new Date()
                }
            })
        }
        catch (error) {
            console.log(error)
        }
    }

    const formattedAmount = item?.amount.toLocaleString();
    const formattedTotalAmount = item?.total_amount.toLocaleString();

    useEffect(() => {

        const isToday = (date: Date) => {
            const today = new Date();
            return (
                date.getDate() === today.getDate() &&
                date.getMonth() === today.getMonth() &&
                date.getFullYear() === today.getFullYear()
            );
        };

        // Check for N days ago
        const isNDaysAgo = (date: Date, number: number) => {
            const today = new Date();
            const targetDate = new Date(today);
            targetDate.setDate(today.getDate() - number);

            return date >= targetDate && date < today;
        };

        const createdDate = new Date(item?.created_at);

        if (isToday(createdDate)) {
            setDateGiven('Today');
        } else if (isNDaysAgo(createdDate, 1)) {
            setDateGiven('Yesterday');
        } else {
            setDateGiven(createdDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }));
        }
    }, [item?.created_at]);

    useEffect(() => {
        const createdDate = new Date(item?.created_at);
        const next3DaysDate = new Date(createdDate);

        if (item?.type_of_service === "Express"){
            setPickupDate("Tomorrow")
        } else {
            next3DaysDate.setDate(createdDate.getDate() + 3);
            setPickupDate(next3DaysDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }))
        }
    }, [item?.created_at]);



    return (
        <View style={[tailwind`flex-row p-2 rounded-md my-1 relative`, { backgroundColor: appColor.cardColor }]}>
            <View style={[tailwind`flex-1`, { backgroundColor: appColor.cardColor }]}>
                <View style={[tailwind`flex-row items-center my-[1px]`]}>
                    <Text style={[tailwind`w-[120px]`, { fontFamily: "Lato-Bold", color: appColor.primaryTextColor }]}>Name: </Text>
                    <Text style={[tailwind`flex-1`, { fontFamily: "Lato-Bold", color: appColor.primaryTextColor }]}>{item?.name}</Text>
                </View>
                <View style={[tailwind`flex-row items-center my-[1px]`]}>
                    <Text style={[tailwind`w-[120px]`, { fontFamily: "Lato-Bold", color: appColor.primaryTextColor }]}>Date given: </Text>
                    <Text style={[tailwind`flex-1`, { fontFamily: "Lato-Bold", color: appColor.primaryTextColor }]}>{getDateGiven}</Text>
                </View>
                <View style={[tailwind`flex-row items-center my-[1px]`]}>
                    <Text style={[tailwind`w-[120px]`, { fontFamily: "Lato-Bold", color: appColor.primaryTextColor }]}>Quantity: </Text>
                    <Text style={[tailwind`flex-1`, { fontFamily: "Lato-Bold", color: appColor.primaryTextColor }]}>{item?.quantity}</Text>
                </View>
                {/* <View style={[tailwind`flex-row items-center my-[1px]`]}>
                    <Text style={[tailwind`w-[120px]`, { fontFamily: "Lato-Bold", color: appColor.primaryTextColor }]}>Amount: </Text>
                    <Text style={[tailwind`flex-1`, { fontFamily: "Lato-Bold", color: appColor.primaryTextColor }]}> ₦ {formattedAmount}</Text>
                </View> */}
                <View style={[tailwind`flex-row items-center my-[1px]`]}>
                    <Text style={[tailwind`w-[120px]`, { fontFamily: "Lato-Bold", color: appColor.primaryTextColor }]}>Type of service: </Text>
                    <Text style={[tailwind`flex-1`, { fontFamily: "Lato-Bold", color: appColor.primaryTextColor }]}>{item?.type_of_service}</Text>
                </View>
                {/* <View style={[tailwind`flex-row items-center my-[1px]`]}>
                    <Text style={[tailwind`w-[120px]`, { fontFamily: "Lato-Bold", color: appColor.primaryTextColor }]}>Total: </Text>
                    <Text style={[tailwind`flex-1`, { fontFamily: "Lato-Bold", color: appColor.primaryTextColor }]}> ₦{formattedTotalAmount}</Text>
                </View> */}
                <View style={[tailwind`flex-row items-center my-[1px]`]}>
                    <Text style={[tailwind`w-[120px]`, { fontFamily: "Lato-Bold", color: appColor.primaryTextColor }]}>Track Number: </Text>
                    <Text style={[tailwind`flex-1`, { fontFamily: "Lato-Bold", color: appColor.primaryColor }]}>#{item?.order_number}</Text>
                </View>
                <View style={[tailwind`flex-row items-center my-[1px]`]}>
                    <Text style={[tailwind`w-[120px]`, { fontFamily: "Lato-Bold", color: appColor.primaryTextColor }]}>Pickup date: </Text>
                    <Text style={[tailwind`flex-1`, { fontFamily: "Lato-Bold", color: appColor.primaryTextColor }]}>{pickupDate}</Text>
                </View>
                <View style={[tailwind`flex-row items-center my-[1px]`]}>
                    <Text style={[tailwind`w-[120px]`, { fontFamily: "Lato-Bold", color: appColor.primaryTextColor }]}>Status: </Text>
                    <Text style={[tailwind`flex-1 capitalize`, { fontFamily: "Lato-Bold", color: appColor.primaryColor }]}>{item?.current_state}</Text>
                </View>
                <TouchableOpacity style={[tailwind
                    ` rounded-sm  absolute rounded-md p-[4px] top-6 right-2 `, { backgroundColor: appColor.successColor }]} onPress={handleCollectedItem}>
                    <Text style={[tailwind` text-center px-[6px]`, { fontFamily: "Lato-Bold", color: appColor.headerColor }]}>Received</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default SingleTrackItem

const styles = StyleSheet.create({})