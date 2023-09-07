import React, { FC, useState } from "react"
import { observer } from "mobx-react-lite"
import { tw } from "react-native-tailwindcss"
import { Text, ListItem } from "@ui-kitten/components"

import { ProList, Header, Content, Container } from "app/components"
import { AppStackScreenProps } from "app/navigators/AppNavigator"
import { AppRoute } from "app/navigators/appRoute"

interface LatestNewsScreenProps extends AppStackScreenProps<AppRoute.LATEST_NEWS> {}

export const LatestNewsScreen: FC<LatestNewsScreenProps> = observer(function LatestNewsScreen() {
  const fetchData = async (page: number, pageSize: number) => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${pageSize}`,
    )
    const data = await response.json()
    return { data: data }
  }

  const renderItem = ({ item }) => {
    return <ListItem title={item.title} description={item.body} />
  }

  return (
    <Container>
      <Header status="primary" title="Tin tức mới nhất" />
      <Content scrollEnabled={false} safeAreaEnabled={false}>
        <ProList request={fetchData} renderItem={renderItem} />
      </Content>
    </Container>
  )
})
