import React from "react"
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

function ImportantNotifyItem({ title }) {
  title = title || "title"
  const styles = useStyles()
  return (
    <TouchableOpacity
      style={[
        styles.shadow,
        {
          backgroundColor: appTheme["color-primary-100"],
          borderRadius: 10,
          width: 200,
          marginVertical: 10,
          marginLeft: 10,
          padding: 10,
        },
      ]}
    >
      <View
        style={{
          backgroundColor: appTheme["color-primary-500"],
          alignSelf: "flex-start",
          paddingHorizontal: 8,
          paddingVertical: 4,
          borderRadius: 5,
          position: "absolute",
          top: -10,
          left: 10,
        }}
      >
        <Text style={[tw.textXs, tw.textWhite]}>TIN MỚI</Text>
      </View>

      <Text numberOfLines={3} style={{ color: appTheme["color-primary-500"], marginTop: 10 }}>
        {title}
      </Text>
    </TouchableOpacity>
  )
}

function ImportantNotify(props) {
  const ImportantNotifyList = withHorizontalList(
    ImportantNotifyItem,
    DATA,
    "Thông báo quan trọng",
  )
  return <ImportantNotifyList />
}
export default ImportantNotify

const DATA = [
  {
    id: 0,
    title:
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour",
  },
  {
    id: 1,
    title:
      'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form',
  },
  {
    id: 2,
    title:
      "The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
  },
  {
    id: 3,
    title:
      "The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English",
  },
]
