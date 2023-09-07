import React, { useCallback } from "react"
import { tw } from "react-native-tailwindcss"
import { View, StyleSheet } from "react-native"
import { Icon, Text, MenuItem } from "@ui-kitten/components"

import renderNode from "app/utils/renderNode"

export interface ActionSheetItemProps {
  text?: string
  onPress?: () => void
}

export default function ActionSheetItem(props: ActionSheetItemProps) {
  const { icon, text, ...restProps } = props

  const renderIcon = useCallback(
    (iconProps) => <View style={[tw.absolute, tw.pX2]}>{renderNode(Icon, icon, iconProps)}</View>,
    [icon],
  )

  const renderText = useCallback(
    ({ style, ...textProps }) => {
      const { color, ...textStyle } = StyleSheet.flatten(style)
      return (
        <Text {...textProps} style={[textStyle, tw.pY1, tw.textCenter]} status="primary">
          {text}
        </Text>
      )
    },
    [text],
  )

  return <MenuItem {...restProps} title={text && renderText} accessoryLeft={icon && renderIcon} />
}
