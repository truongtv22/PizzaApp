import React, { useCallback } from "react"
import { ImageProps, GestureResponderEvent } from "react-native"
import {
  Icon,
  TopNavigation,
  TopNavigationAction,
  TopNavigationProps,
  TopNavigationActionProps,
} from "@ui-kitten/components"
import { useNavigation } from "@react-navigation/native"

import renderNode from "app/utils/renderNode"

export const BackNavAction = (props: TopNavigationActionProps) => {
  const { icon, onPress, ...restProps } = props

  const navigation = useNavigation()

  const _onPress = useCallback((event: GestureResponderEvent) => {
    if (onPress) {
      onPress(event)
    } else {
      navigation.goBack()
    }
  }, [])

  const renderIcon = useCallback(
    (iconProps: Partial<ImageProps>) =>
      renderNode(
        Icon,
        icon || { pack: "app", name: "arrow-left", width: 20, height: 20 },
        iconProps,
      ),
    [icon],
  )

  return <TopNavigationAction {...restProps} icon={renderIcon} onPress={_onPress} />
}

export interface ToolbarProps extends TopNavigationProps {
  leftIcon?: any
  onBackPress?: () => void
  hideLeftIcon?: boolean
}

export default function Toolbar(props: ToolbarProps) {
  const { status = "default", leftIcon, hideLeftIcon, onBackPress, ...restProps } = props

  const renderLeftAction = () => {
    if (!hideLeftIcon) {
      return <BackNavAction status={status} icon={leftIcon} onPress={onBackPress} />
    }
    return null
  }

  return (
    <TopNavigation
      status={status}
      alignment="center"
      accessoryLeft={renderLeftAction}
      {...restProps}
    />
  )
}
