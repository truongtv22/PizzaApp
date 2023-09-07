import React from "react"
import { View, ViewProps } from "react-native"

import useStyled from "app/utils/useStyled"
import useSafeAreaStyle from "../SafeAreaView/useSafeAreaStyle"

export interface FooterProps extends ViewProps {
  safeAreaEnabled?: boolean
}

export default function Footer(props: FooterProps) {
  const { style, safeAreaEnabled = true, ...restProps } = props
  const { eva } = useStyled("Layout", props)

  const safeStyle = useSafeAreaStyle(["bottom"], style)

  return <View {...restProps} style={[eva.style, style, safeAreaEnabled && safeStyle]} />
}
