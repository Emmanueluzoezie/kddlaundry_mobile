import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import tailwind from 'twrnc'
import BottomItem from './BottomItem'
import { Entypo, MaterialCommunityIcons, MaterialIcons, Octicons } from '@expo/vector-icons'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { setCurrentScreen } from '../slice/AppSlice'
import { appColor } from './AppColor'

const BottomButtonContainer = () => {
  const [loadingComponent, setLoadingComponent] = useState(false)
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const route = useRoute()

  const handleNavigation = (clickedItem: string) => {
    dispatch(setCurrentScreen(clickedItem));
    navigation.navigate(clickedItem, { previousScreen: route.name });
  };

  return (
    <View style={[tailwind`border-t-[2px] pt-2 pb-6 px-4 flex-row justify-between items-center`,
    { borderColor: appColor.headerColor }
    ]}>
      <View style={[tailwind`w-[75px]`]}>
        <BottomItem
          Icon={Entypo}
          name="home"
          onPress={() => handleNavigation("home")}
          title="Home"
          active="home"
          size={18}
        />
      </View>
      <View style={[tailwind`w-[75px]`]}>
        <BottomItem
          Icon={Octicons}
          name="checklist"
          onPress={() => handleNavigation("orders")}
          title="Orders"
          active="orders"
          size={18}
        />
      </View>
      {/* <View style={[tailwind`w-[75px]`]}>
        <BottomItem
          Icon={MaterialCommunityIcons}
          name="help-circle"
          onPress={() => handleNavigation("help")}
          title="Help"
          active="help"
          size={18}
        />
      </View> */}
      <View style={[tailwind`w-[75px]`]}>
        <BottomItem
          Icon={MaterialIcons}
          name="account-circle"
          onPress={() => handleNavigation("account")}
          title="Account"
          active="account"
          size={18}
        />
      </View>
      <View style={[tailwind`w-[75px]`]}>
        <BottomItem
          Icon={MaterialCommunityIcons}
          name="help-circle"
          onPress={() => handleNavigation("help")}
          title="Help"
          active="help"
          size={18}
        />
      </View>
    </View>
  )
}

export default BottomButtonContainer

const styles = StyleSheet.create({})