import React, { useEffect, useState } from "react"
import { tw } from "react-native-tailwindcss"
import { Text } from "@ui-kitten/components"
import { View, TouchableOpacity } from "react-native"
import { NavigationProp, useNavigation } from "@react-navigation/native"

import * as newsApi from "app/services/api/news.api"
import { Column } from "app/components"
import { NewsCategory } from "app/models/News"
import { AppStackParamList } from "app/navigators/AppNavigator"
import { AppRoute } from "app/navigators/appRoute"

import { withHorizontalList } from "./withHorizontalList"

function NewsCategoryItem({ tendanhmuc }: NewsCategory) {
  return (
    <TouchableOpacity
      style={[tw.w24, tw.pX2, tw.pY4, tw.shadow, tw.bgWhite, tw.roundedLg]}
      onPress={() => {}}
    >
      <Column items="center" space={2}>
        <View style={[tw.w12, tw.h12, tw.roundedFull, tw.bgGray200]} />
        <Text category="c1" numberOfLines={2} style={tw.textCenter}>
          {tendanhmuc}
        </Text>
      </Column>
    </TouchableOpacity>
  )
}

const NewsCategoryList = withHorizontalList(NewsCategoryItem)

export default function NewsCategorySection() {
  const navigation = useNavigation<NavigationProp<AppStackParamList>>()
  
  const [data, setData] = useState<NewsCategory[]>([])

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const result = await newsApi.getNewsCategory()
    if (result.kind === "ok") {
      setData(result.data)
    }
  }

  return (
    <NewsCategoryList
      title="Danh mục tin tức"
      data={data}
      showAll
      onShowAllPress={() => navigation.navigate(AppRoute.NEWS_CATEGORY)}
    />
  )
}
