import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import tailwind from 'twrnc';
import { appColor } from '../AppColor';
import { useDispatch } from 'react-redux';
import { setLaundryCompletedDetail, setShowCompletedDetail } from '../../slice/ServiceSlice';

type Props = {
    item: LaundryItemType
}

const SingleCompletedOrder = ({ item }: Props) => {
    const [getDateGiven, setDateGiven] = useState("")
    const [pickupDate, setPickupDate] = useState<Date | null | string>(null);
    const dispatch = useDispatch()

    const handleShowItemItems = () => {
        dispatch(setLaundryCompletedDetail({
            amount: item.amount,
            completed_date: item.completed_date,
            created_at: item.created_at,
            id: item.id,
            is_completed: item.is_completed,
            name: item.name,
            order_number: item.order_number,
            paid: item.paid,
            quantity: item.quantity,
            service_state: item.service_state,
            total_amount: item.total_amount,
            type_of_service: item.type_of_service,
            current_state: item.current_state,
            delivered: item.delivered,
            company_collected: item.company_collected
        }))
        dispatch(setShowCompletedDetail(true))

    }

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

        const createdDate = new Date(item.created_at);

        if (isToday(createdDate)) {
            setDateGiven('Today');
        } else if (isNDaysAgo(createdDate, 1)) {
            setDateGiven('Yesterday');
        } else {
            setDateGiven(createdDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }));
        }
    }, [item.created_at]);

    useEffect(() => {
        const createdDate = new Date(item.created_at);
        const next3DaysDate = new Date(createdDate);

        if (item.type_of_service === "Regular") {
            setPickupDate("Tomorrow")
        } else {
            next3DaysDate.setDate(createdDate.getDate() + 3);
            setPickupDate(next3DaysDate)
        }
    }, [item.created_at]);



    return (
        <TouchableOpacity onPress={handleShowItemItems} style={[tailwind`flex-row p-2 my-1 mb-2 rounded-md relative`, { backgroundColor: appColor.cardColor }]}>
            <View style={[tailwind`flex-1`, { backgroundColor: appColor.cardColor }]}>
                <Text style={[tailwind`text-[16px]`, { fontFamily: "Lato-Bold", color: appColor.primaryColor }]}>{item.type_of_service} Service</Text>
                <Text style={[tailwind`text-[14px]`, { fontFamily: "Lato-Bold", color: appColor.primaryTextColor }]}>{item.name}</Text>
                <View style={[tailwind`flex-row items-center my-[1px]`]}>
                    <Text style={[tailwind``, { fontFamily: "Lato-Bold", color: appColor.primaryTextColor }]}>Track Number - </Text>
                    <Text style={[tailwind`flex-1`, { fontFamily: "Lato-Bold", color: appColor.primaryColor }]}>#{item.order_number}</Text>
                </View>
                <View style={[tailwind`flex-row items-center my-[1px]`]}>
                    <Text style={[tailwind`w-[120px]`, { fontFamily: "Lato-Bold", color: appColor.primaryTextColor }]}>Pickup date: </Text>
                    <Text style={[tailwind`flex-1`, { fontFamily: "Lato-Bold", color: appColor.primaryTextColor }]}>{getDateGiven}</Text>
                </View>
                <View style={[tailwind`flex-row items-center my-[1px]`]}>
                    <Text style={[tailwind`w-[120px]`, { fontFamily: "Lato-Bold", color: appColor.primaryTextColor }]}>Status: </Text>
                    <Text style={[tailwind` capitalize p-[2px] px-2 text-[12px]`, { fontFamily: "Lato-Bold", backgroundColor: appColor.successColor, color: appColor.headerColor }]}>{item.current_state}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default SingleCompletedOrder

const styles = StyleSheet.create({})