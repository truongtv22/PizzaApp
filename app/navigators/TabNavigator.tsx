import React from "react"
import { observer } from "mobx-react-lite"
import { tw } from "react-native-tailwindcss"
import {
  BottomTabBarProps,
  BottomTabScreenProps,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs"
import { CompositeScreenProps } from "@react-navigation/native"
import { Icon, BottomNavigation, BottomNavigationTab } from "@ui-kitten/components"
import Footer from "app/components/Footer/Footer"
import * as Screens from "app/screens"
import { useStores } from "app/models"
import { AppRoute } from "./appRoute"
// import { TabParamList } from "./types"
import { AppStackParamList, AppStackScreenProps } from "./AppNavigator"

interface TabBarProps extends BottomTabBarProps {}

const TabBar = observer(function TabBar(props: TabBarProps) {
  const {
    authStore: { isAuthenticated },
  } = useStores()
  const { state, navigation } = props

  const onTabSelect = (tabIndex: number) => {
    const tab = tabRoutes[tabIndex]
    if (tab.isAuth && !isAuthenticated) {
      navigation.navigate(AppRoute.LOGIN)
    } else {
      navigation.navigate(tab.name)
    }
  }

  const renderTab = (tab: TabRoute) => (
    <BottomNavigationTab key={tab.name} icon={tab.icon as any} title={tab.title} />
  )

  return (
    <Footer style={[tw.borderT, tw.borderGray300]}>
      <BottomNavigation indicatorStyle={tw.hPx} selectedIndex={state.index} onSelect={onTabSelect}>
        {tabRoutes.map(renderTab)}
      </BottomNavigation>
    </Footer>
  )
})

export type TabParamList = {
  [AppRoute.HOME]: undefined
  [AppRoute.PROFILE]: undefined
  [AppRoute.QUESTION_LIST]: undefined
  [AppRoute.APPOINTMENT_LIST]: undefined
}

type TabRoute = {
  name: keyof TabParamList
  title: string
  icon: (props: { focused: boolean; color: string }) => React.ReactNode
  screen: React.ComponentType
  isAuth?: boolean
}

const tabRoutes: TabRoute[] = [
  {
    name: AppRoute.HOME,
    title: "Trang chủ",
    icon: (props) => <Icon {...props} pack="app" name="home" width={16} height={16} />,
    screen: Screens.HomeScreen,
  },
  {
    name: AppRoute.APPOINTMENT_LIST,
    title: "Lịch hẹn",
    icon: (props) => <Icon {...props} pack="app" name="event" width={16} height={16} />,
    screen: Screens.HomeScreen,
    isAuth: true,
  },
  {
    name: AppRoute.QUESTION_LIST,
    title: "Hỏi đáp",
    icon: (props) => <Icon {...props} pack="app" name="help" width={16} height={16} />,
    screen: Screens.HomeScreen,
    isAuth: true,
  },
  {
    name: AppRoute.PROFILE,
    title: "Hồ sơ",
    icon: (props) => <Icon {...props} pack="app" name="doctor" width={16} height={16} />,
    screen: Screens.ProfileScreen,
    isAuth: true,
  },
]

/**
 * Helper for automatically generating navigation prop types for each route.
 *
 * More info: https://reactnavigation.org/docs/typescript/#organizing-types
 */
export type TabScreenProps<T extends keyof TabParamList> = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, T>,
  AppStackScreenProps<keyof AppStackParamList>
>

const Tab = createBottomTabNavigator<TabParamList>()

export const TabNavigator = () => {
  return (
    <Tab.Navigator tabBar={(props) => <TabBar {...props} />} screenOptions={{ headerShown: false }}>
      {tabRoutes.map((route) => (
        <Tab.Screen
          key={route.name}
          name={route.name}
          options={{
            tabBarLabel: route.title,
            tabBarIcon: route.icon,
          }}
          component={route.screen}
        />
      ))}
    </Tab.Navigator>
  )
}
