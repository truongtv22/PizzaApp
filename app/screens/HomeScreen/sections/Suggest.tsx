import React from "react"
import { Ionicons } from "@expo/vector-icons"
import { Text } from "@ui-kitten/components"
import { TouchableOpacity, View } from "react-native"
import { tw } from "react-native-tailwindcss"
import appTheme from "app/theme/appTheme"
import makeStyles from "app/utils/makeStyles"
import { withHorizontalList } from "./withHorizontalList"

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

function SuggestItem({ title }) {
  title = title || "title"
  const styles = useStyles()
  return (
    <TouchableOpacity
      style={[
        styles.shadow,
        {
          backgroundColor: "white",
          borderRadius: 10,
          width: 150,
          marginVertical: 10,
          marginLeft: 10,
        },
      ]}
    >
      <View
        style={{
          height: 160,
          width: "100%",
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          backgroundColor: appTheme["color-primary-transparent-100"],
        }}
      />

      <View style={{ padding: 10 }}>
        <Text style={{ height: 40 }} numberOfLines={2}>
          {title}
        </Text>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Ionicons name="gift-outline" color={appTheme["color-danger-500"]} />
          <Text style={[tw.textSm, { color: appTheme["color-danger-500"], marginLeft: 5 }]}>
            Nhận ưu đãi
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

function Suggest(props) {
  const SuggestList = withHorizontalList(SuggestItem, DATA, "Gợi ý cho bạn")
  return <SuggestList />
}
export default Suggest

const DATA = [
  { id: 0, title: "Đón bé bình an - Vượt cạn nhẹ nhàng" },
  { id: 1, title: "Để ung thư không còn là nỗi sợ vô hình" },
  { id: 2, title: "Tim mạch" },
  { id: 3, title: "Sức khỏe tổng quát" },
]
