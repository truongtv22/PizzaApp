import React from "react"
import { LayoutProps } from "@ui-kitten/components"
import { View } from "react-native"

import useStyled from "app/utils/useStyled"

export default function Box(props: LayoutProps) {
  const { eva } = useStyled("Box", props)

  return <View {...props} />
}
