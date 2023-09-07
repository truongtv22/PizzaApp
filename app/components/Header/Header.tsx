import React from "react"
import { StyleProp, View, ViewStyle } from "react-native"

import useStyled from "app/utils/useStyled"
import Toolbar, { ToolbarProps } from "../Toolbar/Toolbar"
import useSafeAreaStyle from "../SafeAreaView/useSafeAreaStyle"

export interface HeaderProps extends ToolbarProps {
  children?: JSX.Element | JSX.Element[]
  style?: StyleProp<ViewStyle>
  safeAreaEnabled?: boolean
}

export default function Header(props: HeaderProps) {
  const { style, safeAreaEnabled = true, ...restProps } = props
  const { eva } = useStyled("TopNavigation", props)

  const safeStyle = useSafeAreaStyle(["top"], style)

  return (
    <View style={[eva.style, style, safeAreaEnabled && safeStyle]}>
      {props.children ? props.children : <Toolbar {...restProps} style={[eva.style, style]} />}
    </View>
  )
}
