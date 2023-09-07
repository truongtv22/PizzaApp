/**
 * The app navigator (formerly "AppNavigator" and "MainNavigator") is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */
import React, { useEffect } from "react"
import { observer } from "mobx-react-lite"
import { NavigationContainer, NavigatorScreenParams } from "@react-navigation/native"
import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack"
import Config from "app/config"
import { api } from "app/services/api"
import { useStores } from "app/models"
import * as Screens from "app/screens"
import { navigationRef, useBackButtonHandler } from "./navigationUtilities"
import { AppRoute } from "./appRoute"
import { TabNavigator, TabParamList } from "./TabNavigator"

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * If no params are allowed, pass through `undefined`. Generally speaking, we
 * recommend using your MobX-State-Tree store(s) to keep application state
 * rather than passing state through navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 *   https://reactnavigation.org/docs/typescript/#organizing-types
 */
export type AppStackParamList = {
  [AppRoute.TAB]: NavigatorScreenParams<TabParamList>

  // Main routes
  [AppRoute.HOME]: undefined
  [AppRoute.NEWS_CATEGORY]: undefined
  [AppRoute.LATEST_NEWS]: undefined

  // Auth routes
  [AppRoute.LOGIN]: undefined
  [AppRoute.LOGIN_SMS]: undefined
  [AppRoute.VERIFY_SMS]: undefined
  [AppRoute.REGISTER]: undefined
  [AppRoute.FORGET_PASS]: undefined

  // Protected routes
  [AppRoute.PROFILE]: undefined
  [AppRoute.PROFILE_EDIT]: undefined
}

type ScreenRoute = {
  name: keyof AppStackParamList
  screen: React.ComponentType<{}>
}

const mainRoutes: ScreenRoute[] = [
  {
    name: AppRoute.HOME,
    screen: Screens.HomeScreen,
  },
  {
    name: AppRoute.NEWS_CATEGORY,
    screen: Screens.NewsCategoryScreen,
  },
  {
    name: AppRoute.LATEST_NEWS,
    screen: Screens.LatestNewsScreen,
  },
]

const authRoutes: ScreenRoute[] = [
  {
    name: AppRoute.LOGIN,
    screen: Screens.LoginScreen,
  },
  {
    name: AppRoute.LOGIN_SMS,
    screen: Screens.LoginSmsScreen,
  },
  {
    name: AppRoute.VERIFY_SMS,
    screen: Screens.VerifySmsScreen,
  },
  {
    name: AppRoute.REGISTER,
    screen: Screens.RegisterScreen,
  },
  {
    name: AppRoute.FORGET_PASS,
    screen: Screens.ForgetPassScreen,
  },
]

const protectedRoutes: ScreenRoute[] = [
  {
    name: AppRoute.PROFILE,
    screen: Screens.ProfileScreen,
  },
  {
    name: AppRoute.PROFILE_EDIT,
    screen: Screens.ProfileEditScreen,
  },
]

/**
 * This is a list of all the route names that will exit the app if the back button
 * is pressed while in that screen. Only affects Android.
 */
const exitRoutes = Config.exitRoutes

export type AppStackScreenProps<T extends keyof AppStackParamList> = NativeStackScreenProps<
  AppStackParamList,
  T
>

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createNativeStackNavigator<AppStackParamList>()

const AppStack = observer(function AppStack() {
  const {
    authStore: { token, isAuthenticated },
    userStore: { getUserInfo },
  } = useStores()

  useEffect(() => {
    api.setToken(token)
  }, [token])

  useEffect(() => {
    if (isAuthenticated) {
      getUserInfo()
    }
  }, [isAuthenticated])

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={AppRoute.TAB} component={TabNavigator} />
      <Stack.Group>
        {mainRoutes.map((route) => (
          <Stack.Screen key={route.name} name={route.name} component={route.screen} />
        ))}
      </Stack.Group>
      {isAuthenticated ? (
        <Stack.Group>
          {protectedRoutes.map((route) => (
            <Stack.Screen key={route.name} name={route.name} component={route.screen} />
          ))}
        </Stack.Group>
      ) : (
        <Stack.Group>
          {authRoutes.map((route) => (
            <Stack.Screen key={route.name} name={route.name} component={route.screen} />
          ))}
        </Stack.Group>
      )}
    </Stack.Navigator>
  )
})

export interface NavigationProps
  extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export const AppNavigator = observer(function AppNavigator(props: NavigationProps) {
  useBackButtonHandler((routeName) => exitRoutes.includes(routeName))

  return (
    <NavigationContainer ref={navigationRef} {...props}>
      <AppStack />
    </NavigationContainer>
  )
})
