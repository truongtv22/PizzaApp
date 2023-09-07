import React from "react"
import { tw } from "react-native-tailwindcss"
import { Text } from "@ui-kitten/components"
import { View, TouchableOpacity } from "react-native"
import { NavigationProp, useNavigation } from "@react-navigation/native"

import { Column, Grid } from "app/components"
import { AppRoute } from "app/navigators/appRoute"
import { AppStackParamList } from "app/navigators"

import LichHenIcon from "app/assets/icons/lich-hen.svg"
import DangKyLichIcon from "app/assets/icons/dang-ky-lich.svg"
import TuVanIcon from "app/assets/icons/tu-van.svg"
import HoSoIcon from "app/assets/icons/ho-so.svg"
import BenhNhanIcon from "app/assets/icons/benh-nhan.svg"
import HoiDapIcon from "app/assets/icons/hoi-dap.svg"

function MainMenuItem({ title, icon }) {
  const navigation = useNavigation<NavigationProp<AppStackParamList>>()

  return (
    <TouchableOpacity onPress={() => navigation.navigate(AppRoute.LATEST_NEWS)}>
      <Column space={1} style={[tw.flex1, tw.itemsCenter]}>
        {icon}
        <Text style={tw.textCenter}>{title}</Text>
      </Column>
    </TouchableOpacity>
  )
}

export default function MainMenu() {
  return (
    <View style={[tw.bgWhite, tw.p4, tw.mX4, tw.roundedLg, tw.shadowLg]}>
      <Grid columns={4} space={2}>
        <MainMenuItem title="Lịch hẹn" icon={<LichHenIcon />} />
        <MainMenuItem title="Đăng ký" icon={<DangKyLichIcon />} />
        <MainMenuItem title="Hồ sơ" icon={<HoSoIcon />} />
        <MainMenuItem title="Bệnh nhân" icon={<BenhNhanIcon />} />
        <MainMenuItem title="Tư vấn" icon={<TuVanIcon />} />
        <MainMenuItem title="Hỏi đáp" icon={<HoiDapIcon />} />
      </Grid>
    </View>
  )
}
