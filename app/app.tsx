/* eslint-disable import/first */
/**
 * Welcome to the main entry point of the app. In this file, we'll
 * be kicking off our app.
 *
 * Most of this file is boilerplate and you shouldn't need to modify
 * it very often. But take some time to look through and understand
 * what is going on here.
 *
 * The app navigation resides in ./app/navigators, so head over there
 * if you're interested in adding screens and navigators.
 */
if (__DEV__) {
  // Load Reactotron configuration in development. We don't want to
  // include this in our production bundle, so we are using `if (__DEV__)`
  // to only execute this in development.
  require("./devtools/ReactotronConfig.ts")
}
import "./i18n"
import "./utils/ignoreWarnings"
import React from "react"
import moment from "moment"
import { useFonts } from "expo-font"
import { StatusBar } from "expo-status-bar"
import "moment/locale/vi"
import { initialWindowMetrics, SafeAreaProvider } from "react-native-safe-area-context"
import * as Linking from "expo-linking"
import { tw } from "react-native-tailwindcss"
import { EvaIconsPack } from "@ui-kitten/eva-icons"
import { IconRegistry, ApplicationProvider } from "@ui-kitten/components"
import { light, mapping } from "@eva-design/eva"
import { RootSiblingParent } from "react-native-root-siblings"
import { Host as PortalProvider } from "react-native-portalize"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { useInitialRootStore } from "./models"
import { AppNavigator, useNavigationPersistence } from "./navigators"
import { ErrorBoundary } from "./screens/ErrorScreen/ErrorBoundary"
import * as storage from "./utils/storage"
import Config from "./config"
import { appTheme, mappingTheme } from "./theme"
import AppIconsPack from "./components/IconsPack/AppIconsPack"
import * as ExpoIconsPack from "./components/IconsPack/ExpoIconsPack"
import { FontAssets } from "./constants/assets"
import { Loading, loadingRef } from "./components/Loading"

moment.updateLocale("vi", {
  calendar: {
    sameDay: "[Hôm nay] HH:mm",
    nextDay: "[Hôm mai] HH:mm",
    nextWeek: "L HH:mm",
    lastDay: "[Hôm qua] HH:mm",
    lastWeek: "L HH:mm",
    sameElse: "L HH:mm",
  },
})

export const NAVIGATION_PERSISTENCE_KEY = "NAVIGATION_STATE"

// Web linking configuration
const prefix = Linking.createURL("/")
const config = {
  screens: {
    Login: {
      path: "",
    },
  },
}

interface AppProps {
  hideSplashScreen: () => Promise<boolean>
}

/**
 * This is the root component of our app.
 */
function App(props: AppProps) {
  const { hideSplashScreen } = props
  const {
    initialNavigationState,
    onNavigationStateChange,
    isRestored: isNavigationStateRestored,
  } = useNavigationPersistence(storage, NAVIGATION_PERSISTENCE_KEY)

  const [areFontsLoaded] = useFonts(FontAssets)

  const { rehydrated } = useInitialRootStore(() => {
    // This runs after the root store has been initialized and rehydrated.

    // If your initialization scripts run very fast, it's good to show the splash screen for just a bit longer to prevent flicker.
    // Slightly delaying splash screen hiding for better UX; can be customized or removed as needed,
    // Note: (vanilla Android) The splash-screen will not appear if you launch your app via the terminal or Android Studio. Kill the app and launch it normally by tapping on the launcher icon. https://stackoverflow.com/a/69831106
    // Note: (vanilla iOS) You might notice the splash-screen logo change size. This happens in debug/development mode. Try building the app for release.
    setTimeout(hideSplashScreen, 500)
  })

  // Before we show the app, we have to wait for our state to be ready.
  // In the meantime, don't render anything. This will be the background
  // color set in native by rootView's background color.
  // In iOS: application:didFinishLaunchingWithOptions:
  // In Android: https://stackoverflow.com/a/45838109/204044
  // You can replace with your own loading component if you wish.
  if (!rehydrated || !isNavigationStateRestored || !areFontsLoaded) return null

  const linking = {
    prefixes: [prefix],
    config,
  }

  // otherwise, we're ready to render the app
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <ErrorBoundary catchErrors={Config.catchErrors}>
        <GestureHandlerRootView style={tw.flex1}>
          <RootSiblingParent>
            <IconRegistry icons={[EvaIconsPack, AppIconsPack, ...Object.values(ExpoIconsPack)]} />
            <ApplicationProvider
              theme={{ ...light, ...appTheme }}
              mapping={mapping}
              // @ts-ignore
              customMapping={mappingTheme}
            >
              <PortalProvider>
                <StatusBar style="dark" />
                <AppNavigator
                  linking={linking}
                  initialState={initialNavigationState}
                  onStateChange={onNavigationStateChange}
                />
                <Loading ref={loadingRef} />
              </PortalProvider>
            </ApplicationProvider>
          </RootSiblingParent>
        </GestureHandlerRootView>
      </ErrorBoundary>
    </SafeAreaProvider>
  )
}

export default App
