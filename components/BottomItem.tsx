import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import tailwind from 'twrnc'
import { useSelector } from 'react-redux'
import { useRoute } from '@react-navigation/native'
import { appColor } from './AppColor'
import { selectCurrentScreen } from '../slice/AppSlice'

const BottomItem = ({ onPress, Icon, title, active, name, size }:any) => {
    // const appTheme = useSelector(selectAppTheme)
    const currentScreen = useSelector(selectCurrentScreen)


    const color = (currentScreen === active) ? appColor.primaryColor : appColor.primaryTextColor 
    const iconColor = (currentScreen === active) ? appColor.primaryColor : appColor.iconColor 

    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={[tailwind`justify-center items-center py-1`,
            ]}>
                <Icon name={name} size={size} color={iconColor} />
                <Text style={[tailwind`text-[13px] mt-1`,
                    { color: color, fontFamily: 'Lato-Bold' }
                ]}>{title}</Text>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default BottomItem