import React, { useEffect, useState } from "react"
import { tw } from "react-native-tailwindcss"
import { Text } from "@ui-kitten/components"
import { Image, TouchableOpacity } from "react-native"
import { useNavigation, NavigationProp } from "@react-navigation/native"

import * as newsApi from "app/services/api/news.api"
import { AppStackParamList } from "app/navigators/AppNavigator"
import { AppRoute } from "app/navigators/appRoute"
import { Row } from "app/components"
import { News } from "app/models/News"

import { withList } from "./withList"

const image1 = require("../../../assets/images/19c55e8d3241b053c355c6d45fc400a4.png")

function NewsItem({ tieude }: News) {
  return (
    <TouchableOpacity onPress={() => {}}>
      <Row space={2}>
        <Image source={image1} style={[tw.w32, tw.h20, tw.roundedLg]} />
        <Text numberOfLines={2} style={tw.flex1}>
          {tieude}
        </Text>
      </Row>
    </TouchableOpacity>
  )
}

const NewsList = withList(NewsItem)

export default function NewsSection() {
  const navigation = useNavigation<NavigationProp<AppStackParamList>>()

  const [data, setData] = useState<News[]>([])

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const result = await newsApi.getLatestNews()
    if (result.kind === "ok") {
      setData(result.data)
    }
  }

  return (
    <NewsList
      title="Tin tức mới nhất"
      data={data}
      showMore
      onShowMorePress={() => navigation.navigate(AppRoute.LATEST_NEWS)}
    />
  )
}
