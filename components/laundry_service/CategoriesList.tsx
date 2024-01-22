import React from 'react';
import { FlatList, View, Text, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import tailwind from 'twrnc';
import { selectedService, setShowItemCategories, setSelectedService } from '../../slice/ServiceSlice';
import { appColor } from '../AppColor';

interface WearItem {
    name: string;
    amount: number;
    category: string;
}

interface CategoriesListProps {
    data: WearItem[];
    type: string
}

const CategoriesList: React.FC<CategoriesListProps> = ({ data, type }) => {
    const getSelectedService = useSelector(selectedService)
    const  dispatch = useDispatch()

    const handleSelectedService = (selectedName: string, selectedAmount: number, category: string) => {
        dispatch(setSelectedService({
            name: selectedName,
            amount: selectedAmount, 
            category: category
        }))
        dispatch(setShowItemCategories(false))
    }

    const renderItem = ({ item }: { item: WearItem }) => (
        <View key={item.category} style={[tailwind`p-2 rounded-md`, {backgroundColor: appColor.cardColor}]}>
            <Text style={[tailwind`text-[16px] pl-2 capitalize py-1`, { fontFamily: "Lato-Bold", color: appColor.primaryTextColor }]}>{item.category}</Text>
            {data
                .filter((wear) => wear.category === item.category)
                .map((wearItem) => (
                    <TouchableOpacity key={wearItem.name} onPress={() => handleSelectedService(wearItem.name, wearItem.amount, wearItem.category)} style={[tailwind`flex-row gap-4 my-[2px] px-2 rounded-md`, { backgroundColor: appColor.listColor }]}>
                        <Text style={[tailwind`text-[16px] py-1`, { fontFamily: "Lato-Regular", color: appColor.primaryTextColor }]}>
                            {wearItem.name}
                        </Text>
                        <Text style={[tailwind`text-[16px] py-1`, { fontFamily: "Lato-Regular", color: appColor.primaryTextColor }]}>
                            -
                        </Text>
                        <Text style={[tailwind`text-[16px] py-1`, { fontFamily: "Lato-Regular", color: appColor.primaryTextColor }]}>
                            ₦ {wearItem.amount}
                        </Text>
                    </TouchableOpacity>
                ))}
        </View>
    );

    return (
        <FlatList
            data={data.reduce<WearItem[]>((acc, current) => {
                if (!acc.find((item) => item.category === current.category)) {
                    acc.push(current);
                }
                return acc;
            }, [])}
            keyExtractor={(item) => item.category}
            renderItem={renderItem}
        />
    );
};

export default CategoriesList;