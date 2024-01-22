import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { appColor } from './AppColor';
import tailwind from 'twrnc';

type ScreenHeaderProps = {
    screenName: string;
};

const ScreenHeader = ({ screenName }: ScreenHeaderProps) => {

  return (
    <View style={[tailwind`pt-[40px] pb-[10px] px-[10px]`, {backgroundColor: appColor.headerColor}]}>
          <Text style={[tailwind`text-center text-[18px]`, { fontFamily: "Lato-Bold" }]}>{screenName}</Text>
    </View>
  )
}

export default ScreenHeader

const styles = StyleSheet.create({})