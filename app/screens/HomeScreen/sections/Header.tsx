import React from "react"
import { tw } from "react-native-tailwindcss"
import { Text } from "@ui-kitten/components"
import { Ionicons } from "@expo/vector-icons"
import { View, TouchableOpacity } from "react-native"

import useSafeAreaStyle from "app/components/SafeAreaView/useSafeAreaStyle"

export default function MainHeader() {
  const safeStyle = useSafeAreaStyle(["top"], tw.pX4)

  return (
    <View style={[safeStyle, tw.flexRow]}>
      <View style={tw.flex1}>
        <Text appearance="alternative" category="h5">
          tClinic
        </Text>
        <Text appearance="alternative">App đặt lịch phòng khám</Text>
      </View>
      <TouchableOpacity
        style={[tw.w10, tw.h10, tw.bgWhite, tw.roundedFull, tw.itemsCenter, tw.justifyCenter]}
        onPress={() => {}}
      >
        <Ionicons name="search" size={18} />
      </TouchableOpacity>
    </View>
  )
}
