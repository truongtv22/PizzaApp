import React from "react"
import { Text } from "@ui-kitten/components"
import { TouchableOpacity, View } from "react-native"
import { tw } from "react-native-tailwindcss"
import appTheme from "app/theme/appTheme"
import makeStyles from "app/utils/makeStyles"
import { withList } from "./withList"

const useStyles = makeStyles({
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
})

function ServiceItem({ title, description }) {
  const styles = useStyles()
  return (
    <TouchableOpacity
      style={[
        styles.shadow,
        {
          backgroundColor: "white",
          flexDirection: "row",
          paddingHorizontal: 15,
          paddingVertical: 20,
          marginBottom: 10,
          marginLeft: 10,
          marginRight: 10,
          borderRadius: 10,
          alignItems: "center",
        },
      ]}
    >
      <View
        style={{
          width: 60,
          height: 60,
          borderRadius: 10,
          backgroundColor: appTheme["color-primary-transparent-100"],
        }}
      />
      <View style={{ padding: 10 }}>
        <Text style={[tw.fontBold]}>{title}</Text>
        <Text style={[tw.textSm, { color: "gray" }]}>{description}</Text>
      </View>
    </TouchableOpacity>
  )
}

function Service(props) {
  const ServiceList = withList(ServiceItem, DATA, "Dịch vụ mới")
  return <ServiceList />
}
export default Service

const DATA = [
  { id: 0, title: "Cổng chăm sóc khách hàng 24/07", description: "Nhanh - Tiện - Dễ dàng" },
  {
    id: 1,
    title: "Đặt lịch nhanh - Xác nhận lịch tự động",
    description: "Xe ngay lịch khám, giờ khám ở bất cứ đâu",
  },
]
