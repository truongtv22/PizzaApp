import React, { FC, memo, useState } from "react"
import { observer } from "mobx-react-lite"
import { tw } from "react-native-tailwindcss"
import { Text } from "@ui-kitten/components"
import { View, Image, TouchableOpacity, useWindowDimensions } from "react-native"
import { TabView, TabBar } from "react-native-tab-view"
import type { Route } from "react-native-tab-view"

import { ProList, Header, Content, Container, Column, Row } from "app/components"
import { AppStackScreenProps } from "app/navigators/AppNavigator"
import { AppRoute } from "app/navigators/appRoute"
import { formatDate } from "app/utils/dateHelper"

const image1 = require("../../assets/images/19c55e8d3241b053c355c6d45fc400a4.png")

interface NewsCategoryScreenProps extends AppStackScreenProps<AppRoute.NEWS_CATEGORY> {}

const NewsList = () => {
  const fetchData = async (page: number, pageSize: number) => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${pageSize}`,
    )
    const data = await response.json()
    return { data }
  }

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity>
        <Row space={2}>
          <Image source={image1} style={[tw.w32, tw.h20, tw.roundedLg]} />
          <Column space={1} style={tw.flex1}>
            <Text category="s1" numberOfLines={3}>
              {item.title}
            </Text>
            <Text category="c1" appearance="hint">
              {formatDate()}
            </Text>
          </Column>
        </Row>
      </TouchableOpacity>
    )
  }

  const renderSeparator = () => {
    return <View style={tw.h4} />
  }

  return (
    <ProList
      request={fetchData}
      renderItem={renderItem}
      contentContainerStyle={tw.p4}
      ItemSeparatorComponent={renderSeparator}
    />
  )
}

const MemoizedNewsList = memo(NewsList)

export const NewsCategoryScreen: FC<NewsCategoryScreenProps> = observer(
  function NewsCategoryScreen() {
    const layout = useWindowDimensions()

    const [index, setIndex] = useState(0)
    const [routes] = useState([
      { key: "first", title: "Gói dịch vụ" },
      { key: "second", title: "Hoạt động bệnh viện" },
    ])

    const renderScene = ({ route }) => {
      return <MemoizedNewsList />
    }

    return (
      <Container>
        <Header status="primary" title="Danh mục tin tức" />
        <Content safeAreaEnabled={false}>
          <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            lazy
            initialLayout={{ width: layout.width }}
            renderTabBar={(props) => (
              <TabBar<Route>
                {...props}
                scrollEnabled
                style={tw.bgWhite}
                tabStyle={tw.wAuto}
                indicatorStyle={[tw.h1, tw.bgPrimary]}
                renderLabel={({ route, focused }) => (
                  <Text status={focused ? "primary" : "basic"}>{route.title}</Text>
                )}
              />
            )}
          />
        </Content>
      </Container>
    )
  },
)
