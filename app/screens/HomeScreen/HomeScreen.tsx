import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { View, useWindowDimensions } from "react-native"
import { tw } from "react-native-tailwindcss"
import { Column, Content, Container } from "app/components"
import { AppRoute, TabScreenProps } from "app/navigators"
import MainHeader from "./sections/Header"
import Banner from "./sections/Banner"
import MainMenu from "./sections/MainMenu"
import Service from "./sections/Service"
import Suggest from "./sections/Suggest"
import ImportantNotify from "./sections/ImportantNotify"
import NewsCategory from "./sections/NewsCategory"
import News from "./sections/News"

interface HomeScreenProps extends TabScreenProps<AppRoute.HOME> {}

export const HomeScreen: FC<HomeScreenProps> = observer(function HomeScreen() {
  const { width } = useWindowDimensions()

  return (
    <Container>
      <Content scrollEnabled safeAreaEnabled showsVerticalScrollIndicator={false}>
        <View style={[tw.absolute, tw.top0, tw.h64, { width: width * 2, height: 400 }]}>
          <View
            style={[
              tw.absolute,
              tw.bottom0,
              tw.bgPrimary,
              {
                width: width * 2,
                height: width * 2,
                marginLeft: -(width / 2),
                borderRadius: width,
              },
            ]}
          />
        </View>
        <Column space={4}>
          <MainHeader />
          <Banner />
          <MainMenu />
          {/* <Service />
          <Suggest />
          <ImportantNotify /> */}
          <NewsCategory />
          <News />
        </Column>
      </Content>
    </Container>
  )
})
