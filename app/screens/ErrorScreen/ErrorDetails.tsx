import React, { ErrorInfo } from "react"
import { tw } from "react-native-tailwindcss"
import { SafeAreaView, ScrollView, TextStyle, View, ViewStyle } from "react-native"
import { Text, Button } from "@ui-kitten/components"
import { Column } from "app/components/Stack"
import { translate } from "app/i18n"

export interface ErrorDetailsProps {
  error: Error
  errorInfo: ErrorInfo
  onReset(): void
}

export function ErrorDetails(props: ErrorDetailsProps) {
  return (
    <SafeAreaView style={tw.flex1}>
      <Column space={4} style={[tw.flex1, tw.p4, tw.itemsCenter]}>
        <Column space={2} style={tw.itemsCenter}>
          <Text category="h5" style={$heading}>
            {translate("errorScreen.title")}
          </Text>
          <Text>{translate("errorScreen.friendlySubtitle")}</Text>
        </Column>
        <ScrollView style={$errorSection} contentContainerStyle={tw.p4}>
          <Text category="s1" style={$errorContent}>
            {`${props.error}`.trim()}
          </Text>
          <Text selectable style={$errorBacktrace}>
            {`${props.errorInfo.componentStack}`.trim()}
          </Text>
        </ScrollView>
        <Button style={$resetButton} onPress={props.onReset}>
          {translate("errorScreen.reset")}
        </Button>
      </Column>
    </SafeAreaView>
  )
}

const $heading: TextStyle = {
  color: "#C03403",
}

const $errorSection: ViewStyle = {
  borderRadius: 6,
  backgroundColor: "#D7CEC9",
}

const $errorContent: TextStyle = {
  color: "#C03403",
}

const $errorBacktrace: TextStyle = {
  color: "#564E4A",
}

const $resetButton: ViewStyle = {
  borderWidth: 0,
  backgroundColor: "#C03403",
}
