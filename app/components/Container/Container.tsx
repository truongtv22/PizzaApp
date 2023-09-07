import React from "react"
import { View } from "react-native"
import { tw } from "react-native-tailwindcss"
import { LayoutProps } from "@ui-kitten/components"
import useStyled from "app/utils/useStyled"

interface ContainerProps extends LayoutProps {}

export default function Container(props: ContainerProps) {
  const { eva } = useStyled("Layout", props)

  const { style, ...restProps } = props

  return <View {...restProps} style={[eva.style, tw.flex1, style]} />
}
