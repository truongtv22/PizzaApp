import React from "react"
import { Icon, ListItem } from "@ui-kitten/components"
import { TouchableOpacity } from "react-native"
import * as WebBrowser from "expo-web-browser"

import Toast from "../Toast/Toast"

export interface FileItemProps {
  file: any
  variant?: string
  onRemovePress?: (file: any) => void
}

export default function FileItem(props: FileItemProps) {
  const { file, variant = "filled", onRemovePress } = props

  const fileUri = file.uri
  const fileName = file.name

  const _onPress = () => {
    const canOpen = /^(http|https)/.test(fileUri)
    if (canOpen) {
      const url = `https://docs.google.com/viewer?url=${fileUri}&embedded=true`
      WebBrowser.openBrowserAsync(url)
    } else {
      Toast.showText("Tệp tin chưa được tải lên")
    }
  }

  const _onRemovePress = () => {
    if (onRemovePress) {
      onRemovePress(file)
    }
  }

  const renderIcon = (iconProps) => (
    <TouchableOpacity onPress={_onRemovePress}>
      <Icon {...iconProps} name="close" />
    </TouchableOpacity>
  )

  return (
    <ListItem title={fileName} variant={variant} accessoryRight={renderIcon} onPress={_onPress} />
  )
}
